import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWalletResponse, IWalletPayload } from './wallets.types';
import { TServerEntityId } from '../../common/types';

@Injectable({
  providedIn: 'root',
})
export class WalletsGatewayService {
  public constructor(private readonly http: HttpClient) {}

  public getWallets(): Observable<IWalletResponse[]> {
    return this.http.get<IWalletResponse[]>('/api/wallets');
  }

  public getWalletById(id: TServerEntityId): Observable<IWalletResponse> {
    return this.http.get<IWalletResponse>(`/api/wallets/${id}`);
  }

  public deleteWallet(id: TServerEntityId): Observable<unknown> {
    return this.http.delete<unknown>(`/api/wallets/${id}`);
  }

  public createWallet(payload: IWalletPayload): Observable<IWalletResponse> {
    return this.http.post<IWalletResponse>('/api/wallets', payload);
  }

  public updateWallet(
    id: TServerEntityId,
    payload: IWalletPayload,
  ): Observable<IWalletResponse> {
    return this.http.patch<IWalletResponse>(`/api/wallets/${id}`, payload);
  }
}
