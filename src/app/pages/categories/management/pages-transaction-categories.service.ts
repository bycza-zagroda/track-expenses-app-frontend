import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DomainsTransactionCategoriesGateway } from 'src/app/domains/categories/domains-transaction-categories-gateway';
import { TransactionCategory } from '../transaction-category.model';

@Injectable({
  providedIn: 'root',
})
export class PagesTransactionCategoriesService {
  public constructor(
    private readonly domainsTransactionCategoriesGateway: DomainsTransactionCategoriesGateway,
  ) { }

  public getTransactionCategories(): Observable<TransactionCategory[]> {
    return this.domainsTransactionCategoriesGateway.getTransactionCategories().pipe(
      map(categories => categories.map(
        category => new TransactionCategory(category.id, category.name, category.type ),
      )),
    );
  }
}
