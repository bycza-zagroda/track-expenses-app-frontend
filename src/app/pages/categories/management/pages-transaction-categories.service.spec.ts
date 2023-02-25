import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import {
  DomainsTransactionCategoriesGateway,
} from 'src/app/domains/categories/domains.transaction-categories.gateway';
import {
  transactionCategoriesMock,
  transactionCategoriesObjectsMock,
} from 'src/app/domains/categories/domains.transaction-categories.mocks';
import { TransactionCategory } from '../transaction-category.model';
import { PagesTransactionCategoriesService } from './pages-transaction-categories.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('PagesTransactionCategoriesService', () => {
  let service: PagesTransactionCategoriesService;
  let domainsTransactionCategoryGatewayMock: SpyObj<DomainsTransactionCategoriesGateway>;

  beforeEach(() => {
    domainsTransactionCategoryGatewayMock = createSpyObj<DomainsTransactionCategoriesGateway>
    (DomainsTransactionCategoriesGateway.name, [ 'getTransactionCategories' ]);
    domainsTransactionCategoryGatewayMock.getTransactionCategories.and.returnValue(of(transactionCategoriesMock));

    TestBed.configureTestingModule({
      providers: [
        { provide: DomainsTransactionCategoriesGateway, useValue: domainsTransactionCategoryGatewayMock },
      ],
    });
    service = TestBed.inject(PagesTransactionCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTransactionCategories', () => {
    it('should return array of TransactionCategory instances', fakeAsync(() => {
      service.getCategories$().subscribe((categories: TransactionCategory[]) => {
        expect(categories).toEqual(transactionCategoriesObjectsMock);
      });

      service.getTransactionCategories();
      flushMicrotasks();
    }));
  });
});
