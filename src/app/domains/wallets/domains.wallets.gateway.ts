import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IWalletApiResponse,
  IWalletPayload,
} from './domains.wallets.types';
import { HttpClient } from '@angular/common/http';
import { API_WALLETS_URL } from './domains.wallets.constants';
import { TServerEntityId } from 'src/app/common/http/common.http.types';
import { fakeRequest } from 'src/app/common/http/common.http.fake-request';
import { GET_WALLETS_API_RESPONSE_MOCK } from './domains.wallets.mocks';

@Injectable({
  providedIn: 'root',
})
export class DomainsWalletsGateway {
  public constructor(
    private readonly http: HttpClient,
  ) {
  }

  public getWallets(): Observable<IWalletApiResponse[]> {
    return fakeRequest(GET_WALLETS_API_RESPONSE_MOCK());
    return this.http.get<IWalletApiResponse[]>(API_WALLETS_URL);
  }

  public createWallet({ name }: IWalletPayload): Observable<IWalletApiResponse> {
    return this.http.post<IWalletApiResponse>(API_WALLETS_URL, { name });
  }

  public updateWallet(id: TServerEntityId, { name }: IWalletPayload): Observable<IWalletApiResponse> {
    return this.http.patch<IWalletApiResponse>(`${ API_WALLETS_URL }/${ id }`, { name });
  }

  public deleteWallet(id: TServerEntityId): Observable<unknown> {
    return this.http.delete(`${ API_WALLETS_URL }/${ id }`);
  }
}
