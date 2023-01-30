import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DomainsTransactionsGateway } from 'src/app/domains/transactions/domains.transactions.gateway';
import { WALLET_TRANSACTIONS_API_RESPONSE_MOCK } from 'src/app/domains/transactions/domains.transactions.mocks';
import { WalletTransaction } from './pages-wallet-details-item.model';
import { PagesWalletDetailsService } from './pages-wallet-details.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('PagesWalletDetailsService', () => {
  let service: PagesWalletDetailsService;
  let domainsWalletsGatewayMock: SpyObj<DomainsTransactionsGateway>;
  let walletId: number;

  beforeEach(() => {
    walletId = 1;

    domainsWalletsGatewayMock = createSpyObj<DomainsTransactionsGateway>
    (DomainsTransactionsGateway.name, [ 'getWalletTransactions' ]);
    domainsWalletsGatewayMock.getWalletTransactions.and.returnValue(of(WALLET_TRANSACTIONS_API_RESPONSE_MOCK(walletId)));

    TestBed.configureTestingModule({
      providers: [
        { provide: DomainsTransactionsGateway, useValue: domainsWalletsGatewayMock },
      ],
    });
    service = TestBed.inject(PagesWalletDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getWalletTransactions', () => {
    it('should return array of WalletTransaction instances', (done) => {
      service.getWalletTransactions(walletId).subscribe((transactions: WalletTransaction[]) => {
        expect(transactions[0]).toBeInstanceOf(WalletTransaction);
        done();
      });
    });
  });
});
