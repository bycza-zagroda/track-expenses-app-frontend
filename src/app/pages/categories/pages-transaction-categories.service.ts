import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TServerEntityId } from 'src/app/common/http/common.http.types';
import { DomainsTransactionCategoriesGateway } from 'src/app/domains/categories/domains.transaction-categories.gateway';
import { ITransactionCategoryFullResponse } from 'src/app/domains/categories/domains.transaction-categories.types';
import { TransactionCategoryFull } from './transaction-category-full.model';
import { TransactionCategory } from './transaction-category.model';

@Injectable({
  providedIn: 'root',
})
export class PagesTransactionCategoriesService {
  public constructor(
    private readonly domainsTransactionCategoriesGateway: DomainsTransactionCategoriesGateway,
  ) {}

  public getCategories(): Observable<TransactionCategory[]> {
    return this.domainsTransactionCategoriesGateway.getTransactionCategories().pipe(
      map(categories => categories.map(
        category => new TransactionCategory({ id: category.id, name: category.name, type: category.type }),
      )),
    );
  }

  public createTransactionCategory(category: TransactionCategory): Observable<TransactionCategory> {
    return this.domainsTransactionCategoriesGateway.createTransactionCategory(category.toPayload()).pipe(
      map(category => TransactionCategory.createFromApiResponse(category)),
    );
  }

  public updateTransactionCategory(category: TransactionCategory): Observable<TransactionCategory> {
    return this.domainsTransactionCategoriesGateway.updateTransactionCategory(category.id!, category.toPayload()).pipe(
      map(category => TransactionCategory.createFromApiResponse(category)),
    );
  }

  public getTransactionCategoryById(categoryId: TServerEntityId): Observable<TransactionCategoryFull> {
    return this.domainsTransactionCategoriesGateway.getTransactionCategoryById(categoryId).pipe(
      map(({ financialTransactionCategoryDTO: { id, name, type }, financialTransactionsCounter }
        : ITransactionCategoryFullResponse) =>
        new TransactionCategoryFull({ id, name, type }, financialTransactionsCounter)),
    );
  }
}
