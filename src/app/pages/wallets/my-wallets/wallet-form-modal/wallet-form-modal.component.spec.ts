import { ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed } from '@angular/core/testing';

import { WalletFormModalComponent } from './wallet-form-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

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

    it('Empty name', () => {
      component.form.get('name')?.setValue('');

      fixture.detectChanges();

      const errorMessageDiv = fixture.debugElement.query(By.css('.mat-error')); // null :(
      expect(errorMessageDiv.nativeElement.textContent).toBe('Name is required');
    });

    it('Name with more than 20 characters', () => {

      component.form.setValue({
        name: "asdasdsadasdasdasdasdasdasdasdsad",
      })
      //flushMicrotasks(); // fakeAsync tez nei dziala :(
      fixture.detectChanges();

      const errorMessageDiv = fixture.debugElement.query(By.css('.mat-error')); // null :(

      expect(errorMessageDiv.nativeElement.textContent).toBe('Name is required');
    });
  })







});
