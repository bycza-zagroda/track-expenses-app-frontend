import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';
import { arMA } from 'date-fns/locale';
import { Subject } from 'rxjs';
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

  beforeEach(() => {
    walletsSubject = new Subject<IWalletApiResponse[]>();
    activatedRouteSnapshot = {
      route: {
        paramMap: {
          get: (x: string) => {
            return '1';
          }
        }
      }
    }
    domainsWalletsGatewayMock = createSpyObj<DomainsWalletsGateway>(DomainsWalletsGateway.name, ['getWallets']);
    domainsWalletsGatewayMock.getWallets.and.returnValue(walletsSubject.asObservable());

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
    beforeEach(() => {

    })
    describe('success', () => {
      it('should return WalletsManagementItem with proper id', fakeAsync(() => {
        const resp = resolver.resolve(activatedRouteSnapshot);
        walletsSubject.next(GET_WALLETS_API_RESPONSE_MOCK());
        flushMicrotasks();
        expect(resp).toEqual(new Promise( (resolve, reject) => resolve(WALLET_INSTANCE_MOCK) ));
      }));
    });

  });




});
