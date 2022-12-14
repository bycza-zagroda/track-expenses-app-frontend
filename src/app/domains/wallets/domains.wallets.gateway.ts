import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWalletApiResponse, IWalletPayload } from './domains.wallets.types';
import { HttpClient } from '@angular/common/http';
import { API_WALLETS_URL } from './domains.wallets.constants';

@Injectable({
  providedIn: 'root',
})
export class DomainsWalletsGateway {
  public constructor(
      private readonly http: HttpClient,
  ) {
  }

  public getWallets(): Observable<IWalletApiResponse[]> {
    return this.http.get<IWalletApiResponse[]>(API_WALLETS_URL);
  }

  public createWallet({ name }: IWalletPayload): Observable<IWalletApiResponse> {
    return this.http.post<IWalletApiResponse>(API_WALLETS_URL, { name });
  }

  public updateWallet(id: number, { name }: IWalletPayload): Observable<IWalletApiResponse> {
    return this.http.put<IWalletApiResponse>(API_WALLETS_URL, { id, name });
  }

  public deleteWallet(id: number): Observable<void> {
    return this.http.delete<void>(API_WALLETS_URL + `/${id}`);
  }
}
