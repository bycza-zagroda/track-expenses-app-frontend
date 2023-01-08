import { Xliff } from '@angular/compiler';
import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { delay, of, Subject } from 'rxjs';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { UPDATED_WALLET_INSTANCE_MOCK, WALLET_INSTANCE_MOCK } from 'src/app/domains/wallets/domains.wallets.mocks';
import { MaterialModule } from 'src/app/material.module';
import { PagesWalletsManagementService } from '../pages-wallets-management.service';
import { WalletsManagementItem } from '../pages-wallets-wallets-management-item.model';
import { PagesWalletsManagementEditorComponent } from './pages-wallets-management-editor.component';
import { PagesWalletsManagementEditorService } from './pages-wallets-management-editor.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('PagesWalletsManagementEditorService', () => {
  let service: PagesWalletsManagementEditorService;
  let pagesWalletsManagementServiceMock: SpyObj<PagesWalletsManagementService>;
  let systemNotificationsServiceMock: SpyObj<SystemNotificationsService>;
  let matDialogMock: SpyObj<MatDialog>;
  let matDialogRef: SpyObj<MatDialogRef<PagesWalletsManagementEditorComponent>>;
  let matEditorSubject: Subject<WalletsManagementItem>;

  beforeEach(() => {
    matEditorSubject = new Subject<WalletsManagementItem>();

    pagesWalletsManagementServiceMock = createSpyObj<PagesWalletsManagementService>(PagesWalletsManagementService.name, ['updateWallet']);
    pagesWalletsManagementServiceMock.updateWallet.and.returnValue(matEditorSubject.asObservable());

    systemNotificationsServiceMock = createSpyObj<SystemNotificationsService>(SystemNotificationsService.name, ['showNotification']);

    matDialogRef = createSpyObj<MatDialogRef<PagesWalletsManagementEditorComponent>>(MatDialogRef.name, ['afterClosed']);
    matDialogMock = createSpyObj<MatDialog>(MatDialog.name, ['open']);
    matDialogMock.open.and.returnValue(matDialogRef);

    TestBed.configureTestingModule({
      imports: [ MaterialModule, BrowserAnimationsModule, ],
      providers: [
        { provide: PagesWalletsManagementService, useValue: pagesWalletsManagementServiceMock },
        { provide: SystemNotificationsService, useValue: systemNotificationsServiceMock },
        { provide: MatDialog, useValue: matDialogMock },
      ],
    });
    service = TestBed.inject(PagesWalletsManagementEditorService);
  });

  fdescribe('handleWalletEdit', () => {
    describe('success', () => {
      beforeEach(() => {
        matDialogRef.afterClosed.and.returnValue(of({name: UPDATED_WALLET_INSTANCE_MOCK.name }));
      });

      it('update wallet\'s name should invoke showNotification', fakeAsync(() => {
        service.openWalletEditor(WALLET_INSTANCE_MOCK);
        matEditorSubject.next(WALLET_INSTANCE_MOCK);

        flushMicrotasks();
        expect(systemNotificationsServiceMock.showNotification).toHaveBeenCalled();
      }));

      it('should return updated wallet', (done) => {
        service.openWalletEditor(WALLET_INSTANCE_MOCK).subscribe( ( (data: WalletsManagementItem | undefined) => {

          expect(data?.name).toBe(UPDATED_WALLET_INSTANCE_MOCK.name);
          done();
        }));

        matEditorSubject.next(UPDATED_WALLET_INSTANCE_MOCK);
      });
    });

    describe('canceled', () => {
      it('cancel updating wallet\'s name should not invoke showNotification', fakeAsync(() => {
        matDialogRef.afterClosed.and.returnValue(of(undefined));
        service.openWalletEditor(WALLET_INSTANCE_MOCK);

        flushMicrotasks();
        expect(systemNotificationsServiceMock.showNotification).not.toHaveBeenCalled();
      }));

      it('should return undefined', (done) => {

        service.openWalletEditor(WALLET_INSTANCE_MOCK).subscribe( ((data: WalletsManagementItem | undefined) => {
          expect(data).toBe(undefined);
          done();
        }));

        matDialogRef.afterClosed.and.returnValue(of(undefined)); // of(undefined).pipe(delay(10))
      });
    });

  });
});
