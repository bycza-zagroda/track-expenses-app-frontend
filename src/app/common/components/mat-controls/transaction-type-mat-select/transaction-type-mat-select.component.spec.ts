import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';
import { TransactionTypeMatSelectComponent } from './transaction-type-mat-select.component';

describe('TransactionTypeMatSelectComponent', () => {
  let component: TransactionTypeMatSelectComponent;
  let fixture: ComponentFixture<TransactionTypeMatSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TransactionTypeMatSelectComponent,
      ],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionTypeMatSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('change Transaction Type', () => {
    beforeEach(() => {
      const matSelect: HTMLDivElement = fixture.debugElement.query(
        By.css('.mat-select-trigger'),
      ).nativeElement as HTMLDivElement;

      matSelect.click();
      fixture.detectChanges();

      const incomesOption: HTMLElement = fixture.debugElement.queryAll(
        By.css('.mat-option'),
      )[2].nativeElement as HTMLDivElement;

      incomesOption.click();
      fixture.detectChanges();
    });

    it('click on Incomes should set Incomes as select control', fakeAsync(() => {
      flushMicrotasks();

      const selectedValue: HTMLSpanElement = fixture.debugElement.query(
        By.css('.mat-select-min-line'),
      ).nativeElement as HTMLSpanElement;

      expect(selectedValue.textContent).toBe('Incomes');
    }));

    it('click on Incomes should run valueChanges on trnasactionTypeForm', fakeAsync(() => {
      flushMicrotasks();
      //help!
      expect(component.transactionsTypeForm.valueChanges.subscribe).toHaveBeenCalled();
    }));
  });
});
