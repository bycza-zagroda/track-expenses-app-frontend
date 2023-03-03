import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fakeRequest } from 'src/app/common/http/common.http.fake-request';
import { TServerEntityId } from 'src/app/common/http/common.http.types';
import { getRandomNumber } from 'src/app/common/utils/common.utils.random';
import { transactionCategoriesMockFunc } from './domains.transaction-categories.mocks';
import { ITransactionCategoryApiResponse, ITransactionCategoryPayload } from './domains.transaction-categories.types';

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
      id: getRandomNumber(100, 1000),
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

  public isTransactionCategoryAlreadyUsed(id: TServerEntityId)
  : Observable<boolean> {
    return fakeRequest( (getRandomNumber(1, 10) > 5 && id > 0) );
    //return this.http.get<boolean>
    //(API_TRANSACTION_CATEGORIES_IS_ALREADY_USED_URL(id));
  }
}
