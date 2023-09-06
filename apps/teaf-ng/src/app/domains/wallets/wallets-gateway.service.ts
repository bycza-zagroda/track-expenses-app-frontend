import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWalletResponse, IWalletPayload } from './wallets.types';
import { TServerEntityId } from '../../common/types';

@Injectable({
  providedIn: 'root',
})
export class WalletsGatewayService {
  requestOptions = {headers:new HttpHeaders({'ngrok-skip-browser-warning':'hello'})}

  public constructor(private readonly http: HttpClient) {}

  public getWallets(): Observable<IWalletResponse[]> {
    return this.http.get<IWalletResponse[]>('/api/wallets', this.requestOptions);
  }

  public getWalletById(id: TServerEntityId): Observable<IWalletResponse> {
    return this.http.get<IWalletResponse>(`/api/wallets/${id}`, this.requestOptions);
  }

  public deleteWallet(id: TServerEntityId): Observable<unknown> {
    return this.http.delete<unknown>(`/api/wallets/${id}`, this.requestOptions);
  }

  public createWallet(payload: IWalletPayload): Observable<IWalletResponse> {
    return this.http.post<IWalletResponse>('/api/wallets', payload, this.requestOptions);
  }

  public updateWallet(id: TServerEntityId, payload: IWalletPayload): Observable<IWalletResponse> {
    return this.http.patch<IWalletResponse>(`/api/wallets/${id}`, payload);
  }
}
