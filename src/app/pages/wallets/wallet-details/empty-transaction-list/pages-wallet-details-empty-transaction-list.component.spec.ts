import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesWalletDetailsEmptyTransactionListComponent } from './pages-wallet-details-empty-transaction-list.component';

describe('PagesWalletDetailsEmptyTransactionListComponent', () => {
  let component: PagesWalletDetailsEmptyTransactionListComponent;
  let fixture: ComponentFixture<PagesWalletDetailsEmptyTransactionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesWalletDetailsEmptyTransactionListComponent ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PagesWalletDetailsEmptyTransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
