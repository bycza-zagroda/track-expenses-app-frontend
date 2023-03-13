import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCategoryDeletingModalComponent } from './transaction-category-deleting-modal.component';

describe('TransactionCategoryDeletingModalComponent', () => {
  let component: TransactionCategoryDeletingModalComponent;
  let fixture: ComponentFixture<TransactionCategoryDeletingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionCategoryDeletingModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionCategoryDeletingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
