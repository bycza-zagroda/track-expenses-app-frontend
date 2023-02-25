import { Injectable, OnDestroy } from '@angular/core';
import { map, Observable, Subject, Subscription } from 'rxjs';
import { DomainsTransactionCategoriesGateway } from 'src/app/domains/categories/domains.transaction-categories.gateway';
import { TransactionCategory } from '../transaction-category.model';

@Injectable({
  providedIn: 'root',
})
export class PagesTransactionCategoriesService implements OnDestroy {
  private categories$: Subject<TransactionCategory[]> = new Subject<TransactionCategory[]>();

  private categoriesTypeSub!: Subscription;

  public constructor(
    private readonly domainsTransactionCategoriesGateway: DomainsTransactionCategoriesGateway,
  ) {}

  public getCategories$ = (): Observable<TransactionCategory[]> => this.categories$.asObservable();

  public getTransactionCategories(): void {
    this.categoriesTypeSub = this.domainsTransactionCategoriesGateway.getTransactionCategories().pipe(
      map(categories => categories.map(
        category => new TransactionCategory(category.id, category.name, category.type),
      )),
    ).subscribe( (categories: TransactionCategory[]) => {
      this.categories$.next(categories);
    });
  }

  public ngOnDestroy(): void {
    this.categoriesTypeSub.unsubscribe();
  }
}
