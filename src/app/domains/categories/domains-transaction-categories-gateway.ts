import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fakeRequest } from 'src/app/common/http/common.http.fake-request';
import { WalletTransactionType } from '../transactions/domains.transactions.constants';
import { ITransactionCategoryApiResponse } from './domains.transaction-categories.types';

@Injectable({
  providedIn: 'root'
})
export class DomainsTransactionCategoriesGateway {
  public constructor(
    private readonly http: HttpClient,
  ) {
  }

  public getTransactionCategories(): Observable<ITransactionCategoryApiResponse[]> {
    return fakeRequest([
      { id: 1, name: 'Nic', type: WalletTransactionType.Income },
      { id: 2, name: 'Nic2', type: WalletTransactionType.Income },
      { id: 3, name: 'Nic3', type: WalletTransactionType.Expense },
    ]);
    //return this.http.get<ITransactionCategoryApiResponse[]>(API_TRANSACTION_CATEGORY_URL);
  }
}
