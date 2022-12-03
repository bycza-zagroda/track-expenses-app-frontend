import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesWalletsMyWalletsComponent } from './pages-wallets-my-wallets.component';
import { MaterialModule } from '../../../material.module';
import { PagesWalletsMyWalletsService } from './pages-wallets-my-wallets.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { Subject } from 'rxjs';
import { MyWallet } from './pages-wallets-my-wallet.model';
import { IWalletApiResponse } from '../../../domains/wallets/domains.wallets.types';
import { WALLET_PAYLOAD_MOCK, WALLET_RESP_MOCK } from 'src/app/domains/wallets/domains.wallets.mocks';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { By } from '@angular/platform-browser';
import { IWalletModalData } from './wallet-form-modal/pages-wallets-my-wallets-wallet-form-modal';
import { MatDialog } from '@angular/material/dialog';

describe('PagesWalletsMyWalletsComponent', () => {
  let component: PagesWalletsMyWalletsComponent;
  let fixture: ComponentFixture<PagesWalletsMyWalletsComponent>;
  let myWalletsServiceMock: SpyObj<PagesWalletsMyWalletsService>;
  let systemNotificationsServiceMock: SpyObj<SystemNotificationsService>;
  let matDialogMock: SpyObj<MatDialog>;
  let walletResp: IWalletApiResponse;
  let walletsSubject: Subject<MyWallet[]>;
  let walletSubject: Subject<MyWallet>;
//   let walletModalData: IWalletModalData;
//   let walletModalSubject: Subject<IWalletModalData>;

  beforeEach(async () => {
    walletsSubject = new Subject<MyWallet[]>();
    walletSubject = new Subject<MyWallet>();
    walletResp = WALLET_RESP_MOCK;
    myWalletsServiceMock = createSpyObj<PagesWalletsMyWalletsService>(PagesWalletsMyWalletsService.name, ['getMyWallets', 'createWallet', 'updateWallet']);
    myWalletsServiceMock.getMyWallets.and.returnValue(walletsSubject.asObservable());
    myWalletsServiceMock.createWallet.and.returnValue(walletSubject.asObservable());
    myWalletsServiceMock.updateWallet.and.returnValue(walletSubject.asObservable());



    // walletModalSubject = new Subject<IWalletModalData>();
    // walletModalData = WALLET_PAYLOAD_MOCK;
    // systemNotificationsServiceMock = createSpyObj<SystemNotificationsService>(SystemNotificationsService.name, ['showNotification']);
    // systemNotificationsServiceMock.showNotification.and.returnValue(walletModalSubject.asObservable());

    // matDialogMock = createSpyObj<MatDialog>(MatDialog.name, ['open']);
    // matDialogMock.open.and.returnValue('');






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
          walletsSubject.error("error");

          expect(component.myWalletsData.data).toEqual(null);
          expect(component.myWalletsData.hasError).toEqual(true);
        });

        it('should display notification container when get my wallets throws fail', () => {
            const debugElement = fixture.debugElement;
            walletsSubject.error("error");

            fixture.detectChanges();

            const notificationContainer = debugElement.query(By.css('#notificationContainer'));
            expect(notificationContainer.nativeElement).toBeTruthy();
          });
      });
    });
  });

  describe('createWallet', () => {
    it('success', () => {
       component.myWalletsData.data = [];
       walletsSubject.next([new MyWallet(walletResp)]);

      component.createWallet({ name: walletResp.name });
      expect(component.myWalletsData.data).toEqual([new MyWallet(walletResp)]);
    });

    it('error', () => {
        component.myWalletsData.data = [];
        component.createWallet({ name: walletResp.name });
        walletsSubject.error("error");


      // czemu component.myWalletsData.data = null ? :(
       expect(component.myWalletsData.data.length).toEqual(0);
     });
  });

  describe('updateWallet', () => {
    it('success', () => {
       component.myWalletsData.data = [];
       walletsSubject.next([new MyWallet(walletResp)]);

      component.updateWallet(new MyWallet(walletResp), { name: walletResp.name });
      expect(component.myWalletsData.data).toEqual([new MyWallet(walletResp)]);
    });

    it('error', () => {
        component.myWalletsData.data = [];
        component.updateWallet(new MyWallet(walletResp), { name: walletResp.name });
        walletsSubject.error("error");

        debugger
      // czemu component.myWalletsData.data = null ? :(
       expect(component.myWalletsData.data.length).toEqual(0);
     });
  });

  describe('handleWalletCreate', () => {
    it('success', () => {
       // nie wiem co tu zrobic. Zamockowac openModalWallet() ? :D
    });


  });







});
