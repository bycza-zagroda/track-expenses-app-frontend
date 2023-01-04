import { TestBed } from '@angular/core/testing';
import { DomainsWalletsGateway } from 'src/app/domains/wallets/domains.wallets.gateway';
import { PagesWalletDetailsResolver } from './pages-wallet-details.resolver';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('PagesWalletDetailsResolver', () => {
  let resolver: PagesWalletDetailsResolver;
  let domainsWalletsGatewayMock: SpyObj<DomainsWalletsGateway>;

  beforeEach(() => {
    domainsWalletsGatewayMock = createSpyObj<DomainsWalletsGateway>(DomainsWalletsGateway.name, ['getWallets']);

    TestBed.configureTestingModule({
      providers: [
        { provide: DomainsWalletsGateway, useValue: domainsWalletsGatewayMock },
      ]
    });
    resolver = TestBed.inject(PagesWalletDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
