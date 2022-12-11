import { TestBed } from '@angular/core/testing';
import { PagesWalletsMyWalletsService } from './pages-wallets-my-wallets.service';
import { DomainsWalletsGateway } from '../../../domains/wallets/domains.wallets.gateway';
import { of } from 'rxjs';
import { MyWallet } from './pages-wallets-my-wallet.model';
import { IWalletApiResponse } from '../../../domains/wallets/domains.wallets.types';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('PagesWalletsMyWalletsService', () => {
  let service: PagesWalletsMyWalletsService;
  let gatewayMock: SpyObj<DomainsWalletsGateway>;
  let walletResp: IWalletApiResponse;

  const wallet = new MyWallet({ creationDate: '2022-10-22T09:47:52.595721658Z', id: 12, name: 'wallet1' })

  beforeEach(async () => {
    walletResp = { creationDate: '2022-10-22T09:47:52.595721658Z', id: 12, name: 'wallet1' };
    gatewayMock = createSpyObj<DomainsWalletsGateway>(DomainsWalletsGateway.name, ['getWallets', 'deleteWallet']);

    gatewayMock.getWallets.and.returnValue(of([walletResp]));

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
      });
    });
  });

  describe('deleteWallet', () => {
    it('should call gateway.deleteWallet()', () => {

      service.deleteWallet(wallet);
      expect(gatewayMock.deleteWallet).toHaveBeenCalledWith(wallet.id!)
    });
  });
});
