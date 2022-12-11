import { TestBed } from '@angular/core/testing';

import { LoadingSnackbarService } from './loading-snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import createSpyObj = jasmine.createSpyObj;

describe('LoadingDialogService', () => {
  let service: LoadingSnackbarService;
  let matSnackMock: MatSnackBar;

  beforeEach(() => {
    matSnackMock = createSpyObj<MatSnackBar>(MatSnackBar.name, ['open']);
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
        .toThrow(new Error('hide() called before showing loading indicator'))
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
