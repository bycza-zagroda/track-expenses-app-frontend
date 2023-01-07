import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, Subject } from 'rxjs';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { WALLET_INSTANCE_MOCK } from 'src/app/domains/wallets/domains.wallets.mocks';
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

  describe('handleWalletEdit', () => {
    beforeEach(() => {

    });

    describe('success', () => {
      it('should update wallet\'s name', fakeAsync(() => {
        matDialogRef.afterClosed.and.returnValue(of({name: ''}));
        const x = service.openWalletEditor(WALLET_INSTANCE_MOCK);
        matEditorSubject.next(WALLET_INSTANCE_MOCK);

        flushMicrotasks();
        expect(systemNotificationsServiceMock.showNotification).toHaveBeenCalled();

      }));

      it('should update wallet\'s name', (done) => {
        matDialogRef.afterClosed.and.returnValue(of({name: 'New name'}));
        matEditorSubject.next(WALLET_INSTANCE_MOCK);

        const x = service.openWalletEditor(WALLET_INSTANCE_MOCK);

        x.subscribe( (data => {
          console.log(data);

          done();
        }))

      });

    });

  });

});
