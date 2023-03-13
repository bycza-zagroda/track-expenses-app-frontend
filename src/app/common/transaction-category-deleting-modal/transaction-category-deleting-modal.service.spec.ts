import { TestBed } from '@angular/core/testing';

import { TransactionCategoryDeletingModalService } from './transaction-category-deleting-modal.service';

describe('TransactionCategoryDeletingModalService', () => {
  let service: TransactionCategoryDeletingModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionCategoryDeletingModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
