import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ITransactionPayload,
  IWalletApiResponse,
  IWalletPayload,
  IWalletTransactionApiResponse,
} from './domains.wallets.types';
import { HttpClient } from '@angular/common/http';
import { API_WALLETS_URL } from './domains.wallets.constants';
import { fakeRequest } from 'src/app/common/http/common.http.fake-request';
import { GET_WALLETS_API_RESPONSE_MOCK, WALLET_TRANSACTIONS_API_RESPONSE_MOCK } from './domains.wallets.mocks';
import { getRandomNumber } from 'src/app/common/utils/common.utils.random';
import { WalletsDetailsTransaction } from 'src/app/pages/wallets/wallet-details/pages-wallet-details-item.model';

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

  public createWallet({ name }: IWalletPayload): Observable<IWalletApiResponse> { throw new Error("no createWallet");
    return this.http.post<IWalletApiResponse>(API_WALLETS_URL, { name });
  }

  public updateWallet(id: number, { name }: IWalletPayload): Observable<IWalletApiResponse> {
    return fakeRequest({id: id, creationDate: new Date().toString(), name});
    return this.http.patch<IWalletApiResponse>(`${ API_WALLETS_URL }/${ id }`, { name });
  }

  public deleteWallet(id: number): Observable<unknown> {
    return this.http.delete(`${ API_WALLETS_URL }/${ id }`);
  }

  public getWalletTransactions(id: number): Observable<IWalletTransactionApiResponse[]> {
    return fakeRequest(WALLET_TRANSACTIONS_API_RESPONSE_MOCK(id));
  }

  public createWalletTransaction(payload: ITransactionPayload): Observable<IWalletTransactionApiResponse> {
    return fakeRequest({
      id: getRandomNumber(100, 1000),
      creationDate: new Date().toString(),
      amount: payload.amount,
      description: payload.description ?? '',
      type: payload.type,
    });
  }

  public editWalletTransaction(id: number, payload: WalletsDetailsTransaction): Observable<IWalletTransactionApiResponse> {
    return fakeRequest({
      id: id,
      creationDate: payload.date.toString(),
      amount: payload.amount,
      description: payload.description ?? '',
      type: payload.type,
    });
  }
}
