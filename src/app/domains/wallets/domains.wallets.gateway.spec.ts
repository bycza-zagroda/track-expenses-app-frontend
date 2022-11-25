import { TestBed } from '@angular/core/testing';
import { DomainsWalletsGateway } from './domains.wallets.gateway';
import { IWalletApiResponse } from './domains.wallets.types';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('DomainsWalletsGateway', () => {
  let service: DomainsWalletsGateway;
  let walletResp: IWalletApiResponse;
  let httpTestingController: HttpTestingController;

  let apiUrl: string = environment.remotePath + '/api/wallet';

  beforeEach( () => {
    walletResp = { name: 'Wallet 1', creationDate: '2022-10-22T09:47:52.595721658Z', id: 1, };

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        DomainsWalletsGateway,

      ],
    }).compileComponents();

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(DomainsWalletsGateway);

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('getWallets', () => {
    it('should getWallets method return wallets', () => {
        let data = { name: 'Wallet 1', creationDate: '2022-10-22T09:47:52.595721658Z', id: 1, };

        service.getWallets().subscribe((val: IWalletApiResponse[]) => {
            expect(val).toEqual([data]);
        });

        const req = httpTestingController.expectOne(apiUrl);
        expect(req.request.method).toEqual('GET');
        req.flush([data]);
    });
  });

  describe('createWallet', () => {
    it('should createWallet method return wallet', () => {
        let data = { name: "Wallet 1" };

        service.createWallet(data).subscribe((val: IWalletApiResponse) => {
            expect(val.name).toEqual(data.name);
        });

        const req = httpTestingController.expectOne(apiUrl);
        expect(req.request.method).toEqual('POST');
        req.flush(data);
    });
  });

  describe('updateWallet', () => {
    it('should updateWallet method return updated wallet', () => {
        let data = { name: 'Wallet 1', creationDate: '2022-10-22T09:47:52.595721658Z', id: 1, };

        service.updateWallet(data.id, { name: data.name }).subscribe((val: IWalletApiResponse) => {
            expect(val).toEqual(walletResp);
        });

        const req = httpTestingController.expectOne(apiUrl);
        expect(req.request.method).toEqual('PUT');
        req.flush(data);
    });
  });

});
