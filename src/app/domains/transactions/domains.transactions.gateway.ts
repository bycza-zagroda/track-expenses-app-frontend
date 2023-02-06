import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { WalletTransaction } from 'src/app/pages/wallets/wallet-details/pages-wallet-details-item.model';
import { IWalletTransactionApiResponse } from './domains.transactions.types';
import { TServerEntityId } from 'src/app/common/http/common.http.types';
import { API_TRANSACTIONS_URL } from './domains.transactions.constants';
import { fakeRequest } from 'src/app/common/http/common.http.fake-request';
import { WALLET_TRANSACTIONS_API_RESPONSE_MOCK } from './domains.transactions.mocks';

@Injectable({
  providedIn: 'root',
})
export class DomainsTransactionsGateway {
  public constructor(
    private readonly http: HttpClient,
  ) {
  }

  public getWalletTransactions(id: TServerEntityId): Observable<IWalletTransactionApiResponse[]> {
    return fakeRequest(WALLET_TRANSACTIONS_API_RESPONSE_MOCK(1));
    const queryParams = new HttpParams()
      .append('walletId', id);

    return this.http.get<IWalletTransactionApiResponse[]>(API_TRANSACTIONS_URL, { params: queryParams });
  }

  public createWalletTransaction(transaction: WalletTransaction)
  : Observable<IWalletTransactionApiResponse> {
    return this.http.post<IWalletTransactionApiResponse>(API_TRANSACTIONS_URL, transaction.toPayload());
  }

  public editWalletTransaction(transaction: WalletTransaction)
  : Observable<IWalletTransactionApiResponse> {
    return this.http.put<IWalletTransactionApiResponse>(API_TRANSACTIONS_URL + `/${transaction.id!}`,
      transaction.toPayload());
  }

  public removeWalletTransaction(transaction: WalletTransaction): Observable<unknown> {
    return this.http.delete(API_TRANSACTIONS_URL + `/${transaction.id!}`);
  }
}
