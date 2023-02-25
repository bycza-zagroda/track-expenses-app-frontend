import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
//import { API_TRANSACTIONS_URL } from '../transactions/domains.transactions.constants';
import { DomainsTransactionCategoriesGateway } from './domains.transaction-categories.gateway';
//import { transactionCategoriesMock } from './domains.transaction-categories.mocks';
//import { ITransactionCategoryApiResponse } from './domains.transaction-categories.types';

describe('DomainsTransactionCategoriesGatewayService', () => {
  let service: DomainsTransactionCategoriesGateway;
  let httpTestingController: HttpTestingController;
  //let categoriesRespMock: ITransactionCategoryApiResponse[];
  //let apiUrl: string;

  beforeEach(async () => {
    //apiUrl = API_TRANSACTIONS_URL;
    //categoriesRespMock = transactionCategoriesMock;

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

  // describe('getTransactionCategories', () => {
  //   it('should call Api and return transaction\'s categories', () => {
  //     service.getTransactionCategories().subscribe((val: ITransactionCategoryApiResponse[]) => {
  //       expect(val.length).toBe(categoriesRespMock.length);
  //     });

  //     const req = httpTestingController.expectOne(apiUrl);
  //     expect(req.request.method).toEqual('GET');
  //     req.flush(categoriesRespMock);
  //   });
  // });
});
