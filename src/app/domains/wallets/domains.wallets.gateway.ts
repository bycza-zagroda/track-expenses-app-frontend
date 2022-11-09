import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWalletApiResponse } from './domains.wallets.types';
import { fakeRequest } from '../../common/http/common.http.fake-request';
import { getRandomNumber } from 'src/app/common/utils/common.utils.random';

@Injectable({
  providedIn: 'root',
})
export class DomainsWalletsGateway {
  public getWallets(): Observable<IWalletApiResponse[]> {
   return fakeRequest([
     {
       name: 'Wallet 1',
       creationDate: '2022-10-22T09:47:52.595721658Z',
       id: 1,
     },
     {
       name: 'Wallet 2',
       creationDate: '2022-10-23T09:47:52.595721658Z',
       id: 2,
     },
     {
       name: 'Wallet 3',
       creationDate: '2022-10-24T09:47:52.595721658Z',
       id: 3,
     },
   ])
  }

  public addNewWallet(name_: string): Observable<IWalletApiResponse> {
    return fakeRequest({
      name: name_,
      creationDate: '2022-10-22T09:47:52.595721658Z',
      id: getRandomNumber(100, 10000),
    });
  }

  public updateNewWallet(id_: number, name_: string): Observable<IWalletApiResponse> {
    return fakeRequest({
      name: name_,
      creationDate: new Date().toString(),
      id: id_,
    });
  }
}
