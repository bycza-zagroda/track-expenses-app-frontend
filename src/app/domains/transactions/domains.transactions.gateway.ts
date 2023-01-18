import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { fakeRequest } from 'src/app/common/http/common.http.fake-request';
import { getRandomNumber } from 'src/app/common/utils/common.utils.random';
import { WalletsDetailsTransaction } from 'src/app/pages/wallets/wallet-details/pages-wallet-details-item.model';
import { ITransactionPayload, IWalletTransactionApiResponse } from './domains.transactions.types';
import { WALLET_TRANSACTIONS_API_RESPONSE_MOCK } from './domains.transactions.mocks';
import { TServerEntityId } from 'src/app/common/http/common.http.types';

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
  }

  public createWalletTransaction(payload: ITransactionPayload): Observable<IWalletTransactionApiResponse> {
    return fakeRequest({
      id: getRandomNumber(100, 1000),
      creationDate: new Date().toString(),
      amount: payload.amount,
      description: payload.description ?? '',
      type: payload.type,
    });
  }

  public editWalletTransaction(id: TServerEntityId, payload: WalletsDetailsTransaction)
  : Observable<IWalletTransactionApiResponse> {
    return fakeRequest({
      id: id,
      creationDate: payload.date.toString(),
      amount: payload.amount,
      description: payload.description ?? '',
      type: payload.type,
    });
  }
}
