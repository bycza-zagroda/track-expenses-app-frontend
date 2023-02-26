import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, Subject, tap } from 'rxjs';
import { DomainsTransactionCategoriesGateway } from 'src/app/domains/categories/domains.transaction-categories.gateway';
import { TransactionCategory } from './pages/categories/transaction-category.model';

@Injectable({
  providedIn: 'root',
})
export class PagesTransactionCategoriesService {
  private categories$: BehaviorSubject<TransactionCategory[]> = new BehaviorSubject<TransactionCategory[]>([]);

  public constructor(
    private readonly domainsTransactionCategoriesGateway: DomainsTransactionCategoriesGateway,
  ) {}

  public getCategories = (): Observable<TransactionCategory[]> => this.categories$.asObservable();

  public loadCategories(): void { console.log(1)
    this.domainsTransactionCategoriesGateway.getTransactionCategories().pipe(
      map(categories => categories.map(
        category => new TransactionCategory({ id: category.id, name: category.name, type: category.type }),
      )),
      tap( (categories: TransactionCategory[]) => { console.log(2)
        this.categories$.next(categories);
      }),
    )
  }
}
