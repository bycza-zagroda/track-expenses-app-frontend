import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWalletApiResponse, IWalletPayload } from './domains.wallets.types';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DomainsWalletsGateway {
  apiUrl: string = environment.remotePath + '/api/wallet';

  constructor(
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
