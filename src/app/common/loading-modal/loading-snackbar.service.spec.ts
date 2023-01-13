import { TestBed } from '@angular/core/testing';

import { LoadingSnackbarService } from './loading-snackbar.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { LoadingModalComponent } from './loading-modal.component';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

describe('LoadingDialogService', () => {
  let service: LoadingSnackbarService;
  let matSnackMock: SpyObj<MatSnackBar>;
  let snackBarRefMock: SpyObj<MatSnackBarRef<LoadingModalComponent>>;

  beforeEach(() => {
    matSnackMock = createSpyObj<MatSnackBar>(MatSnackBar.name, [ 'openFromComponent', 'open' ]);
    snackBarRefMock = createSpyObj<MatSnackBarRef<LoadingModalComponent>>(MatSnackBarRef.name, [ 'dismiss' ]);
    matSnackMock.openFromComponent.and.returnValue(snackBarRefMock);

    TestBed.configureTestingModule({
      providers: [
        LoadingSnackbarService,
        { provide: MatSnackBar, useValue: matSnackMock },
      ],
    });
    service = TestBed.inject(LoadingSnackbarService);
  });

  it('should throw error if hide() is called before show()', () => {
    expect(() => service.hide())
      .toThrow(new Error('hide() called before showing loading indicator'));
  });

  it('should open loading dialog', () => {
    service.show('message');
    expect(matSnackMock.openFromComponent).toHaveBeenCalled();
  });

  it('should hide loading dialog after open it', () => {
    service.show('');
    service.hide();
    expect(snackBarRefMock.dismiss).toHaveBeenCalled();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
