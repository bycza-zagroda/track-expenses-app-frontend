import { TestBed } from '@angular/core/testing';

import { DomainsTransactionCategoriesGateway } from './domains-transaction-categories-gateway';

describe('DomainsTransactionCategoriesGatewayService', () => {
  let service: DomainsTransactionCategoriesGateway;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomainsTransactionCategoriesGateway);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
