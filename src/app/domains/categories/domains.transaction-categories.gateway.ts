import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fakeRequest } from 'src/app/common/http/common.http.fake-request';
import { transactionCategoriesMock } from './domains.transaction-categories.mocks';
import { ITransactionCategoryApiResponse } from './domains.transaction-categories.types';

@Injectable({
  providedIn: 'root',
})
export class DomainsTransactionCategoriesGateway {
  public constructor(
    private readonly http: HttpClient,
  ) { }

  public getTransactionCategories(): Observable<ITransactionCategoryApiResponse[]> {
    return fakeRequest(transactionCategoriesMock);
    //return this.http.get<ITransactionCategoryApiResponse[]>(API_TRANSACTION_CATEGORY_URL);
  }
}
