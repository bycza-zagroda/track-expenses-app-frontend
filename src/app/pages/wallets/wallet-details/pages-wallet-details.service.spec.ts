import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DomainsWalletsGateway } from 'src/app/domains/wallets/domains.wallets.gateway';
import { WALLET_TRANSACTIONS_API_RESPONSE_MOCK } from 'src/app/domains/wallets/domains.wallets.mocks';
import { WalletsDetailsTransaction } from './pages-wallet-details-item.model';

import { PagesWalletDetailsService } from './pages-wallet-details.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('PagesWalletDetailsService', () => {
  let service: PagesWalletDetailsService;
  let domainsWalletsGatewayMock: SpyObj<DomainsWalletsGateway>;
  let walletId: number;

  beforeEach(() => {
    walletId = 1;
    domainsWalletsGatewayMock = createSpyObj<DomainsWalletsGateway>(DomainsWalletsGateway.name, ['getWalletTransactions']);
    domainsWalletsGatewayMock.getWalletTransactions.and.returnValue(of(WALLET_TRANSACTIONS_API_RESPONSE_MOCK(walletId)));
    TestBed.configureTestingModule({
      providers: [
        { provide: DomainsWalletsGateway, useValue: domainsWalletsGatewayMock },
      ],
    });
    service = TestBed.inject(PagesWalletDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getWalletTransactions', () => {

    it('should return array of WalletsDetailsTransaction instances', (done) => {
      service.getWalletTransactions(walletId).subscribe((transactions: WalletsDetailsTransaction[]) => {

        expect(transactions[0]).toBeInstanceOf(WalletsDetailsTransaction);
        done();
      })
    });

  });
});
