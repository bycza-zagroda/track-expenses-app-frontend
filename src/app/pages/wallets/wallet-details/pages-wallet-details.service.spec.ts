import { TestBed } from '@angular/core/testing';
import { DomainsWalletsGateway } from 'src/app/domains/wallets/domains.wallets.gateway';

import { PagesWalletDetailsService } from './pages-wallet-details.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('PagesWalletDetailsService', () => {
  let service: PagesWalletDetailsService;
  let domainsWalletsGatewayMock: SpyObj<DomainsWalletsGateway>;

  beforeEach(() => {
    domainsWalletsGatewayMock = createSpyObj<DomainsWalletsGateway>(DomainsWalletsGateway.name, ['getWalletTransactions']);

    TestBed.configureTestingModule({
      providers: [
        { provide: DomainsWalletsGateway, useValue: domainsWalletsGatewayMock },
      ]
    });
    service = TestBed.inject(PagesWalletDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
