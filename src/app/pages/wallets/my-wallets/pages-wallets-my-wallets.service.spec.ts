import { TestBed } from '@angular/core/testing';
import { PagesWalletsMyWalletsService } from './pages-wallets-my-wallets.service';
import SpyObj = jasmine.SpyObj;
import { DomainsWalletsGateway } from '../../../domains/wallets/domains.wallets.gateway';
import createSpyObj = jasmine.createSpyObj;
import { of } from 'rxjs';
import { MyWallet } from './pages-wallets-my-wallet.model';
import { IWalletApiResponse } from '../../../domains/wallets/domains.wallets.types';

describe('PagesWalletsMyWalletsService', () => {
  let service: PagesWalletsMyWalletsService;
  let gatewayMock: SpyObj<DomainsWalletsGateway>;
  let walletResp: IWalletApiResponse;

  beforeEach(async () => {
    walletResp = { creationDate: '2022-10-22T09:47:52.595721658Z', id: 12, name: 'wallet1' };
    gatewayMock = createSpyObj(DomainsWalletsGateway.name, ['getWallets']);

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
      })
    });
  });
});
