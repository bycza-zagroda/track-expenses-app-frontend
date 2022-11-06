import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateOrUpdateWalletComponent } from './dialog-create-or-update-wallet.component';

describe('DialogCreateOrUpdateWalletComponent', () => {
  let component: DialogCreateOrUpdateWalletComponent;
  let fixture: ComponentFixture<DialogCreateOrUpdateWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateOrUpdateWalletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateOrUpdateWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
