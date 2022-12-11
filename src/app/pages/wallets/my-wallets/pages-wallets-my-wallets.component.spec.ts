import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { PagesWalletsMyWalletsComponent } from './pages-wallets-my-wallets.component';
import { MaterialModule } from '../../../material.module';
import { PagesWalletsMyWalletsService } from './pages-wallets-my-wallets.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { of, Subject } from 'rxjs';
import { MyWallet } from './pages-wallets-my-wallet.model';
import { IWalletApiResponse } from '../../../domains/wallets/domains.wallets.types';
import { WALLET_INSTANCE_MOCK, WALLET_RESP_MOCK } from 'src/app/domains/wallets/domains.wallets.mocks';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { By } from '@angular/platform-browser';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WalletFormModalComponent } from './wallet-form-modal/wallet-form-modal.component';

describe('PagesWalletsMyWalletsComponent', () => {
  let component: PagesWalletsMyWalletsComponent;
  let fixture: ComponentFixture<PagesWalletsMyWalletsComponent>;
  let myWalletsServiceMock: SpyObj<PagesWalletsMyWalletsService>;
  let systemNotificationsServiceMock: SpyObj<SystemNotificationsService>;
  let matDialogMock: SpyObj<MatDialog>;
  let walletResp: IWalletApiResponse;
  let walletsSubject: Subject<MyWallet[]>;
  let walletSubject: Subject<MyWallet>;
  let walletInstance: MyWallet;
  let matDialogRef: SpyObj<MatDialogRef<WalletFormModalComponent>>;

  beforeEach(async () => {
    walletsSubject = new Subject<MyWallet[]>();
    walletSubject = new Subject<MyWallet>();
    walletResp = WALLET_RESP_MOCK;
    walletInstance = WALLET_INSTANCE_MOCK;

    myWalletsServiceMock = createSpyObj<PagesWalletsMyWalletsService>(PagesWalletsMyWalletsService.name, ['getMyWallets', 'createWallet', 'updateWallet']);
    myWalletsServiceMock.getMyWallets.and.returnValue(walletsSubject.asObservable());
    myWalletsServiceMock.createWallet.and.returnValue(walletSubject.asObservable());
    myWalletsServiceMock.updateWallet.and.returnValue(walletSubject.asObservable());

    matDialogRef = createSpyObj<MatDialogRef<WalletFormModalComponent>>(MatDialogRef.name, ['afterClosed']);
    matDialogMock = createSpyObj<MatDialog>(MatDialog.name, ['open']);
    matDialogMock.open.and.returnValue(matDialogRef);

    await TestBed.configureTestingModule({
      declarations: [ PagesWalletsMyWalletsComponent ],
      imports: [ MaterialModule ],
      providers: [
        { provide: PagesWalletsMyWalletsService, useValue: myWalletsServiceMock },
        { provide: SystemNotificationsService, useValue: systemNotificationsServiceMock },
        { provide: MatDialog, useValue: matDialogMock },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesWalletsMyWalletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    describe('getting my wallets', () => {
      describe('success', () => {
        it('should get my wallets', () => {
          walletsSubject.next([new MyWallet(walletResp)]);

          expect(component.myWalletsData.data).toEqual([new MyWallet(walletResp)]);
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
      walletsSubject.next([new MyWallet(walletResp)]);
      component.createWallet({ name: walletResp.name });

      expect(component.myWalletsData.data).toEqual([new MyWallet(walletResp)]);
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
      walletsSubject.next([new MyWallet(walletResp)]);
      component.updateWallet(new MyWallet(walletResp), { name: walletResp.name });

      expect(component.myWalletsData.data).toEqual([new MyWallet(walletResp)]);
    });

    it('error', () => {
      component.updateWallet(new MyWallet(walletResp), { name: walletResp.name });
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

        expect(myWalletsServiceMock.createWallet).toHaveBeenCalledWith(MyWallet.create({ name: 'some wallet name' }));
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

        expect(myWalletsServiceMock.updateWallet).toHaveBeenCalledWith(MyWallet.create({ id: walletInstance.id!, name: 'some wallet name' }));
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
