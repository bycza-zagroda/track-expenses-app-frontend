import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WalletsDetailsTransaction } from 'src/app/pages/wallets/wallet-details/pages-wallet-details-item.model';
import { ITransactionPayload, IWalletTransactionApiResponse } from './domains.transactions.types';
import { TServerEntityId } from 'src/app/common/http/common.http.types';
import { API_TRANSACTIONS_URL } from './domains.transactions.constants';

@Injectable({
  providedIn: 'root',
})
export class DomainsTransactionsGateway {
  public constructor(
    private readonly http: HttpClient,
  ) {
  }

  public getWalletTransactions(id: TServerEntityId): Observable<IWalletTransactionApiResponse[]> {
    return this.http.get<IWalletTransactionApiResponse[]>(API_TRANSACTIONS_URL + `?walletId=${id}`);
  }

  public createWalletTransaction(id: TServerEntityId, { amount, transactionDate, type, description }: ITransactionPayload)
  : Observable<IWalletTransactionApiResponse> {
    return this.http.post<IWalletTransactionApiResponse>(API_TRANSACTIONS_URL, {
      walletId: id,
      amount,
      transactionDate,
      type,
      description,
    });
  }

  public editWalletTransaction(id: TServerEntityId,
    { amount, transactionDate, type, description }: WalletsDetailsTransaction): Observable<IWalletTransactionApiResponse> {
    return this.http.put<IWalletTransactionApiResponse>(API_TRANSACTIONS_URL + `/${id}`, {
      amount,
      transactionDate,
      type,
      description,
    });
  }
}
