import { TestBed } from '@angular/core/testing';

import { LoadingSnackbarService } from './loading-snackbar.service';
import { MaterialModule } from '../../material.module';

describe('LoadingDialogService', () => {
  let service: LoadingSnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      providers: [
        LoadingSnackbarService,
      ],
    });
    service = TestBed.inject(LoadingSnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
