import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesWalletsManagementEditorComponent } from './pages-wallets-management-editor.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('PagesWalletsManagementEditorComponent', () => {
  let component: PagesWalletsManagementEditorComponent;
  let fixture: ComponentFixture<PagesWalletsManagementEditorComponent>;
  let ERROR_MESSAGE_REQUIRED: string;
  let ERROR_MESSAGE_MAXLENGTH: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesWalletsManagementEditorComponent ],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: null },
        { provide: MAT_DIALOG_DATA, useValue: undefined },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagesWalletsManagementEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form validation', () => {
    beforeEach(() => {
      ERROR_MESSAGE_REQUIRED = 'Name is required';
      ERROR_MESSAGE_MAXLENGTH = 'Name can\'t have more than 20 characters';
    });

    it('should show validation error if name input is empty', () => {
      component.form.get('name')?.setValue('');
      component.form.get('name')?.markAsTouched();

      fixture.detectChanges();

      const errorMessageDiv = fixture.debugElement.query(By.css('.mat-error'));
      const errorMessageText: HTMLDivElement = errorMessageDiv.nativeElement as HTMLDivElement;

      expect(errorMessageText.textContent!.trim()).toBe(ERROR_MESSAGE_REQUIRED);
    });

    it('should show validation error if name input has more than 20 characters', () => {
      component.form.get('name')?.setValue('Text have more than twenty characters for sure');
      component.form.get('name')?.markAsTouched();

      fixture.detectChanges();

      const errorMessageDiv = fixture.debugElement.query(By.css('.mat-error'));
      const errorMessageText: HTMLDivElement = errorMessageDiv.nativeElement as HTMLDivElement;

      expect(errorMessageText.textContent!.trim()).toBe(ERROR_MESSAGE_MAXLENGTH);
    });
  });
});
