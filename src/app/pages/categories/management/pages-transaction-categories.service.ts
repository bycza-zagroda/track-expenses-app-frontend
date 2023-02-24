import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DomainsTransactionCategoriesGateway } from 'src/app/domains/categories/domains-transaction-categories-gateway';
import { TransactionCategory } from 'src/app/domains/categories/domains.transaction-categories.types';

@Injectable({
  providedIn: 'root'
})
export class PagesTransactionCategoriesService {

  constructor(
    private readonly domainsTransactionCategoriesGateway: DomainsTransactionCategoriesGateway,
  ) { }

  public getTransactionCategories(): Observable<TransactionCategory[]> {
    return this.domainsTransactionCategoriesGateway.getTransactionCategories().pipe(
      map(categories => categories.map(c => new TransactionCategory(c.id, c.name, c.type )))
    );
  }

}
