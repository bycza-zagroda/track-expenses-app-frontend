import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { LoadingSnackbarService } from 'src/app/common/loading-modal/loading-snackbar.service';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import {
  toCreateTransactionCategoryObjectsMockFunc,
  transactionCategoryObjectMockFunc,
  updatedTransactionCategoryObjectMockFunc,
} from 'src/app/domains/categories/domains.transaction-categories.mocks';
import { MaterialModule } from 'src/app/material.module';
import { PagesTransactionCategoriesService } from '../../pages-transaction-categories.service';
import { TransactionCategory } from '../../transaction-category.model';
import { PagesCategoriesEditorComponent } from './pages-categories-editor.component';
import { PagesCategoriesEditorService } from './pages-categories-editor.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('PagesCategoriesEditorService', () => {
  let service: PagesCategoriesEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagesCategoriesEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('PagesCategoriesEditorService', () => {
  let service: PagesCategoriesEditorService;
  let pagesTransactionCategoriesServiceMock: SpyObj<PagesTransactionCategoriesService>;
  let systemNotificationsServiceMock: SpyObj<SystemNotificationsService>;
  let matDialogMock: SpyObj<MatDialog>;
  let matDialogRef: SpyObj<MatDialogRef<PagesCategoriesEditorComponent>>;
  let loadingSnackbarServiceMock: SpyObj<LoadingSnackbarService>;

  beforeEach(() => {
    pagesTransactionCategoriesServiceMock = createSpyObj<PagesTransactionCategoriesService>
    (PagesTransactionCategoriesService.name, [
      'createTransactionCategory',
      'updateTransactionCategory',
    ]);

    pagesTransactionCategoriesServiceMock.createTransactionCategory
      .and.returnValue(of(toCreateTransactionCategoryObjectsMockFunc()));

    pagesTransactionCategoriesServiceMock.updateTransactionCategory
      .and.returnValue(of(updatedTransactionCategoryObjectMockFunc()));

    systemNotificationsServiceMock = createSpyObj<SystemNotificationsService>(SystemNotificationsService.name, [
      'showNotification',
    ]);

    matDialogRef = createSpyObj<MatDialogRef<PagesCategoriesEditorComponent>>(MatDialogRef.name, [ 'afterClosed' ]);
    matDialogMock = createSpyObj<MatDialog>(MatDialog.name, [ 'open' ]);
    matDialogMock.open.and.returnValue(matDialogRef);

    loadingSnackbarServiceMock = createSpyObj<LoadingSnackbarService>(LoadingSnackbarService.name, [
      'show',
      'hide',
    ]);

    TestBed.configureTestingModule({
      imports: [ MaterialModule, BrowserAnimationsModule, HttpClientTestingModule ],
      providers: [
        { provide: PagesTransactionCategoriesService, useValue: pagesTransactionCategoriesServiceMock },
        { provide: SystemNotificationsService, useValue: systemNotificationsServiceMock },
        { provide: MatDialog, useValue: matDialogMock },
        { provide: LoadingSnackbarService, useValue: loadingSnackbarServiceMock },
      ],
    });
    service = TestBed.inject(PagesCategoriesEditorService);
    TestBed.inject<HttpTestingController>(HttpTestingController);
  });

  describe('openEditor', () => {
    describe('updating category', () => {
      describe('success', () => {
        beforeEach(() => {
          matDialogRef.afterClosed.and.returnValue(of(updatedTransactionCategoryObjectMockFunc()));
        });

        it('updated category\'s name should invoke showNotification', (done) => {
          service.openEditor(transactionCategoryObjectMockFunc())
            .subscribe( () => {
              expect(systemNotificationsServiceMock.showNotification).toHaveBeenCalled();
              done();
            });
        });

        it('updated category\'s name should invoke loading show', (done) => {
          service.openEditor(transactionCategoryObjectMockFunc())
            .subscribe(() => {
              expect(loadingSnackbarServiceMock.show).toHaveBeenCalled();
              done();
            });
        });

        it('updated category\'s name should invoke hide', (done) => {
          service.openEditor(transactionCategoryObjectMockFunc())
            .subscribe();
          expect(loadingSnackbarServiceMock.hide).toHaveBeenCalled();
          done();
        });

        it('should return updated category', (done) => {
          service.openEditor(transactionCategoryObjectMockFunc())
            .subscribe( (data: TransactionCategory | null) => {
              expect(data!.name).toBe(updatedTransactionCategoryObjectMockFunc().name);
              done();
            });
        });
      });

      describe('canceled', () => {
        beforeEach(() => {
          matDialogRef.afterClosed.and.returnValue(of(null));
        });

        it('canceled updating category\'s name should not invoke showNotification', fakeAsync(() => {
          service.openEditor(transactionCategoryObjectMockFunc());
          flushMicrotasks();

          expect(systemNotificationsServiceMock.showNotification).not.toHaveBeenCalled();
        }));

        it('canceled updating category\'s name should NOT invoke show', fakeAsync(() => {
          service.openEditor(transactionCategoryObjectMockFunc());
          flushMicrotasks();
          expect(loadingSnackbarServiceMock.show).not.toHaveBeenCalled();
        }));

        it('canceled updating category\'s name should NOT invoke hide', fakeAsync(() => {
          service.openEditor(transactionCategoryObjectMockFunc());
          flushMicrotasks();
          expect(loadingSnackbarServiceMock.hide).not.toHaveBeenCalled();
        }));

        it('should return undefined', (done) => {
          service.openEditor(transactionCategoryObjectMockFunc())
            .subscribe( (data: TransactionCategory | null) => {
              expect(data).toBe(null);
              done();
            });
        });
      });
    });

    describe('creating category', () => {
      describe('success', () => {
        beforeEach(() => {
          matDialogRef.afterClosed.and.returnValue(of(toCreateTransactionCategoryObjectsMockFunc()));
        });

        it('created category\'s name should invoke showNotification', (done) => {
          service.openEditor(transactionCategoryObjectMockFunc())
            .subscribe( () => {
              expect(systemNotificationsServiceMock.showNotification).toHaveBeenCalled();
              done();
            });
        });

        it('created category\'s should invoke show', (done) => {
          service.openEditor(toCreateTransactionCategoryObjectsMockFunc())
            .subscribe(() => {
              expect(loadingSnackbarServiceMock.show).toHaveBeenCalled();
              done();
            });
        });

        it('created category\'s should invoke hide', (done) => {
          service.openEditor(toCreateTransactionCategoryObjectsMockFunc())
            .subscribe();
          expect(loadingSnackbarServiceMock.hide).toHaveBeenCalled();
          done();
        });

        it('should return created category', (done) => {
          service.openEditor(toCreateTransactionCategoryObjectsMockFunc())
            .subscribe( (data: TransactionCategory | null) => {
              expect(data).toBeInstanceOf(TransactionCategory);
              expect(data!.id).toBe(null);
              expect(data!.name).toBe(toCreateTransactionCategoryObjectsMockFunc().name);
              done();
            });
        });
      });

      describe('canceled', () => {
        beforeEach(() => {
          matDialogRef.afterClosed.and.returnValue(of(null));
        });

        it('canceled updating category\'s name should not invoke showNotification', fakeAsync(() => {
          service.openEditor(toCreateTransactionCategoryObjectsMockFunc());
          flushMicrotasks();

          expect(systemNotificationsServiceMock.showNotification).not.toHaveBeenCalled();
        }));

        it('canceled creating category\'s name should NOT invoke show', fakeAsync(() => {
          service.openEditor(toCreateTransactionCategoryObjectsMockFunc());
          flushMicrotasks();
          expect(loadingSnackbarServiceMock.show).not.toHaveBeenCalled();
        }));

        it('canceled creating category\'s name should NOT invoke hide', fakeAsync(() => {
          service.openEditor(toCreateTransactionCategoryObjectsMockFunc());
          flushMicrotasks();
          expect(loadingSnackbarServiceMock.hide).not.toHaveBeenCalled();
        }));

        it('should return null', (done) => {
          service.openEditor(toCreateTransactionCategoryObjectsMockFunc())
            .subscribe( (data: TransactionCategory | null) => {
              expect(data).toBe(null);
              done();
            });
        });
      });
    });
  });
});
