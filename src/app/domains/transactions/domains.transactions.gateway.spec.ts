import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { DomainsTransactionsGateway } from './domains.transactions.gateway';
import { IWalletTransactionApiResponse } from './domains.transactions.types';
import {
  TRANSACTION_PAYLOAD_MOCK,
  UPDATED_WALLET_TRANSACTIONS_OBJECT_MOCK,
  WALLET_TRANSACTIONS_API_RESPONSE_MOCK,
} from './domains.transactions.mocks';
import { TServerEntityId } from 'src/app/common/http/common.http.types';
import { API_TRANSACTIONS_URL } from './domains.transactions.constants';

describe('DomainsTransactionsGateway', () => {
  let service: DomainsTransactionsGateway;
  let httpTestingController: HttpTestingController;
  let walletId: TServerEntityId;
  let transactionsResp: IWalletTransactionApiResponse[];
  let apiUrl: string;

  beforeEach(async () => {
    walletId = 1;
    apiUrl = API_TRANSACTIONS_URL;
    transactionsResp = WALLET_TRANSACTIONS_API_RESPONSE_MOCK(1);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        DomainsTransactionsGateway,
      ],
    }).compileComponents();

    httpTestingController = TestBed.inject<HttpTestingController>(HttpTestingController);
    service = TestBed.inject<DomainsTransactionsGateway>(DomainsTransactionsGateway);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('getWalletTransactions', () => {
    it('should call Api and return wallet \'s transactions', () => {
      service.getWalletTransactions(walletId).subscribe((val: IWalletTransactionApiResponse[]) => {
        expect(val.length).toBe(3);
      });

      const req = httpTestingController.expectOne(apiUrl + `?walletId=${walletId}`);
      expect(req.request.method).toEqual('GET');
      req.flush([ transactionsResp ]);
    });
  });

  describe('createWalletTransaction', () => {
    it('should call Api and return wallet \'s transaction', () => {
      service.createWalletTransaction(walletId, TRANSACTION_PAYLOAD_MOCK).subscribe((val: IWalletTransactionApiResponse) => {
        expect(val.amount).toEqual(TRANSACTION_PAYLOAD_MOCK.amount);
        expect(val.type).toEqual(TRANSACTION_PAYLOAD_MOCK.type);
      });

      const req = httpTestingController.expectOne(apiUrl);
      expect(req.request.method).toEqual('POST');
      req.flush([ transactionsResp ]);
    });
  });

  describe('editWalletTransaction', () => {
    it('should call Api and return updated wallet \'s transaction', () => {
      service.editWalletTransaction(walletId, UPDATED_WALLET_TRANSACTIONS_OBJECT_MOCK(1))
        .subscribe((val: IWalletTransactionApiResponse) => {
          expect(val.amount).toEqual(UPDATED_WALLET_TRANSACTIONS_OBJECT_MOCK(1).amount);
          expect(val.type).toEqual(UPDATED_WALLET_TRANSACTIONS_OBJECT_MOCK(1).type);
        });

      const req = httpTestingController.expectOne(apiUrl + `/${walletId}`);
      expect(req.request.method).toEqual('PUT');
      req.flush([ transactionsResp ]);
    });
  });
});
