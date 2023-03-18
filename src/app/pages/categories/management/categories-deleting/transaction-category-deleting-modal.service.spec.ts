import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { TransactionCategoryDeletingModalService } from './transaction-category-deleting-modal.service';

describe('TransactionCategoryDeletingModalService', () => {
  let service: TransactionCategoryDeletingModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialog, useValue: {} },
      ],
    });
    service = TestBed.inject(TransactionCategoryDeletingModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
