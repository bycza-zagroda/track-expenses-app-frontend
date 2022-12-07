import { TestBed } from '@angular/core/testing';

import { LoadingSnackbarService } from './loading-snackbar.service';

describe('LoadingDialogService', () => {
  let service: LoadingSnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingSnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
