import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { PagesWalletsManagementComponent } from '../pages-wallets-management.component';
import { MaterialModule } from '../../../../material.module';
import { PagesWalletsManagementService } from '../pages-wallets-management.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { of, Subject } from 'rxjs';
import { WalletsManagementItem } from '../pages-wallets-wallets-management-item.model';
import { IWalletApiResponse } from '../../../../domains/wallets/domains.wallets.types';
import { WALLET_INSTANCE_MOCK, WALLET_RESP_MOCK } from 'src/app/domains/wallets/domains.wallets.mocks';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { By } from '@angular/platform-browser';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PagesWalletsManagementEditorComponent } from '../wallet-editor/pages-wallets-management-editor.component';
import { SystemMessageComponent } from 'src/app/common/components/system-message/system-message.component';

describe('PagesWalletsManagementComponent', () => {
  let component: PagesWalletsManagementComponent;
  let fixture: ComponentFixture<PagesWalletsManagementComponent>;
  let myWalletsServiceMock: SpyObj<PagesWalletsManagementService>;
  let systemNotificationsServiceMock: SpyObj<SystemNotificationsService>;
  let matDialogMock: SpyObj<MatDialog>;
  let walletResp: IWalletApiResponse;
  let walletsSubject: Subject<WalletsManagementItem[]>;
  let walletSubject: Subject<WalletsManagementItem>;
  let walletInstance: WalletsManagementItem;
  let matDialogRef: SpyObj<MatDialogRef<PagesWalletsManagementEditorComponent>>;

  beforeEach(async () => {
    walletsSubject = new Subject<WalletsManagementItem[]>();
    walletSubject = new Subject<WalletsManagementItem>();
    walletResp = WALLET_RESP_MOCK;
    walletInstance = WALLET_INSTANCE_MOCK;

    myWalletsServiceMock = createSpyObj<PagesWalletsManagementService>(PagesWalletsManagementService.name, ['getWallets', 'createWallet', 'updateWallet']);
    myWalletsServiceMock.getWallets.and.returnValue(walletsSubject.asObservable());
    myWalletsServiceMock.createWallet.and.returnValue(walletSubject.asObservable());
    myWalletsServiceMock.updateWallet.and.returnValue(walletSubject.asObservable());

    matDialogRef = createSpyObj<MatDialogRef<PagesWalletsManagementEditorComponent>>(MatDialogRef.name, ['afterClosed']);
    matDialogMock = createSpyObj<MatDialog>(MatDialog.name, ['open']);
    matDialogMock.open.and.returnValue(matDialogRef);

    await TestBed.configureTestingModule({
      declarations: [
        PagesWalletsManagementComponent,
        SystemMessageComponent,
      ],
      imports: [ MaterialModule ],
      providers: [
        { provide: PagesWalletsManagementService, useValue: myWalletsServiceMock },
        { provide: SystemNotificationsService, useValue: systemNotificationsServiceMock },
        { provide: MatDialog, useValue: matDialogMock },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesWalletsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    describe('getting my wallets', () => {
      describe('success', () => {
        it('should get my wallets', () => {
          walletsSubject.next([new WalletsManagementItem(walletResp)]);

          expect(component.myWalletsData.data).toEqual([new WalletsManagementItem(walletResp)]);
        });
      });

      describe('error', () => {
        it('should set error state to false when get my wallets throws fail', () => {
          walletsSubject.error('error');

          expect(component.myWalletsData.data).toEqual(null);
          expect(component.myWalletsData.hasError).toEqual(true);
        });

        it('should display notification container when get my wallets throws fail', () => {
            const debugElement = fixture.debugElement;
            walletsSubject.error('error');

            fixture.detectChanges();

            const notificationContainer = debugElement.query(By.css('#notificationContainer'));
            expect(notificationContainer.nativeElement).toBeTruthy();
          });
      });
    });
  });

  describe('createWallet', () => {
    beforeEach(() => {
      component.myWalletsData.data = [];
    })

    it('success', () => {
      walletsSubject.next([new WalletsManagementItem(walletResp)]);
      component.createWallet({ name: walletResp.name });

      expect(component.myWalletsData.data).toEqual([new WalletsManagementItem(walletResp)]);
    });

    it('error', () => {
      component.createWallet({ name: walletResp.name });
      walletsSubject.error('error');

      expect(component.myWalletsData.data).toBeNull();
    });
  });

  describe('updateWallet', () => {
    beforeEach(() => {
        component.myWalletsData.data = [];
    })

    it('success', () => {
      walletsSubject.next([new WalletsManagementItem(walletResp)]);
      component.updateWallet(new WalletsManagementItem(walletResp), { name: walletResp.name });

      expect(component.myWalletsData.data).toEqual([new WalletsManagementItem(walletResp)]);
    });

    it('error', () => {
      component.updateWallet(new WalletsManagementItem(walletResp), { name: walletResp.name });
      walletsSubject.error('error');

      expect(component.myWalletsData.data).toBeNull();
    });
  });

  describe('handleWalletCreate', () => {
    describe('modal was closed', () => {
      beforeEach(() => {
        matDialogRef.afterClosed.and.returnValue(of({ name: 'some wallet name' }));
      });

      it('should call createWallet method of the service', fakeAsync(() => {
        component.handleWalletCreate();

        flushMicrotasks();

        expect(myWalletsServiceMock.createWallet).toHaveBeenCalledWith(WalletsManagementItem.create({ name: 'some wallet name' }));
      }));
    });

    describe('modal was canceled', () => {
      beforeEach(() => {
        matDialogRef.afterClosed.and.returnValue(of(undefined));
      });

      it('should not call createWallet method of the service', fakeAsync(() => {
        component.handleWalletCreate();

        flushMicrotasks();

        expect(myWalletsServiceMock.createWallet).not.toHaveBeenCalled();
      }));
    });
  });

  describe('handleWalletEdit', () => {
    describe('modal was closed', () => {
      beforeEach(() => {
        matDialogRef.afterClosed.and.returnValue(of({ name: 'some wallet name' }));
      });

      it('should call createWallet method of the service', fakeAsync(() => {
        component.handleWalletEdit(walletInstance);

        flushMicrotasks();

        expect(myWalletsServiceMock.updateWallet).toHaveBeenCalledWith(WalletsManagementItem.create({ id: walletInstance.id!, name: 'some wallet name' }));
      }));
    });

    describe('modal was canceled', () => {
      beforeEach(() => {
        matDialogRef.afterClosed.and.returnValue(of(undefined));
      });

      it('should not call updateWallet method of the service', fakeAsync(() => {
        component.handleWalletEdit(walletInstance);

        flushMicrotasks();

        expect(myWalletsServiceMock.createWallet).not.toHaveBeenCalled();
      }));
    });
  });

});
