import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import {
  DomainsTransactionCategoriesGateway,
} from 'src/app/domains/categories/domains.transaction-categories.gateway';
import {
  transactionCategoriesMockFunc,
  transactionCategoriesObjectsMockFunc,
  transactionCategoryObjectMockFunc,
} from 'src/app/domains/categories/domains.transaction-categories.mocks';
import { TransactionCategory } from './transaction-category.model';
import { PagesTransactionCategoriesService } from './pages-transaction-categories.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('PagesTransactionCategoriesService', () => {
  let service: PagesTransactionCategoriesService;
  let domainsTransactionCategoryGatewayMock: SpyObj<DomainsTransactionCategoriesGateway>;
  let categoryObjectMock: TransactionCategory;

  beforeEach(() => {
    categoryObjectMock = transactionCategoryObjectMockFunc();

    domainsTransactionCategoryGatewayMock = createSpyObj<DomainsTransactionCategoriesGateway>
    (DomainsTransactionCategoriesGateway.name,
      [ 'getTransactionCategories', 'createTransactionCategory',
        'updateTransactionCategory', 'isTransactionCategoryAlreadyUsed' ]);
    domainsTransactionCategoryGatewayMock.getTransactionCategories.and.returnValue(of(transactionCategoriesMockFunc()));
    domainsTransactionCategoryGatewayMock.createTransactionCategory.and.returnValue(of(transactionCategoriesMockFunc()[0]));
    domainsTransactionCategoryGatewayMock.updateTransactionCategory.and.returnValue(of(transactionCategoriesMockFunc()[0]));

    domainsTransactionCategoryGatewayMock.isTransactionCategoryAlreadyUsed
      .and.returnValue(of(true));

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
      service.isTransactionCategoryAlreadyUsed(categoryObjectMock)
        .subscribe((response: boolean) => {
          expect(response).toBeTrue();
          done();
        });
    });
  });
});
