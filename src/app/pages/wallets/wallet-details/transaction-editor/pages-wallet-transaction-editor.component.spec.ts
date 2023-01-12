import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesWalletTransactionEditorComponent } from './pages-wallet-transaction-editor.component';

describe('TransactionEditorComponent', () => {
  let component: PagesWalletTransactionEditorComponent;
  let fixture: ComponentFixture<PagesWalletTransactionEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesWalletTransactionEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesWalletTransactionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
