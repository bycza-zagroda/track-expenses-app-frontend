import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWalletResponse, IWalletPayload } from './wallets.types';
import { TServerEntityId } from '../../common/types';

export const BASE_URL = '/api/wallets/';

@Injectable({
  providedIn: 'root',
})
export class WalletsGatewayService {
  public constructor(private readonly http: HttpClient) {}

  public getWallets(): Observable<IWalletResponse[]> {
    return this.http.get<IWalletResponse[]>(BASE_URL);
  }

  public getWalletById(id: TServerEntityId): Observable<IWalletResponse> {
    return this.http.get<IWalletResponse>(`${BASE_URL}${id}`);
  }

  public deleteWallet(id: TServerEntityId): Observable<unknown> {
    return this.http.delete<unknown>(`${BASE_URL}${id}`);
  }

  public createWallet(payload: IWalletPayload): Observable<IWalletResponse> {
    return this.http.post<IWalletResponse>(BASE_URL, payload);
  }

  public updateWallet(
    id: TServerEntityId,
    payload: IWalletPayload,
  ): Observable<IWalletResponse> {
    return this.http.patch<IWalletResponse>(`${BASE_URL}${id}`, payload);
  }
}
