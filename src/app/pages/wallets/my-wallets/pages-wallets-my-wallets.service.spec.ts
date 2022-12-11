import { TestBed } from '@angular/core/testing';
import { PagesWalletsMyWalletsService } from './pages-wallets-my-wallets.service';
import { DomainsWalletsGateway } from '../../../domains/wallets/domains.wallets.gateway';
import { of } from 'rxjs';
import { MyWallet } from './pages-wallets-my-wallet.model';
import { IWalletApiResponse } from '../../../domains/wallets/domains.wallets.types';
import { WALLET_RESP_MOCK } from 'src/app/domains/wallets/domains.wallets.mocks';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('PagesWalletsMyWalletsService', () => {
  let service: PagesWalletsMyWalletsService;
  let gatewayMock: SpyObj<DomainsWalletsGateway>;
  let walletResp: IWalletApiResponse;

  const wallet = new MyWallet({ creationDate: '2022-10-22T09:47:52.595721658Z', id: 12, name: 'wallet1' })

  beforeEach(async () => {
    walletResp = WALLET_RESP_MOCK;
    gatewayMock = createSpyObj<DomainsWalletsGateway>(DomainsWalletsGateway.name, ['getWallets', 'createWallet', 'updateWallet','deleteWallet']);

    gatewayMock.getWallets.and.returnValue(of([walletResp]));
    gatewayMock.createWallet.and.returnValue(of(walletResp));
    gatewayMock.updateWallet.and.returnValue(of(walletResp));

    await TestBed.configureTestingModule({
      providers: [
        PagesWalletsMyWalletsService,
        { provide: DomainsWalletsGateway, useValue: gatewayMock },
      ],
    }).compileComponents();

    service = TestBed.inject(PagesWalletsMyWalletsService);
  });

  describe('getMyWallets', () => {
    it('should return my wallets', (done) => {
      service.getMyWallets().subscribe(val => {
        expect(val).toEqual([new MyWallet(walletResp)]);

        done();
      })
    });
  });

  describe('createWallet', () => {
    let createdWalletFromPayload: MyWallet;
    let walletCreatePayload: Partial<IWalletApiResponse>;

    beforeEach(() => {
        walletCreatePayload = { id: 15, name: 'Wallet 5' };
        createdWalletFromPayload = MyWallet.create(walletCreatePayload);
    });

    it('should create new wallet', (done) => {
      service.createWallet(createdWalletFromPayload).subscribe((val: MyWallet) => {
        expect(val).toEqual(new MyWallet(walletResp));

        done();
      })
    });
  });

  describe('updateWallet', () => {
    let updatedWalletFromPayload: MyWallet;

    beforeEach(() => {
        updatedWalletFromPayload = MyWallet.create(walletResp);
    });

    it('should update my wallet', (done) => {
      service.updateWallet(updatedWalletFromPayload).subscribe(val => {
        expect(val).toEqual(new MyWallet(walletResp));

        done();
      })
    });
  });

  describe('deleteWallet', () => {
    it('should call gateway.deleteWallet()', () => {

      service.deleteWallet(wallet);
      expect(gatewayMock.deleteWallet).toHaveBeenCalledWith(wallet.id!)
    });
  });
});
