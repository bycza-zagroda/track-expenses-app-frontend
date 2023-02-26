import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { DomainsTransactionCategoriesGateway } from 'src/app/domains/categories/domains.transaction-categories.gateway';
import { TransactionCategory } from '../transaction-category.model';

@Injectable({
  providedIn: 'root',
})
export class PagesTransactionCategoriesService {
  private categories$: BehaviorSubject<TransactionCategory[]> = new BehaviorSubject<TransactionCategory[]>([]);

  public constructor(
    private readonly domainsTransactionCategoriesGateway: DomainsTransactionCategoriesGateway,
  ) {}

  public getCategories = (): Observable<TransactionCategory[]> => this.categories$.asObservable();

  public loadCategories(): Observable<TransactionCategory[]> {
    return this.domainsTransactionCategoriesGateway.getTransactionCategories().pipe(
      map(categories => categories.map(
        category => new TransactionCategory({ id: category.id, name: category.name, type: category.type }),
      )),
      tap( (categories: TransactionCategory[]) => {
        this.categories$.next(categories);
      }),
    )
  }
}
