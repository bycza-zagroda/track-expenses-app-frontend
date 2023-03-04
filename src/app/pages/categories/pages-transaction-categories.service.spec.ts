import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import {
  DomainsTransactionCategoriesGateway,
} from 'src/app/domains/categories/domains.transaction-categories.gateway';
import {
  categoryFullObjectMockFunc,
  categoryFullResponseMockFunc,
  transactionCategoriesMockFunc,
  transactionCategoriesObjectsMockFunc,
  transactionCategoryObjectMockFunc,
} from 'src/app/domains/categories/domains.transaction-categories.mocks';
import { TransactionCategory } from './transaction-category.model';
import { PagesTransactionCategoriesService } from './pages-transaction-categories.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { TransactionCategoryFull } from './transaction-category-full.model';

describe('PagesTransactionCategoriesService', () => {
  let service: PagesTransactionCategoriesService;
  let gateway: SpyObj<DomainsTransactionCategoriesGateway>;
  let categoryObjectMock: TransactionCategory;
  let counter: number;

  beforeEach(() => {
    categoryObjectMock = transactionCategoryObjectMockFunc();
    counter = 1;

    gateway = createSpyObj<DomainsTransactionCategoriesGateway>
    (DomainsTransactionCategoriesGateway.name,
      [ 'getTransactionCategories', 'createTransactionCategory',
        'updateTransactionCategory', 'getTransactionCategoryById' ]);
    gateway.getTransactionCategories.and.returnValue(of(transactionCategoriesMockFunc()));
    gateway.createTransactionCategory.and.returnValue(of(transactionCategoriesMockFunc()[0]));
    gateway.updateTransactionCategory.and.returnValue(of(transactionCategoriesMockFunc()[0]));
    gateway.getTransactionCategoryById.and.returnValue(of(categoryFullResponseMockFunc(1, counter)));

    TestBed.configureTestingModule({
      providers: [
        { provide: DomainsTransactionCategoriesGateway, useValue: gateway },
      ],
    });
    service = TestBed.inject(PagesTransactionCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTransactionCategories', () => {
    it('should return array of TransactionCategory instances', (done) => {
      service.getCategories().subscribe((categories: TransactionCategory[]) => {
        expect(categories).toEqual(transactionCategoriesObjectsMockFunc());
        done();
      });
    });
  });

  describe('createTransactionCategory', () => {
    it('should return array of TransactionCategory instances', (done) => {
      service.createTransactionCategory(categoryObjectMock)
        .subscribe((category: TransactionCategory) => {
          expect(category).toEqual(categoryObjectMock);
          done();
        });
    });
  });

  describe('updateTransactionCategory', () => {
    it('should return updated TransactionCategory instance', (done) => {
      service.updateTransactionCategory(categoryObjectMock)
        .subscribe((category: TransactionCategory) => {
          expect(category).toEqual(categoryObjectMock);
          done();
        });
    });
  });

  describe('isTransactionCategorryAlreadyUsed', () => {
    it('should return info whether category is already used by any transaction', (done) => {
      service.getTransactionCategoryById(categoryObjectMock)
        .subscribe((response: TransactionCategoryFull) => {
          expect(response).toEqual(categoryFullObjectMockFunc(counter));
          done();
        });
    });
  });
});
