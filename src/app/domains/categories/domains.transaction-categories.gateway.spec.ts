import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DomainsTransactionCategoriesGateway } from './domains.transaction-categories.gateway';
import { transactionCategoriesMockFunc } from './domains.transaction-categories.mocks';
import { ITransactionCategoryApiResponse } from './domains.transaction-categories.types';

describe('DomainsTransactionCategoriesGatewayService', () => {
  let service: DomainsTransactionCategoriesGateway;
  let httpTestingController: HttpTestingController;
  //let categoriesRespMock: ITransactionCategoryApiResponse[];

  beforeEach(async () => {
    //categoriesRespMock = transactionCategoriesMockFunc();

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        DomainsTransactionCategoriesGateway,
      ],
    }).compileComponents();

    httpTestingController = TestBed.inject<HttpTestingController>(HttpTestingController);
    service = TestBed.inject(DomainsTransactionCategoriesGateway);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('getTransactionCategories', () => {
    // it('should call Api and return transaction categories', () => {
    //   service.getTransactionCategories().subscribe((val: ITransactionCategoryApiResponse[]) => {
    //     expect(val.length).toBe(categoriesRespMock.length);
    //   });

    //   const req = httpTestingController.expectOne(API_TRANSACTION_CATEGORIES_URL);
    //   expect(req.request.method).toEqual('GET');
    //   req.flush(categoriesRespMock);
    // });

    it('should call Api and return transaction categories', (done) => {
      service.getTransactionCategories().subscribe((val: ITransactionCategoryApiResponse[]) => {
        expect(val).toEqual(transactionCategoriesMockFunc());
        done();
      });
    });
  });
});
