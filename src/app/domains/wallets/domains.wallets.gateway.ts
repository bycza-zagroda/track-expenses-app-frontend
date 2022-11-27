import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWalletApiResponse, IWalletPayload } from './domains.wallets.types';
import { HttpClient } from '@angular/common/http';
import { API_WALLETS_URL } from './domains.wallets.constants';

@Injectable({
  providedIn: 'root',
})
export class DomainsWalletsGateway {
  private apiUrl: string = API_WALLETS_URL;

  public constructor(
    private readonly http: HttpClient,
  ) {}

  public getWallets(): Observable<IWalletApiResponse[]> {
    return this.http.get<IWalletApiResponse[]>(this.apiUrl);
  }

  public createWallet({ name }: IWalletPayload): Observable<IWalletApiResponse> {
    return this.http.post<IWalletApiResponse>(this.apiUrl, { name });
  }

  public updateWallet(id: number, { name }: IWalletPayload): Observable<IWalletApiResponse> {
    return this.http.put<IWalletApiResponse>(this.apiUrl, { id, name });
  }
}
