import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { UPDATED_WALLET_INSTANCE_MOCK, WALLET_INSTANCE_MOCK } from 'src/app/domains/wallets/domains.wallets.mocks';
import { MaterialModule } from 'src/app/material.module';
import { PagesWalletsManagementService } from '../pages-wallets-management.service';
import { WalletsManagementItem } from '../pages-wallets-wallets-management-item.model';
import { PagesWalletsManagementEditorComponent } from './pages-wallets-management-editor.component';
import { ModalEditorService } from 'src/app/common/utils/modal/modal-editor.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { IWalletModalData } from './pages-wallets-management-editor.types';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PagesWalletsManagementEditorService', () => {
  let service: ModalEditorService;
  let pagesWalletsManagementServiceMock: SpyObj<PagesWalletsManagementService>;
  let systemNotificationsServiceMock: SpyObj<SystemNotificationsService>;
  let matDialogMock: SpyObj<MatDialog>;
  let matDialogRef: SpyObj<MatDialogRef<PagesWalletsManagementEditorComponent>>;

  beforeEach(() => {
    pagesWalletsManagementServiceMock = createSpyObj<PagesWalletsManagementService>(PagesWalletsManagementService.name, [
      'updateWallet',
      'createWallet',
    ]);

    pagesWalletsManagementServiceMock.updateWallet.and.returnValue(of(UPDATED_WALLET_INSTANCE_MOCK));
    pagesWalletsManagementServiceMock.createWallet.and.returnValue(of(WALLET_INSTANCE_MOCK));

    systemNotificationsServiceMock = createSpyObj<SystemNotificationsService>(SystemNotificationsService.name, [
      'showNotification',
    ]);

    matDialogRef = createSpyObj<MatDialogRef<PagesWalletsManagementEditorComponent>>(MatDialogRef.name, [ 'afterClosed' ]);
    matDialogMock = createSpyObj<MatDialog>(MatDialog.name, [ 'open' ]);
    matDialogMock.open.and.returnValue(matDialogRef);

    TestBed.configureTestingModule({
      imports: [ MaterialModule, BrowserAnimationsModule, HttpClientTestingModule ],
      providers: [
        { provide: PagesWalletsManagementService, useValue: pagesWalletsManagementServiceMock },
        { provide: SystemNotificationsService, useValue: systemNotificationsServiceMock },
        { provide: MatDialog, useValue: matDialogMock },
      ],
    });
    service = TestBed.inject(ModalEditorService);
    TestBed.inject<HttpTestingController>(HttpTestingController);
  });

  describe('openWalletEditor', () => {
    describe('updating wallet', () => {
      describe('success', () => {
        beforeEach(() => {
          matDialogRef.afterClosed.and.returnValue(of({ name: UPDATED_WALLET_INSTANCE_MOCK.name }));
        });

        it('updated wallet\'s name should invoke showNotification', (done) => {
          service.openEditor<IWalletModalData, WalletsManagementItem>
          (PagesWalletsManagementEditorComponent, WALLET_INSTANCE_MOCK)
            .subscribe( () => {
              expect(systemNotificationsServiceMock.showNotification).toHaveBeenCalled();
              done();
            });
        });

        it('should return updated wallet', (done) => {
          service.openEditor<IWalletModalData, WalletsManagementItem>
          (PagesWalletsManagementEditorComponent, { name: '' }, WALLET_INSTANCE_MOCK)
            .subscribe( (data: WalletsManagementItem | null) => {
              expect(data!.name).toBe(UPDATED_WALLET_INSTANCE_MOCK.name);
              done();
            });
        });
      });

      describe('canceled', () => {
        beforeEach(() => {
          matDialogRef.afterClosed.and.returnValue(of(undefined));
        });

        it('canceled updating wallet\'s name should not invoke showNotification', fakeAsync(() => {
          service.openEditor<WalletsManagementItem, IWalletModalData>
          (PagesWalletsManagementEditorComponent, WALLET_INSTANCE_MOCK);
          flushMicrotasks();

          expect(systemNotificationsServiceMock.showNotification).not.toHaveBeenCalled();
        }));

        it('should return undefined', (done) => {
          service.openEditor<IWalletModalData, WalletsManagementItem>
          (PagesWalletsManagementEditorComponent, WALLET_INSTANCE_MOCK)
            .subscribe( (data: WalletsManagementItem | null) => {
              expect(data).toBe(null);
              done();
            });
        });
      });
    });

    describe('creating wallet', () => {
      describe('success', () => {
        beforeEach(() => {
          matDialogRef.afterClosed.and.returnValue(of({ name: WALLET_INSTANCE_MOCK.name }));
        });

        it('created wallet\'s name should invoke showNotification', (done) => {
          service.openEditor<IWalletModalData, WalletsManagementItem>(PagesWalletsManagementEditorComponent, null)
            .subscribe( () => {
              expect(systemNotificationsServiceMock.showNotification).toHaveBeenCalled();
              done();
            });
        });

        it('should return created wallet', (done) => {
          service.openEditor<IWalletModalData, WalletsManagementItem>(PagesWalletsManagementEditorComponent, null)
            .subscribe( (data: WalletsManagementItem | null) => {
              expect(data).toBeInstanceOf(WalletsManagementItem);
              expect(data!.name).toBe(WALLET_INSTANCE_MOCK.name);
              done();
            });
        });
      });

      describe('canceled', () => {
        beforeEach(() => {
          matDialogRef.afterClosed.and.returnValue(of(undefined));
        });

        it('canceled updating wallet\'s name should not invoke showNotification', fakeAsync(() => {
          service.openEditor<IWalletModalData, WalletsManagementItem>(PagesWalletsManagementEditorComponent, null);
          flushMicrotasks();

          expect(systemNotificationsServiceMock.showNotification).not.toHaveBeenCalled();
        }));

        it('should return undefined', (done) => {
          service.openEditor<IWalletModalData, WalletsManagementItem>(PagesWalletsManagementEditorComponent, null)
            .subscribe( (data: WalletsManagementItem | null) => {
              expect(data).toBe(null);
              done();
            });
        });
      });
    });
  });
});
