import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationType } from './system.notifications.constants';
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
    let type: NotificationType;

    beforeEach(() => {
        message = 'Success happened';
        type = NotificationType.Success;
    });

    it('should invoke Snackbar.open method with default dismiss value', () => {
      systemNotificationsService.showNotification({ type, message });

      expect(matSnackMock.open).toHaveBeenCalledWith(message, 'OK');
    });

    it('should invoke Snackbar.open method with dismiss value', () => {
      systemNotificationsService.showNotification({ type, message, dismissBtnText: 'NOT OK' });

      expect(matSnackMock.open).toHaveBeenCalledWith(message, 'NOT OK');
    });
  })
});
