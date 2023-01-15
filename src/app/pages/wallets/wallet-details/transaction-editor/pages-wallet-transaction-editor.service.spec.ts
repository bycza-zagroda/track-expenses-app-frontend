import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PagesWalletTransactionEditorService } from './pages-wallet-transaction-editor.service';
import { PagesWalletDetailsService } from '../pages-wallet-details.service';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { PagesWalletTransactionEditorComponent } from './pages-wallet-transaction-editor.component';
import { MaterialModule } from 'src/app/material.module';
import {
  UPDATED_WALLET_TRANSACTIONS_INCOME_MOCK,
  WALLET_TRANSACTIONS_INCOME_MOCK,
} from 'src/app/domains/wallets/domains.wallets.mocks';
import { WalletsDetailsTransaction } from '../pages-wallet-details-item.model';
import { WalletTransactionType } from 'src/app/domains/wallets/domains.wallets.types';

describe('PagesWalletTransactionEditorService', () => {
  let service: PagesWalletTransactionEditorService;
  let pagesWalletTransactionsServiceMock: SpyObj<PagesWalletDetailsService>;
  let systemNotificationsServiceMock: SpyObj<SystemNotificationsService>;
  let matDialogMock: SpyObj<MatDialog>;
  let matDialogRef: SpyObj<MatDialogRef<PagesWalletTransactionEditorComponent>>;

  beforeEach(() => {
    pagesWalletTransactionsServiceMock = createSpyObj<PagesWalletDetailsService>(PagesWalletDetailsService.name, [
      'editWalletTransaction',
      'createWalletTransaction',
    ]);

    pagesWalletTransactionsServiceMock.editWalletTransaction.and.returnValue(of(UPDATED_WALLET_TRANSACTIONS_INCOME_MOCK));
    pagesWalletTransactionsServiceMock.createWalletTransaction.and.returnValue(of(WALLET_TRANSACTIONS_INCOME_MOCK));

    systemNotificationsServiceMock = createSpyObj<SystemNotificationsService>(SystemNotificationsService.name, [
      'showNotification',
    ]);

    matDialogRef = createSpyObj<MatDialogRef<PagesWalletTransactionEditorComponent>>(MatDialogRef.name, [ 'afterClosed' ]);
    matDialogMock = createSpyObj<MatDialog>(MatDialog.name, [ 'open' ]);
    matDialogMock.open.and.returnValue(matDialogRef);

    TestBed.configureTestingModule({
      imports: [ MaterialModule, BrowserAnimationsModule, HttpClientTestingModule ],
      providers: [
        { provide: PagesWalletDetailsService, useValue: pagesWalletTransactionsServiceMock },
        { provide: SystemNotificationsService, useValue: systemNotificationsServiceMock },
        { provide: MatDialog, useValue: matDialogMock },
      ],
    });
    service = TestBed.inject(PagesWalletTransactionEditorService);
    TestBed.inject<HttpTestingController>(HttpTestingController);
  });

  describe('openTransactionEditor', () => {
    describe('updating transaction', () => {
      describe('success', () => {
        beforeEach(() => {
          matDialogRef.afterClosed.and.returnValue(of(UPDATED_WALLET_TRANSACTIONS_INCOME_MOCK));
        });

        it('updated wallet\'s name should invoke showNotification', (done) => {
          service.openEditor(WALLET_TRANSACTIONS_INCOME_MOCK)
            .subscribe( () => {
              expect(systemNotificationsServiceMock.showNotification).toHaveBeenCalled();
              done();
            });
        });

        it('should return updated wallet', (done) => {
          service.openEditor(WALLET_TRANSACTIONS_INCOME_MOCK)
            .subscribe( (data: WalletsDetailsTransaction | null) => {
              expect(data).toEqual(UPDATED_WALLET_TRANSACTIONS_INCOME_MOCK);
              done();
            });
        });
      });

      describe('canceled', () => {
        beforeEach(() => {
          matDialogRef.afterClosed.and.returnValue(of(undefined));
        });

        it('canceled updating transaction\'s name should not invoke showNotification', fakeAsync(() => {
          service.openEditor(WALLET_TRANSACTIONS_INCOME_MOCK);
          flushMicrotasks();

          expect(systemNotificationsServiceMock.showNotification).not.toHaveBeenCalled();
        }));

        it('should return undefined', (done) => {
          service.openEditor(WALLET_TRANSACTIONS_INCOME_MOCK)
            .subscribe( (data: WalletsDetailsTransaction | null) => {
              expect(data).toBe(null);
              done();
            });
        });
      });
    });

    describe('creating transaction', () => {
      describe('success', () => {
        beforeEach(() => {
          matDialogRef.afterClosed.and.returnValue(of(WALLET_TRANSACTIONS_INCOME_MOCK));
        });

        it('created transaction\'s name should invoke showNotification', (done) => {
          service.openEditor(WalletTransactionType.Incomes)
            .subscribe( () => {
              expect(systemNotificationsServiceMock.showNotification).toHaveBeenCalled();
              done();
            });
        });

        it('should return created transaction', (done) => {
          service.openEditor(WalletTransactionType.Incomes)
            .subscribe( (data: WalletsDetailsTransaction | null) => {
              expect(data).toBeInstanceOf(WalletsDetailsTransaction);
              expect(data).toEqual(WALLET_TRANSACTIONS_INCOME_MOCK);
              done();
            });
        });
      });

      describe('canceled', () => {
        beforeEach(() => {
          matDialogRef.afterClosed.and.returnValue(of(undefined));
        });

        it('canceled updating transaction\'s name should not invoke showNotification', fakeAsync(() => {
          service.openEditor(WalletTransactionType.Incomes);
          flushMicrotasks();

          expect(systemNotificationsServiceMock.showNotification).not.toHaveBeenCalled();
        }));

        it('should return undefined', (done) => {
          service.openEditor(WalletTransactionType.Incomes)
            .subscribe( (data: WalletsDetailsTransaction | null) => {
              expect(data).toBe(null);
              done();
            });
        });
      });
    });
  });
});
