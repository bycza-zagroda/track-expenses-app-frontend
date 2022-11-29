import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesWalletsMyWalletsComponent } from './pages-wallets-my-wallets.component';
import { MaterialModule } from '../../../material.module';
import { PagesWalletsMyWalletsService } from './pages-wallets-my-wallets.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { Subject } from 'rxjs';
import { MyWallet } from './pages-wallets-my-wallet.model';
import { IWalletApiResponse } from '../../../domains/wallets/domains.wallets.types';
import { WALLET_RESP_MOCK } from 'src/app/domains/wallets/domains.wallets.mocks';

describe('PagesWalletsMyWalletsComponent', () => {
  let component: PagesWalletsMyWalletsComponent;
  let fixture: ComponentFixture<PagesWalletsMyWalletsComponent>;
  let myWalletsServiceMock: SpyObj<PagesWalletsMyWalletsService>;
  let walletResp: IWalletApiResponse;
  let walletsSubject: Subject<MyWallet[]>;
  let walletSubject: Subject<MyWallet>;

  beforeEach(async () => {
    walletsSubject = new Subject<MyWallet[]>();
    walletSubject = new Subject<MyWallet>();
    walletResp = WALLET_RESP_MOCK;
    myWalletsServiceMock = createSpyObj<PagesWalletsMyWalletsService>(PagesWalletsMyWalletsService.name, ['getMyWallets', 'createWallet', 'updateWallet']);
    myWalletsServiceMock.getMyWallets.and.returnValue(walletsSubject.asObservable());
    myWalletsServiceMock.createWallet.and.returnValue(walletSubject.asObservable());
    myWalletsServiceMock.updateWallet.and.returnValue(walletSubject.asObservable());

    await TestBed.configureTestingModule({
      declarations: [ PagesWalletsMyWalletsComponent ],
      imports: [ MaterialModule ],
      providers: [
        { provide: PagesWalletsMyWalletsService, useValue: myWalletsServiceMock },
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
    });
  });

  describe('createWallet', () => {
    it('should create new wallet', () => {
       component.myWalletsData.data = [];
       walletsSubject.next([new MyWallet(walletResp)]);

      component.createWallet({ name: walletResp.name });
      expect(component.myWalletsData.data).toEqual([new MyWallet(walletResp)]);
    });
  });
});
