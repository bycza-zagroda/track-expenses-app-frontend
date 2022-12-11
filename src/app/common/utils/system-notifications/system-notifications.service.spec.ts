import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SystemNotificationsService } from './system-notifications.service';
import createSpyObj = jasmine.createSpyObj;

describe('SystemNotificationsService', () => {
  let systemNotificationsService: SystemNotificationsService;
  let matSnackMock: MatSnackBar;

  beforeEach(() => {
    matSnackMock = createSpyObj<MatSnackBar>(MatSnackBar.name, ['open']);

    TestBed.configureTestingModule({
      providers: [
        SystemNotificationsService,
        { provide: MatSnackBar, useValue: matSnackMock },
      ],
    });
    systemNotificationsService = TestBed.inject<SystemNotificationsService>(SystemNotificationsService);
  });

  describe('showNotification', () => {
    let message: string;

    beforeEach(() => {
        message = 'Success happened';
    });

    it('should invoke Snackbar.open method with default dismiss value', () => {
      systemNotificationsService.showNotification({ message });

      expect(matSnackMock.open).toHaveBeenCalledWith(message, 'OK');
    });

    it('should invoke Snackbar.open method with dismiss value', () => {
      systemNotificationsService.showNotification({ message, dismissBtnText: 'NOT OK' });

      expect(matSnackMock.open).toHaveBeenCalledWith(message, 'NOT OK');
    });
  })
});
