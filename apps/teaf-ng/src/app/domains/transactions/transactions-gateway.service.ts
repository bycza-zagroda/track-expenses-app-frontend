import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITransactionPayload, ITransactionResponse } from './transaction.types';
import { TServerEntityId } from '../../common/types';

@Injectable({
  providedIn: 'root',
})
export class TransactionsGatewayService {
  requestOptions = {headers:new HttpHeaders({'ngrok-skip-browser-warning':'hello'})}

  public constructor(private readonly http: HttpClient) {}

  public getTransactions(walletId: TServerEntityId): Observable<ITransactionResponse[]> {
    const params = new HttpParams().append('walletId', walletId);

    let api = this.http.get<ITransactionResponse[]>('/api/transactions?walletId=4', this.requestOptions);
    api.subscribe((v)=>console.log(v));
    return api;
  }

  public createTransaction(payload: ITransactionPayload): Observable<ITransactionResponse> {
    return this.http.post<ITransactionResponse>('/api/transactions', payload, this.requestOptions);
  }

  public updateTransaction(transactionId: TServerEntityId, payload: ITransactionPayload): Observable<ITransactionResponse> {
    return this.http.patch<ITransactionResponse>(`/api/transactions/${transactionId}`, payload, this.requestOptions);
  }

  public deleteTransaction(transactionId: TServerEntityId): Observable<unknown> {
    return this.http.delete(`/api/transactions/${transactionId}`, this.requestOptions);
  }
}
