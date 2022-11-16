import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletFormModalComponent } from './wallet-form-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('WalletFormModalComponent', () => {
  let component: WalletFormModalComponent;
  let fixture: ComponentFixture<WalletFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletFormModalComponent ],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: null },
        { provide: MAT_DIALOG_DATA, useValue: undefined },
      ]
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
