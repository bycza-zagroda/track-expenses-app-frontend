import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { DomainsTransactionCategoriesGateway } from 'src/app/domains/categories/domains.transaction-categories.gateway';
import { TransactionCategory } from '../transaction-category.model';

@Injectable({
  providedIn: 'root',
})
export class PagesTransactionCategoriesService {
  private categories$: Subject<TransactionCategory[]> = new Subject<TransactionCategory[]>();

  public constructor(
    private readonly domainsTransactionCategoriesGateway: DomainsTransactionCategoriesGateway,
  ) {}

  public getCategories$ = (): Observable<TransactionCategory[]> => this.categories$.asObservable();

  public getTransactionCategories(): void {
    this.domainsTransactionCategoriesGateway.getTransactionCategories().pipe(
      map(categories => categories.map(
        category => new TransactionCategory(category.id, category.name, category.type),
      )),
    ).subscribe( (categories: TransactionCategory[]) => {
      this.categories$.next(categories);
    });
  }
}
