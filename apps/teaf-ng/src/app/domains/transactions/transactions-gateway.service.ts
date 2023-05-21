import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITransactionPayload, ITransactionResponse } from './transaction.types';
import { TServerEntityId } from '../../common/types';

@Injectable({
  providedIn: 'root',
})
export class TransactionsGatewayService {
  public constructor(private readonly http: HttpClient) {}

  public getTransactions(walletId: TServerEntityId): Observable<ITransactionResponse[]> {
    const params = new HttpParams().append('walletId', walletId);

    return this.http.get<ITransactionResponse[]>('/api/transactions', { params });
  }

  public createTransaction(payload: ITransactionPayload): Observable<ITransactionResponse> {
    return this.http.post<ITransactionResponse>('/api/transactions', payload);
  }

  public updateTransaction(transactionId: TServerEntityId, payload: ITransactionPayload): Observable<ITransactionResponse> {
    return this.http.patch<ITransactionResponse>(`/api/transactions/${transactionId}`, payload);
  }

  public deleteTransaction(transactionId: TServerEntityId): Observable<unknown> {
    return this.http.delete(`/api/transactions/${transactionId}`);
  }
}
