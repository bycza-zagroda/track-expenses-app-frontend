import { ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { TransactionAmountPipe } from 'src/app/common/utils/pipes/transaction-amount.pipe';
import {
  UPDATED_WALLET_INSTANCE_MOCK,
  WALLET_INSTANCE_MOCK,
} from 'src/app/domains/wallets/domains.wallets.mocks';
import { MaterialModule } from 'src/app/material.module';
import { WalletsManagementItem } from '../management/pages-wallets-wallets-management-item.model';
import { PagesWalletsManagementEditorService } from '../management/wallet-editor/pages-wallets-management-editor.service';
import { PagesWalletDetailsComponent } from './pages-wallet-details.component';
import { PagesWalletDetailsService } from './pages-wallet-details.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { WalletTransaction } from './pages-wallet-details-item.model';
import { PagesWalletTransactionEditorService } from './transaction-editor/pages-wallet-transaction-editor.service';
import {
  UPDATED_WALLET_TRANSACTIONS_OBJECT_MOCK,
  WALLET_TRANSACTIONS_EXPENSE_MOCK,
  WALLET_TRANSACTIONS_INCOME_MOCK,
  WALLET_TRANSACTIONS_OBJECTS_MOCK,
} from 'src/app/domains/transactions/domains.transactions.mocks';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.constants';
import { ConfirmDialogService } from 'src/app/common/confirmation-modal/confirm-dialog.service';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { LoadingModalComponent } from 'src/app/common/loading-modal/loading-modal.component';

describe('PagesWalletDetailsComponent', () => {
  let component: PagesWalletDetailsComponent;
  let fixture: ComponentFixture<PagesWalletDetailsComponent>;
  let activatedRouteMock: { data: Observable<{ wallet: WalletsManagementItem}> };
  let pagesWalletDetailsServiceMock: SpyObj<PagesWalletDetailsService>;
  let pagesWalletsManagementEditorServiceMock: SpyObj<PagesWalletsManagementEditorService>;
  let pagesWalletTransactionEditorServiceMock: SpyObj<PagesWalletTransactionEditorService>;
  let systemNotificationsServiceMock: SpyObj<SystemNotificationsService>;
  let confirmDialogServiceMock: SpyObj<ConfirmDialogService>;
  let matEditorWalletSubject: Subject<WalletsManagementItem | null>;
  let matEditorTransactionSubject: Subject<WalletTransaction | null>;
  let removeTransactionResponseSubject: Subject<number>;

  beforeEach(async () => {
    activatedRouteMock = {
      data: of({ wallet: WALLET_INSTANCE_MOCK }),
    };

    matEditorWalletSubject = new Subject<WalletsManagementItem | null>();
    matEditorTransactionSubject = new Subject<WalletTransaction | null>();
    removeTransactionResponseSubject = new Subject<number>();

    pagesWalletDetailsServiceMock = createSpyObj<PagesWalletDetailsService>(PagesWalletDetailsService.name, [
      'getWalletTransactions',
      'removeWalletTransaction',
    ]);

    pagesWalletDetailsServiceMock.getWalletTransactions.and.returnValue(of(WALLET_TRANSACTIONS_OBJECTS_MOCK(1)));
    pagesWalletDetailsServiceMock.removeWalletTransaction.and.returnValue(removeTransactionResponseSubject.asObservable());

    pagesWalletsManagementEditorServiceMock = createSpyObj<PagesWalletsManagementEditorService>
    (PagesWalletsManagementEditorService.name, [ 'openEditor' ]);
    pagesWalletsManagementEditorServiceMock.openEditor.and.returnValue(matEditorWalletSubject.asObservable());

    pagesWalletTransactionEditorServiceMock = createSpyObj<PagesWalletTransactionEditorService>
    (PagesWalletTransactionEditorService.name, [ 'openEditor' ]);
    pagesWalletTransactionEditorServiceMock.openEditor.and.returnValue(matEditorTransactionSubject.asObservable());

    confirmDialogServiceMock = createSpyObj<ConfirmDialogService>(ConfirmDialogService.name, [ 'openConfirmModal' ]);

    systemNotificationsServiceMock = createSpyObj<SystemNotificationsService>
    (SystemNotificationsService.name, [ 'showNotification' ]);

    await TestBed.configureTestingModule({
      declarations: [
        PagesWalletDetailsComponent,
        TransactionAmountPipe,
        LoadingModalComponent,
      ],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: PagesWalletDetailsService, useValue: pagesWalletDetailsServiceMock },
        { provide: PagesWalletsManagementEditorService, useValue: pagesWalletsManagementEditorServiceMock },
        { provide: PagesWalletTransactionEditorService, useValue: pagesWalletTransactionEditorServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: ConfirmDialogService, useValue: confirmDialogServiceMock },
        { provide: SystemNotificationsService, useValue: systemNotificationsServiceMock },
      ],
    }).compileComponents();

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

  describe('handleCreateTransaction', () => {
    describe('success', () => {
      it('should create new WalletTransaction object', fakeAsync(() => {
        component.handleCreateTransaction(WalletTransactionType.Incomes);
        matEditorTransactionSubject.next(WALLET_TRANSACTIONS_INCOME_MOCK);
        flushMicrotasks();

        expect(component.walletsDetailsData.data!.length).toBe(4);
      }));
    });

    describe('cancel', () => {
      it('should not create new WalletTransaction object', fakeAsync(() => {
        component.handleCreateTransaction(WalletTransactionType.Incomes);
        matEditorTransactionSubject.next(null);
        flushMicrotasks();

        expect(component.walletsDetailsData.data!.length).toBe(3);
      }));
    });
  });

  describe('handleEditTransaction', () => {
    const transaction = WALLET_TRANSACTIONS_OBJECTS_MOCK(1)[0];
    const updatedTransaction = UPDATED_WALLET_TRANSACTIONS_OBJECT_MOCK(1);

    describe('success', () => {
      it('should update WalletTransaction object', fakeAsync(() => {
        component.handleEditTransaction(transaction);
        matEditorTransactionSubject.next(updatedTransaction);

        const foundTransaction = component.walletsDetailsData.data!.find(t => t.id === transaction.id)!;
        flushMicrotasks();

        expect(foundTransaction.description).toBe(updatedTransaction.description);
        expect(foundTransaction.amount).toBe(updatedTransaction.amount);
      }));
    });

    describe('cancel', () => {
      it('should not update WalletTransaction object', fakeAsync(() => {
        component.handleEditTransaction(transaction);
        matEditorTransactionSubject.next(null);
        flushMicrotasks();

        const foundTransaction = component.walletsDetailsData.data!.find(t => t.id === transaction.id)!;

        expect(foundTransaction.description).toBe(transaction.description);
        expect(foundTransaction.amount).toBe(transaction.amount);
      }));
    });
  });

  describe('filter transactions', () => {
    let matSelect: HTMLDivElement;

    beforeEach(() => {
      matSelect = fixture.debugElement.query(
        By.css('.mat-select-trigger'),
      ).nativeElement as HTMLDivElement;

      matSelect.click();
      fixture.detectChanges();
    });

    describe('filter transactions by Expenses', () => {
      it('selected Expenses on select-box should filter 1 transaction', () => {
        const expensesOption: HTMLDivElement = fixture.debugElement.queryAll(
          By.css('.mat-option'),
        )[1].nativeElement as HTMLDivElement;
        expensesOption.click();
        fixture.detectChanges();

        const transactions = component.displayedTransactions;

        expect(transactions.length).toBe(1);
      });
    });

    describe('filter transactions by Incomes', () => {
      it('selected Incomes on select-box should filter 2 transactions', () => {
        const incomesOption: HTMLElement = fixture.debugElement.queryAll(
          By.css('.mat-option'),
        )[2].nativeElement as HTMLDivElement;

        incomesOption.click();
        fixture.detectChanges();

        const transactions = component.displayedTransactions;

        expect(transactions.length).toBe(2);
      });
    });

    describe('filter transactions by Incomes and add new transaction with Incomes type', () => {
      it('should filter and display 3 transactions', fakeAsync(() => {
        const incomesOption: HTMLElement = fixture.debugElement.queryAll(
          By.css('.mat-option'),
        )[2].nativeElement as HTMLDivElement;

        incomesOption.click();
        fixture.detectChanges();

        component.handleCreateTransaction(WalletTransactionType.Incomes);
        matEditorTransactionSubject.next(WALLET_TRANSACTIONS_INCOME_MOCK);
        flushMicrotasks();

        fixture.detectChanges();
        const transactions = component.displayedTransactions;
        flush();
        expect(transactions.length).toBe(3);
      }));
    });

    describe('filter transactions by Incomes and add new transaction with Expenses type', () => {
      it('should filter and display 2 transactions', fakeAsync(() => {
        const incomesOption: HTMLElement = fixture.debugElement.queryAll(
          By.css('.mat-option'),
        )[2].nativeElement as HTMLDivElement;

        incomesOption.click();
        fixture.detectChanges();

        component.handleCreateTransaction(WalletTransactionType.Expenses);
        matEditorTransactionSubject.next(WALLET_TRANSACTIONS_EXPENSE_MOCK);
        flushMicrotasks();

        fixture.detectChanges();
        const transactions = component.displayedTransactions;
        flush();

        expect(transactions.length).toBe(2);
      }));
    });
  });

  describe('handleWalletEdit', () => {
    describe('success', () => {
      it('should update walletsManagementItem.name', fakeAsync(() => {
        component.handleWalletEdit();
        matEditorWalletSubject.next(UPDATED_WALLET_INSTANCE_MOCK);
        flushMicrotasks();

        expect(component.walletsManagementItem?.name).toBe(UPDATED_WALLET_INSTANCE_MOCK.name);
      }));
    });

    describe('cancel', () => {
      it('should not update walletsManagementItem.name', fakeAsync(() => {
        component.handleWalletEdit();
        matEditorWalletSubject.next(null);
        flushMicrotasks();

        expect(component.walletsManagementItem?.name).toBe(WALLET_INSTANCE_MOCK.name);
      }));
    });
  });

  describe('handleRemoveTransaction', () => {
    describe('success', () => {
      it('should remove 1 transaction', fakeAsync(() => {
        confirmDialogServiceMock.openConfirmModal.and.returnValue(of(true));
        component.handleRemoveTransaction(WALLET_TRANSACTIONS_OBJECTS_MOCK(1)[0]);
        removeTransactionResponseSubject.next(1);

        flushMicrotasks();

        expect(component.walletsDetailsData.data!.length).toBe(2);
      }));
    });

    describe('cancel', () => {
      it('should not change transactions', fakeAsync(() => {
        confirmDialogServiceMock.openConfirmModal.and.returnValue(of(false));
        pagesWalletDetailsServiceMock.removeWalletTransaction.and.returnValue(of(1));
        component.handleRemoveTransaction(WALLET_TRANSACTIONS_OBJECTS_MOCK(1)[0]);

        flushMicrotasks();

        expect(component.walletsDetailsData.data!.length).toBe(3);
      }));
    });

    describe('error', () => {
      beforeEach(() => {
        confirmDialogServiceMock.openConfirmModal.and.returnValue(of(true));
        component.handleRemoveTransaction(WALLET_TRANSACTIONS_OBJECTS_MOCK(1)[0]);
        removeTransactionResponseSubject.error('error');
      });

      it('should not change transactions list', fakeAsync(() => {
        flushMicrotasks();

        expect(component.walletsDetailsData.data!.length).toBe(3);
      }));

      it('should invoke error notification', fakeAsync(() => {
        flushMicrotasks();

        expect(systemNotificationsServiceMock.showNotification).toHaveBeenCalled();
      }));
    });
  });
});
