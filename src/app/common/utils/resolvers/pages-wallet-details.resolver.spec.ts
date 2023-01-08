import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';
import { of, Subject } from 'rxjs';
import { DomainsWalletsGateway } from 'src/app/domains/wallets/domains.wallets.gateway';
import { GET_WALLETS_API_RESPONSE_MOCK, WALLET_INSTANCE_MOCK } from 'src/app/domains/wallets/domains.wallets.mocks';
import { IWalletApiResponse } from 'src/app/domains/wallets/domains.wallets.types';
import { PagesWalletDetailsResolver } from './pages-wallet-details.resolver';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('PagesWalletDetailsResolver', () => {
  let resolver: PagesWalletDetailsResolver;
  let domainsWalletsGatewayMock: SpyObj<DomainsWalletsGateway>;
  let walletsSubject: Subject<IWalletApiResponse[]>;
  let activatedRouteSnapshot: any;
  let walletsApiResponse: IWalletApiResponse[];
  let testWalletId: number;

  beforeEach(() => {
    walletsApiResponse = GET_WALLETS_API_RESPONSE_MOCK();
    walletsSubject = new Subject<IWalletApiResponse[]>();
    testWalletId = 1;
    activatedRouteSnapshot = {
      paramMap: {
        get: (x: string) => {
          return `${testWalletId}`;
        }
      }
    }

    domainsWalletsGatewayMock = createSpyObj<DomainsWalletsGateway>(DomainsWalletsGateway.name, ['getWallets']);
    domainsWalletsGatewayMock.getWallets.and.returnValue(of(walletsApiResponse));

    TestBed.configureTestingModule({
      providers: [
        { provide: DomainsWalletsGateway, useValue: domainsWalletsGatewayMock },
        { provide: ActivatedRouteSnapshot, useValue: activatedRouteSnapshot },
      ]
    });
    resolver = TestBed.inject(PagesWalletDetailsResolver);
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
});
