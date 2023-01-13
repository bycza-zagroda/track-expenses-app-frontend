import { fakeAsync, TestBed } from '@angular/core/testing';

import { ConfirmDialogService } from './confirm-dialog.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { of } from 'rxjs';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('ConfirmDialogService', () => {
  let service: ConfirmDialogService;
  let matDialogMock: SpyObj<MatDialog>;
  let matDialogRef: SpyObj<MatDialogRef<ConfirmationModalComponent>>;
  const confirmationData = {
    headerText: 'headerText',
    confirmationText: 'confirmationText',
    confirmBtnText: 'confirmBtnText',
    denyBtnText: 'denyBtnText',
  };

  beforeEach(() => {
    matDialogRef = createSpyObj<MatDialogRef<ConfirmationModalComponent>>(MatDialogRef.name, [ 'afterClosed' ]);
    matDialogMock = createSpyObj<MatDialog>(MatDialog.name, [ 'open' ]);
    matDialogMock.open.and.returnValue(matDialogRef);

    TestBed.configureTestingModule({
      providers: [ ConfirmDialogService,
        { provide: MatDialog, useValue: matDialogMock },
      ],
    });
    service = TestBed.inject(ConfirmDialogService);
  });

  it('should return false when user dismiss modal', fakeAsync(() => {
    matDialogRef.afterClosed.and.returnValue(of(undefined));

    expect(service.openConfirmModal(confirmationData).subscribe(value => {
      expect(value).toEqual(false);
    }));
  }));

  it('should return false when user click not to delete wallet', fakeAsync(() => {
    matDialogRef.afterClosed.and.returnValue(of(false));

    expect(service.openConfirmModal(confirmationData).subscribe(value => {
      expect(value).toEqual(false);
    }));
  }));

  it('should return false when user click confirm to delete wallet', fakeAsync(() => {
    matDialogRef.afterClosed.and.returnValue(of(true));

    expect(service.openConfirmModal(confirmationData).subscribe(value => {
      expect(value).toEqual(true);
    }));
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
