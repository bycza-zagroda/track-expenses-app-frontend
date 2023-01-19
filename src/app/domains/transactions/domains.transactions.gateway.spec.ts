import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { DomainsTransactionsGateway } from './domains.transactions.gateway';
import { IWalletTransactionApiResponse } from './domains.transactions.types';
import { TRANSACTION_PAYLOAD_MOCK, WALLET_TRANSACTIONS_INCOME_MOCK } from './domains.transactions.mocks';
import { TServerEntityId } from 'src/app/common/http/common.http.types';

describe('DomainsWalletsGateway', () => {
  let service: DomainsTransactionsGateway;
  let httpTestingController: HttpTestingController;
  let walletId: TServerEntityId;

  beforeEach(async () => {
    walletId = 1;

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
    it('should call fakeRequest and return wallet \'s transactions', (done) => {
      service.getWalletTransactions(walletId).subscribe((val: IWalletTransactionApiResponse[]) => {
        expect(val.length).toEqual(3);
        done();
      });
    });
  });

  describe('createWalletTransaction', () => {
    it('should call fakeRequest and return wallet \'s transaction', (done) => {
      service.createWalletTransaction(TRANSACTION_PAYLOAD_MOCK).subscribe((val: IWalletTransactionApiResponse) => {
        expect(val.id).toBeGreaterThan(99);
        expect(val.amount).toEqual(TRANSACTION_PAYLOAD_MOCK.amount);
        expect(val.type).toEqual(TRANSACTION_PAYLOAD_MOCK.type);
        expect(val.description).toEqual(TRANSACTION_PAYLOAD_MOCK.description!);
        done();
      });
    });
  });

  describe('editWalletTransaction', () => {
    it('should call fakeRequest and return updated wallet \'s transaction', (done) => {
      service.editWalletTransaction(WALLET_TRANSACTIONS_INCOME_MOCK.id!, WALLET_TRANSACTIONS_INCOME_MOCK)
        .subscribe((val: IWalletTransactionApiResponse) => {
          expect(val.id).toEqual(WALLET_TRANSACTIONS_INCOME_MOCK.id!);
          expect(val.amount).toEqual(WALLET_TRANSACTIONS_INCOME_MOCK.amount);
          expect(val.type).toEqual(WALLET_TRANSACTIONS_INCOME_MOCK.type);
          done();
        });
    });
  });
});
