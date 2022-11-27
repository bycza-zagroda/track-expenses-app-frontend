import { TestBed } from '@angular/core/testing';
import { DomainsWalletsGateway } from './domains.wallets.gateway';
import { IWalletApiResponse, IWalletPayload } from './domains.wallets.types';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { API_WALLETS_URL } from './domains.wallets.constants';
import { WALLET_RESP_MOCK } from './domains.wallets.mocks';

describe('DomainsWalletsGateway', () => {
  let service: DomainsWalletsGateway;
  let walletResp: IWalletApiResponse;
  let httpTestingController: HttpTestingController;

  const apiUrl: string = API_WALLETS_URL;

  beforeEach(async () => {
    walletResp = WALLET_RESP_MOCK;

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
    let data: IWalletApiResponse;

    beforeEach(() => {
       data = WALLET_RESP_MOCK;
    });

    it('should call proper api url and return wallets data', () => {

        service.getWallets().subscribe((val: IWalletApiResponse[]) => {
            expect(val).toEqual([data]);
        });

        const req = httpTestingController.expectOne(apiUrl);
        expect(req.request.method).toEqual('GET');
        req.flush([data]);
    });
  });

  describe('createWallet', () => {
    let data: IWalletPayload;

    beforeEach(() => {
       data = { name: 'Wallet 1' };
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
    let data: IWalletApiResponse;

    beforeEach(() => {
       data = WALLET_RESP_MOCK;
    });

    it('should call proper api url and return updated wallet', () => {
        service.updateWallet(data.id, { name: data.name }).subscribe((val: IWalletApiResponse) => {
            expect(val).toEqual(walletResp);
        });

        const req = httpTestingController.expectOne(apiUrl);
        expect(req.request.method).toEqual('PUT');
        req.flush(data);
    });
  });

});
