import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletFormModalComponent } from './wallet-form-modal.component';

describe('DialogCreateOrUpdateWalletComponent', () => {
  let component: WalletFormModalComponent;
  let fixture: ComponentFixture<WalletFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletFormModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
