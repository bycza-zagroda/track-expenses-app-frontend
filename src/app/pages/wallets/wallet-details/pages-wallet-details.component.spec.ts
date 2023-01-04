import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { TransactionAmountPipe } from 'src/app/common/utils/pipes/transaction-amount.pipe';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { WALLET_INSTANCE_MOCK, WALLET_RESP_MOCK, WALLET_TRANSACTIONS_OBJECTS_MOCK } from 'src/app/domains/wallets/domains.wallets.mocks';
import { MaterialModule } from 'src/app/material.module';
import { PagesWalletsManagementService } from '../management/pages-wallets-management.service';
import { WalletsManagementItem } from '../management/pages-wallets-wallets-management-item.model';
import { PagesWalletsManagementEditorComponent } from '../management/wallet-editor/pages-wallets-management-editor.component';
import { PagesWalletDetailsComponent } from './pages-wallet-details.component';
import { PagesWalletDetailsService } from './pages-wallet-details.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

fdescribe('PagesWalletDetailsComponent', () => {
  let component: PagesWalletDetailsComponent;
  let fixture: ComponentFixture<PagesWalletDetailsComponent>;
  let activatedRouteMock: { data: Observable<{ wallet: WalletsManagementItem}> };
  let pagesWalletDetailsServiceMock: SpyObj<PagesWalletDetailsService>;
  let pagesWalletsManagementServiceMock: SpyObj<PagesWalletsManagementService>;
  let systemNotificationsServiceMock: SpyObj<SystemNotificationsService>;
  let walletSubject: Subject<WalletsManagementItem>;
  let matDialogMock: SpyObj<MatDialog>;
  let matDialogRef: SpyObj<MatDialogRef<PagesWalletsManagementEditorComponent>>;


  beforeEach(async () => {
    activatedRouteMock = {
      data: of({ wallet: WALLET_INSTANCE_MOCK })
    }

    walletSubject = new Subject<WalletsManagementItem>();
    pagesWalletDetailsServiceMock = createSpyObj<PagesWalletDetailsService>(PagesWalletDetailsService.name, ['getWalletTransactions']);
    pagesWalletsManagementServiceMock = createSpyObj<PagesWalletsManagementService>(PagesWalletsManagementService.name, ['updateWallet']);
    systemNotificationsServiceMock = createSpyObj<SystemNotificationsService>(SystemNotificationsService.name, ['showNotification']);

    matDialogMock = createSpyObj<MatDialog>(MatDialog.name, ['open']);
    pagesWalletDetailsServiceMock.getWalletTransactions.and.returnValue(of(WALLET_TRANSACTIONS_OBJECTS_MOCK(1)));

    pagesWalletsManagementServiceMock.updateWallet.and.returnValue(walletSubject.asObservable());

    matDialogRef = createSpyObj<MatDialogRef<PagesWalletsManagementEditorComponent>>(MatDialogRef.name, ['afterClosed']);
    matDialogMock = createSpyObj<MatDialog>(MatDialog.name, ['open']);
    matDialogMock.open.and.returnValue(matDialogRef);


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
        { provide: PagesWalletsManagementService, useValue: pagesWalletsManagementServiceMock },
        { provide: SystemNotificationsService, useValue: systemNotificationsServiceMock },
        { provide: MatDialog, useValue: matDialogMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ]
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
      const matSelect = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
      matSelect.click();
      fixture.detectChanges();

      const expensesOption = fixture.debugElement.queryAll(By.css('.mat-option'))[1].nativeElement;
      expensesOption.click();
      fixture.detectChanges();

      const transactions = component.displayedTransactions;

      expect(transactions.length).toBe(1);
    });
  });

  describe('filter transactions by Incomes', () => {
    it('selected Incomes on select-box should filter 2 transactions', () => {
      const matSelect = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
      matSelect.click();
      fixture.detectChanges();

      const incomesOption = fixture.debugElement.queryAll(By.css('.mat-option'))[2].nativeElement;
      incomesOption.click();
      fixture.detectChanges();

      const transactions = component.displayedTransactions;

      expect(transactions.length).toBe(2);
    });
  });

  describe('handleWalletEdit', () => {
    beforeEach(() => {
      matDialogRef.afterClosed.and.returnValue(of({ name: 'some wallet name' }));
    });

    it('should call pagesWalletsManagementService.updateWallet method with wallet with updated name', fakeAsync(() => {
      component.handleWalletEdit();
      flushMicrotasks();
      expect(pagesWalletsManagementServiceMock.updateWallet).toHaveBeenCalledWith(
        WalletsManagementItem.create({
          id: component.walletsManagementItem!.id!,
          creationDate: component.walletsManagementItem!.createdAt.toString(),
          name: 'some wallet name',
        }
      ));
    }));

    it('should call pagesWalletsManagementService.updateWallet method with wallet with updated name and then display updated name', fakeAsync(() => {
      component.handleWalletEdit();
      flushMicrotasks();
      walletSubject.next(new WalletsManagementItem(WALLET_RESP_MOCK));
      flushMicrotasks();
      fixture.detectChanges();
      expect(component.walletsManagementItem!.name).toBe('some wallet name');
    }));
  });
});
