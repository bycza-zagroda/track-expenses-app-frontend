import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalletFormModalComponent } from './wallet-form-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('WalletFormModalComponent', () => {
  let component: WalletFormModalComponent;
  let fixture: ComponentFixture<WalletFormModalComponent>;
  let ERROR_MESSAGE_REQUIRED: string;
  let ERROR_MESSAGE_MAXLENGTH: string;

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
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Should display error message when invalid data is provided', () => {
    beforeEach(() => {
      ERROR_MESSAGE_REQUIRED = 'Name is required'
      ERROR_MESSAGE_MAXLENGTH = 'Name can\'t have more than 20 characters'
    })

    it('Empty name', () => {
      component.form.get('name')?.setValue('');
      component.form.get('name')?.markAsTouched();

      fixture.detectChanges();

      const errorMessageDiv = fixture.debugElement.query(By.css('.mat-error'));
      const errorMessageText: HTMLDivElement = errorMessageDiv.nativeElement;
      expect(errorMessageText.textContent!.trim()).toBe(ERROR_MESSAGE_REQUIRED);
    });

    it('Name with more than 20 characters', () => {
      component.form.get('name')?.setValue('Text have more than twenty characters for sure');
      component.form.get('name')?.markAsTouched();

      fixture.detectChanges();

      const errorMessageDiv = fixture.debugElement.query(By.css('.mat-error'));
      const errorMessageText: HTMLDivElement = errorMessageDiv.nativeElement;
      expect(errorMessageText.textContent!.trim()).toBe(ERROR_MESSAGE_MAXLENGTH);
    });
  })

});
