import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';
import { DomainsWalletsGateway } from 'src/app/domains/wallets/domains.wallets.gateway';
import { GET_WALLETS_API_RESPONSE_MOCK } from 'src/app/domains/wallets/domains.wallets.mocks';
import { IWalletApiResponse } from 'src/app/domains/wallets/domains.wallets.types';
import { PagesWalletDetailsResolver } from './pages-wallet-details.resolver';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('PagesWalletDetailsResolver', () => {
  let resolver: PagesWalletDetailsResolver;
  let domainsWalletsGatewayMock: SpyObj<DomainsWalletsGateway>;
  let activatedRouteSnapshot: ActivatedRouteSnapshot;
  let walletsApiResponse: IWalletApiResponse[];
  let testWalletId: number;
  let routerMock: SpyObj<Router>;

  beforeEach(() => {
    walletsApiResponse = GET_WALLETS_API_RESPONSE_MOCK();
    testWalletId = 1;

    activatedRouteSnapshot = {
      paramMap: {
        get: (): string => {
          return `${testWalletId}`;
        },
      },
    } as unknown as ActivatedRouteSnapshot;

    domainsWalletsGatewayMock = createSpyObj<DomainsWalletsGateway>(DomainsWalletsGateway.name, [ 'getWallets' ]);
    domainsWalletsGatewayMock.getWallets.and.returnValue(of(walletsApiResponse));
    routerMock = createSpyObj<Router>('Router', [ 'navigate' ] );

    TestBed.configureTestingModule({
      providers: [
        { provide: DomainsWalletsGateway, useValue: domainsWalletsGatewayMock },
        { provide: ActivatedRouteSnapshot, useValue: activatedRouteSnapshot },
        { provide: Router, useValue: routerMock },
      ],
    });
    resolver = TestBed.inject<PagesWalletDetailsResolver>(PagesWalletDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  describe('get wallets from DomainsWalletsGateway', () => {
    describe('success', () => {
      it('should return WalletsManagementItem with proper id and name', async () => {
        const wallet = await resolver.resolve(activatedRouteSnapshot);

        expect(wallet.id).toEqual(testWalletId);
        expect(wallet.name).toEqual(walletsApiResponse.find(item => item.id === testWalletId)!.name);
      });
    });
  });

  describe('navigate to 404 error page', () => {
    describe('success', () => {
      it('should navigate to /** - error 404 page after passing undefined wallet', () => {
        resolver.navigateErrorPageIfWalletNotFound(undefined);
        expect(routerMock.navigate).toHaveBeenCalledWith([ '/**' ], { skipLocationChange: true });
      });

      it('should NOT navigate to anywhere after passing existing wallet', () => {
        resolver.navigateErrorPageIfWalletNotFound(walletsApiResponse.find(item => item.id === testWalletId));
        expect(routerMock.navigate).not.toHaveBeenCalled();
      });
    });
  });
});
