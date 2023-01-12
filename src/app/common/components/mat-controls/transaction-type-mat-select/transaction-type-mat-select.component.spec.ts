import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTypeMatSelectComponent } from './transaction-type-mat-select.component';

describe('TransactionTypeMatSelectComponent', () => {
  let component: TransactionTypeMatSelectComponent;
  let fixture: ComponentFixture<TransactionTypeMatSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionTypeMatSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionTypeMatSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
