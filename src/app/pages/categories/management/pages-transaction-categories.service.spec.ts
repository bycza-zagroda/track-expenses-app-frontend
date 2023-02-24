import { TestBed } from '@angular/core/testing';

import { PagesTransactionCategoriesService } from './pages-transaction-categories.service';

describe('PagesTransactionCategoriesService', () => {
  let service: PagesTransactionCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagesTransactionCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
