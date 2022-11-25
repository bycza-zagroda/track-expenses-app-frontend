import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesWalletsMyWalletsComponent } from './pages-wallets-my-wallets.component';
import { MaterialModule } from '../../../material.module';
import { PagesWalletsMyWalletsService } from './pages-wallets-my-wallets.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { Subject } from 'rxjs';
import { MyWallet } from './pages-wallets-my-wallet.model';
import { IWalletApiResponse } from '../../../domains/wallets/domains.wallets.types';

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
    walletResp = { creationDate: '2022-10-22T09:47:52.595721658Z', id: 999, name: 'wallet1' };
    myWalletsServiceMock = createSpyObj(PagesWalletsMyWalletsService.name, ['getMyWallets', 'createWallet', 'updateWallet']);
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

      walletResp = { creationDate: '2022-10-22T09:47:52.595721658Z', id: 999, name: 'updatedWallet1' };
      component.createWallet({ name: walletResp.name });
      expect(component.myWalletsData.data).toEqual([new MyWallet(walletResp)]);
    });
  });
});
