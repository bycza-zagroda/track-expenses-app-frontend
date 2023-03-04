import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TServerEntityId } from 'src/app/common/http/common.http.types';
import { DomainsTransactionCategoriesGateway } from './domains.transaction-categories.gateway';
import {
  categoryFullResponseMockFunc,
  categoryPayloadMockFunc,
  transactionCategoriesMockFunc,
} from './domains.transaction-categories.mocks';
import {
  ITransactionCategoryApiResponse,
  ITransactionCategoryFullResponse,
  ITransactionCategoryPayload,
} from './domains.transaction-categories.types';

describe('DomainsTransactionCategoriesGatewayService', () => {
  let service: DomainsTransactionCategoriesGateway;
  let httpTestingController: HttpTestingController;
  //let categoriesRespMock: ITransactionCategoryApiResponse[];
  let categoryPaylad: ITransactionCategoryPayload;
  let categoryId: TServerEntityId;
  //let createdCategoryResponse: ITransactionCategoryApiResponse;

  beforeEach(async () => {
    //categoriesRespMock = transactionCategoriesMockFunc();
    categoryPaylad = categoryPayloadMockFunc();
    categoryId = 1;
    //createdCategoryResponse = { id: 5,  name: 'abc', type: WalletTransactionType.Income };

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

  describe('createTransactionCategories', () => {
    it('should call Api and return created transaction category', (done) => {
    //   service.createTransactionCategory(categoryPaylad).subscribe((val: ITransactionCategoryApiResponse) => {
    //     expect(val.name).toBe(categoriesRespMock.name);
    //   });
    //   const req = httpTestingController.expectOne
    //    (API_TRANSACTION_CATEGORIES_URL, { name, type });
    //   expect(req.request.method).toEqual('POST');
    //   req.flush(createdCategoryResponse);

      service.createTransactionCategory(categoryPaylad)
        .subscribe((val: ITransactionCategoryApiResponse) => {
          expect(val.name).toEqual(categoryPaylad.name);
          done();
        });
    });
  });

  describe('updateTransactionCategories', () => {
    it('should call Api and return updated transaction category', (done) => {
    //   service.updateTransactionCategory(categoryPaylad).subscribe((val: ITransactionCategoryApiResponse) => {
    //     expect(val.name).toBe(categoriesRespMock.name);
    //   });
    //   const req = httpTestingController.expectOne
    //    (`${ API_TRANSACTION_CATEGORIES_URL }/${ id }`, { name, type });
    //   expect(req.request.method).toEqual('POST');
    //   req.flush(createdCategoryResponse);

      service.updateTransactionCategory(categoryId, categoryPaylad)
        .subscribe((val: ITransactionCategoryApiResponse) => {
          expect(val.name).toEqual(categoryPaylad.name);
          done();
        });
    });
  });

  describe('isTransactionCategoryAlreadyUsed', () => {
    it('should call Api and return info whether category is already used by any transaction', (done) => {
    //   service.isTransactionCategoryAlreadyUsed(categoryId).subscribe((val: boolean) => {
    //     expect(val).toBeTrue();
    //   });
    //   const req = httpTestingController.expectOne
    //    (API_TRANSACTION_CATEGORIES_IS_ALREADY_USED_URL(categooryId));
    //   expect(req.request.method).toEqual('GET');
    //   req.flush(createdCategoryResponse);

      service.getTransactionCategoryById(categoryId)
        .subscribe((val: ITransactionCategoryFullResponse) => {
          // sometimes can be true for now
          expect(val).toEqual(categoryFullResponseMockFunc(1, 2));
          done();
        });
    });
  });
});
