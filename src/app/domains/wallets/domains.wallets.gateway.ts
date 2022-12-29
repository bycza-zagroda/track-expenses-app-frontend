import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWalletApiResponse, IWalletDetailsApiResponse, IWalletPayload } from './domains.wallets.types';
import { HttpClient } from '@angular/common/http';
import { API_WALLETS_URL } from './domains.wallets.constants';
import { fakeRequest } from 'src/app/common/http/common.http.fake-request';

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

  public getWalletsDetails(id: number): Observable<IWalletDetailsApiResponse> {
    return fakeRequest({
      id,
      name: 'wallet1',
      creationDate: '',
      transactions: [
        { id: 1, date: 'dat1', description: '1x', amount: 3},
        { id: 2, date: 'date2', description: '2x', amount: 5},
        { id: 3, date: 'date3', description: '3x', amount: 3},
      ],
    });
  }
}
