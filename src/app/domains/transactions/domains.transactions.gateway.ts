import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { WalletsDetailsTransaction } from 'src/app/pages/wallets/wallet-details/pages-wallet-details-item.model';
import { ITransactionPayload, IWalletTransactionApiResponse } from './domains.transactions.types';
import { TServerEntityId } from 'src/app/common/http/common.http.types';
import { API_TRANSACTIONS_URL } from './domains.transactions.constants';
import { fakeRequest } from 'src/app/common/http/common.http.fake-request';
import { WALLET_TRANSACTIONS_API_RESPONSE_MOCK } from './domains.transactions.mocks';
import { getRandomNumber } from 'src/app/common/utils/common.utils.random';

@Injectable({
  providedIn: 'root',
})
export class DomainsTransactionsGateway {
  public constructor(
    private readonly http: HttpClient,
  ) {
  }

  public getWalletTransactions(id: TServerEntityId): Observable<IWalletTransactionApiResponse[]> {
    return fakeRequest(WALLET_TRANSACTIONS_API_RESPONSE_MOCK(id));
    // let queryParams = new HttpParams()
    //   .append('walletId', id);

    // return this.http.get<IWalletTransactionApiResponse[]>(API_TRANSACTIONS_URL, { params: queryParams });
  }

  public createWalletTransaction({ amount, transactionDate, type, description, walletId }: ITransactionPayload)
  : Observable<IWalletTransactionApiResponse> {
    debugger;
    return fakeRequest({
      id: getRandomNumber(100, 1000),
      transactionDate: new Date().toISOString(),
      creationDate: new Date().toISOString(),
      amount: amount,
      description: description ?? '',
      type: type,
      walletId: walletId,
    });
    // return this.http.post<IWalletTransactionApiResponse>(API_TRANSACTIONS_URL, {
    //   walletId,
    //   amount,
    //   transactionDate,
    //   type,
    //   description,
    // });
  }

  public editWalletTransaction( { id, amount, transactionDate, type, description, walletId }: WalletsDetailsTransaction)
  : Observable<IWalletTransactionApiResponse> {
    debugger;
    return fakeRequest({
      id: id!,
      transactionDate: new Date().toISOString(),
      creationDate: new Date().toISOString(),
      amount: amount,
      description: description ?? '',
      type: type,
      walletId,
    });
    // return this.http.put<IWalletTransactionApiResponse>(API_TRANSACTIONS_URL + `/${id}`, {
    //   amount,
    //   transactionDate,
    //   type,
    //   description,
    // });
  }
}
