import { TestBed } from '@angular/core/testing';
import { DomainsWalletsGateway } from './domains.wallets.gateway';
import { IWalletApiResponse, IWalletPayload, IWalletTransactionApiResponse } from './domains.wallets.types';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { API_WALLETS_URL } from './domains.wallets.constants';
import { WALLET_PAYLOAD_MOCK, WALLET_RESP_MOCK } from './domains.wallets.mocks';

describe('DomainsWalletsGateway', () => {
  let service: DomainsWalletsGateway;
  let walletResp: IWalletApiResponse;
  let httpTestingController: HttpTestingController;
  let apiUrl: string;
  let walletId: number;

  beforeEach(async () => {
    walletId = 1;
    walletResp = WALLET_RESP_MOCK;
    apiUrl = API_WALLETS_URL;

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        DomainsWalletsGateway,

      ],
    }).compileComponents();

    httpTestingController = TestBed.inject<HttpTestingController>(HttpTestingController);
    service = TestBed.inject<DomainsWalletsGateway>(DomainsWalletsGateway);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('getWallets', () => {
    it('should call proper api url and return wallets data', () => {
      service.getWallets().subscribe((val: IWalletApiResponse[]) => {
        expect(val).toEqual([ walletResp ]);
      });

      const req = httpTestingController.expectOne(apiUrl);
      expect(req.request.method).toEqual('GET');
      req.flush([ walletResp ]);
    });
  });

  describe('createWallet', () => {
    let data: IWalletPayload;

    beforeEach(() => {
      data = WALLET_PAYLOAD_MOCK;
    });

    it('should call proper api url and return created wallet', () => {
      service.createWallet(data).subscribe((val: IWalletApiResponse) => {
        expect(val.name).toEqual(data.name);
      });

      const req = httpTestingController.expectOne(apiUrl);
      expect(req.request.method).toEqual('POST');
      req.flush(data);
    });
  });

  describe('updateWallet', () => {
    it('should call proper api url and return updated wallet', () => {
      service.updateWallet(walletResp.id, { name: walletResp.name }).subscribe((val: IWalletApiResponse) => {
        console.log(val);
        console.log(walletResp);

        expect(val).toEqual(walletResp);
      });

      const req = httpTestingController.expectOne(apiUrl + '/1');
      expect(req.request.method).toEqual('PATCH');
      req.flush(walletResp);
    });
  });

  describe('getWalletTransactions', () => {
    it('should call fakeRequest and return wallet \'s transactions', (done) => {
      service.getWalletTransactions(walletId).subscribe((val: IWalletTransactionApiResponse[]) => {
        expect(val.length).toEqual(3);
        done();
      });
    });
  });
});
