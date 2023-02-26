import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
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

  public loadCategories(): Observable<void> {
    return this.domainsTransactionCategoriesGateway.getTransactionCategories().pipe(
      map(categories => {
        const items = categories.map(
          category => new TransactionCategory({ id: category.id, name: category.name, type: category.type }),
        );

        this.categories$.next(items);
      }),
    );
  }
}
