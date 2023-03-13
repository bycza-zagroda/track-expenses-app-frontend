import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fakeRequest } from 'src/app/common/http/common.http.fake-request';
import { TServerEntityId } from 'src/app/common/http/common.http.types';
import { getRoundedRandomNumber } from 'src/app/common/utils/common.utils.random';
//import { API_TRANSACTION_CATEGORY_FULL_URL } from './domains.transaction-categories.constants';
//import { API_TRANSACTION_CATEGORY_FULL_URL } from './domains.transaction-categories.constants';
import { categoryFullResponseMockFunc, transactionCategoriesMockFunc } from './domains.transaction-categories.mocks';
import {
  ITransactionCategoryApiResponse,
  ITransactionCategoryFullResponse,
  ITransactionCategoryPayload,
} from './domains.transaction-categories.types';

@Injectable({
  providedIn: 'root',
})
export class DomainsTransactionCategoriesGateway {
  public constructor(
    private readonly http: HttpClient,
  ) { }

  public getTransactionCategories(): Observable<ITransactionCategoryApiResponse[]> {
    return fakeRequest(transactionCategoriesMockFunc());
    //return this.http.get<ITransactionCategoryApiResponse[]>(API_TRANSACTION_CATEGORIES_URL);
  }

  public createTransactionCategory({ name, type }: ITransactionCategoryPayload)
  : Observable<ITransactionCategoryApiResponse> {
    return fakeRequest({
      id: getRoundedRandomNumber(100, 1000),
      name,
      type,
    });
    //return this.http.post<ITransactionCategoryApiResponse>(API_TRANSACTION_CATEGORIES_URL, { name, type });
  }

  public updateTransactionCategory(id: TServerEntityId, { name, type }: ITransactionCategoryPayload)
  : Observable<ITransactionCategoryApiResponse> {
    return fakeRequest({
      id,
      name,
      type,
    });
    //return this.http.patch<ITransactionCategoryApiResponse>(`${ API_TRANSACTION_CATEGORIES_URL }/${ id }`, { name, type });
  }

  public getTransactionCategoryById(id: TServerEntityId)
  : Observable<ITransactionCategoryFullResponse> {
    return fakeRequest( categoryFullResponseMockFunc(id, 2) );
    //return this.http.get<ITransactionCategoryFullResponse>(API_TRANSACTION_CATEGORY_FULL_URL(id));
  }

  public deleteCategory(id: TServerEntityId): Observable<unknown> {
    return fakeRequest("deleted");
    // return this.http.delete(`${ API_TRANSACTION_CATEGORIES_URL }/${ id }`);
  }
}
