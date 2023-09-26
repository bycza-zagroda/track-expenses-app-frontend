import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITransactionPayload, ITransactionResponse } from './transaction.types';
import { TServerEntityId } from '../../common/types';

const BASE_URL = '/api/transactions/';

@Injectable({
  providedIn: 'root',
})
export class TransactionsGatewayService {
  public constructor(private readonly http: HttpClient) {}

  public getTransactions(
    walletId: TServerEntityId,
  ): Observable<ITransactionResponse[]> {
    const params = new HttpParams().append('walletId', walletId);

    return this.http.get<ITransactionResponse[]>(BASE_URL, {
      params,
    });
  }

  public createTransaction(
    payload: ITransactionPayload,
  ): Observable<ITransactionResponse> {
    return this.http.post<ITransactionResponse>(BASE_URL, payload);
  }

  public updateTransaction(
    transactionId: TServerEntityId,
    payload: ITransactionPayload,
  ): Observable<ITransactionResponse> {
    return this.http.patch<ITransactionResponse>(
      `${BASE_URL}${transactionId}`,
      payload,
    );
  }

  public deleteTransaction(
    transactionId: TServerEntityId,
  ): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}${transactionId}`);
  }
}
