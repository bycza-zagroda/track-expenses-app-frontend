import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { TransactionAmountPipe } from 'src/app/common/utils/pipes/transaction-amount.pipe';
import { UPDATED_WALLET_INSTANCE_MOCK, WALLET_INSTANCE_MOCK, WALLET_TRANSACTIONS_OBJECTS_MOCK } from 'src/app/domains/wallets/domains.wallets.mocks';
import { MaterialModule } from 'src/app/material.module';
import { WalletsManagementItem } from '../management/pages-wallets-wallets-management-item.model';
import { PagesWalletsManagementEditorService } from '../management/wallet-editor/pages-wallets-management-editor.service';
import { PagesWalletDetailsComponent } from './pages-wallet-details.component';
import { PagesWalletDetailsService } from './pages-wallet-details.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('PagesWalletDetailsComponent', () => {
  let component: PagesWalletDetailsComponent;
  let fixture: ComponentFixture<PagesWalletDetailsComponent>;
  let activatedRouteMock: { data: Observable<{ wallet: WalletsManagementItem}> };
  let pagesWalletDetailsServiceMock: SpyObj<PagesWalletDetailsService>;
  let pagesWalletsManagementEditorServiceMock: SpyObj<PagesWalletsManagementEditorService>;
  let matEditorSubject: Subject<WalletsManagementItem | null>;

  beforeEach(async () => {
    activatedRouteMock = {
      data: of({ wallet: WALLET_INSTANCE_MOCK }),
    }

    matEditorSubject = new Subject<WalletsManagementItem | null>();

    pagesWalletDetailsServiceMock = createSpyObj<PagesWalletDetailsService>(PagesWalletDetailsService.name, ['getWalletTransactions']);
    pagesWalletDetailsServiceMock.getWalletTransactions.and.returnValue(of(WALLET_TRANSACTIONS_OBJECTS_MOCK(1)));

    pagesWalletsManagementEditorServiceMock = createSpyObj<PagesWalletsManagementEditorService>(PagesWalletsManagementEditorService.name, ['openWalletEditor']);
    pagesWalletsManagementEditorServiceMock.openWalletEditor.and.returnValue(matEditorSubject.asObservable());

    await TestBed.configureTestingModule({
      declarations: [
        PagesWalletDetailsComponent,
        TransactionAmountPipe,
      ],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: PagesWalletDetailsService, useValue: pagesWalletDetailsServiceMock },
        { provide: PagesWalletsManagementEditorService, useValue: pagesWalletsManagementEditorServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesWalletDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    describe('resolve my wallet and init wallet\'s transactions', () => {
      describe('success', () => {
        it('should resolve my wallet and init wallet\'s transactions', () => {

          expect(component.walletsManagementItem).toBe(WALLET_INSTANCE_MOCK);
          expect(component.walletsDetailsData.hasError).toBeFalse();
          expect(component.walletsDetailsData.data).toEqual(WALLET_TRANSACTIONS_OBJECTS_MOCK(1));
        });
      });
    });
  });

  describe('filter transactions by Expenses', () => {
    it('selected Expenses on select-box should filter 1 transaction', () => {
      const matSelect: HTMLDivElement = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement as HTMLDivElement;
      matSelect.click();
      fixture.detectChanges();

      const expensesOption: HTMLDivElement = fixture.debugElement.queryAll(By.css('.mat-option'))[1].nativeElement as HTMLDivElement;
      expensesOption.click();
      fixture.detectChanges();

      const transactions = component.displayedTransactions;

      expect(transactions.length).toBe(1);
    });
  });

  describe('filter transactions by Incomes', () => {
    it('selected Incomes on select-box should filter 2 transactions', () => {
      const matSelect: HTMLDivElement = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement as HTMLDivElement;
      matSelect.click();
      fixture.detectChanges();

      const incomesOption: HTMLElement = fixture.debugElement.queryAll(By.css('.mat-option'))[2].nativeElement as HTMLDivElement;
      incomesOption.click();
      fixture.detectChanges();

      const transactions = component.displayedTransactions;

      expect(transactions.length).toBe(2);
    });
  });

  describe('handleWalletEdit', () => {
    describe('success', () => {
      it('should update walletsManagementItem.name', fakeAsync(() => {
        component.handleWalletEdit();
        matEditorSubject.next(UPDATED_WALLET_INSTANCE_MOCK);
        flushMicrotasks();

        expect(component.walletsManagementItem?.name).toBe(UPDATED_WALLET_INSTANCE_MOCK.name);
      }));
    });

    describe('success', () => {
      it('should update walletsManagementItem.name', fakeAsync(() => {
        component.handleWalletEdit();
        matEditorSubject.next(null);
        flushMicrotasks();

        expect(component.walletsManagementItem?.name).toBe(WALLET_INSTANCE_MOCK.name);
      }));
    });
  });
});
