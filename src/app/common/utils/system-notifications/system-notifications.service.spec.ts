import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SystemNotificationsService } from './system-notifications.service';
import { NotificationType, SNACKBAR_DURATION } from './system.notifications.constants';
import createSpyObj = jasmine.createSpyObj;

describe('SystemNotificationsService', () => {
  let systemNotificationsService: SystemNotificationsService;
  let matSnackMock: MatSnackBar;

  beforeEach(() => {
    matSnackMock = createSpyObj<MatSnackBar>(MatSnackBar.name, [ 'open' ]);

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
    let durationTime: number;

    beforeEach(() => {
      message = 'Success happened';
      durationTime = SNACKBAR_DURATION;
    });

    it('should invoke Snackbar.open method with default dismiss value', fakeAsync(() => {
      systemNotificationsService.showNotification({ message, type: NotificationType.Info });
      tick(durationTime);

      expect(matSnackMock.open).toHaveBeenCalledWith(message, 'OK', {
        duration: durationTime,
        panelClass: 'notification--info',
      });
    }));

    it('should invoke Snackbar.open method with dismiss value', fakeAsync(() => {
      systemNotificationsService.showNotification({ message, dismissBtnText: 'NOT OK', type: NotificationType.Success });
      tick(durationTime);

      expect(matSnackMock.open).toHaveBeenCalledWith(message, 'NOT OK', {
        duration: durationTime,
        panelClass: 'notification--success',
      });
    }));
  });
});
