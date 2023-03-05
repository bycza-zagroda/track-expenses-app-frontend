import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, finalize, Observable, of, switchMap, tap } from 'rxjs';
import { TServerEntityId } from 'src/app/common/http/common.http.types';
import { LoadingSnackbarService } from 'src/app/common/loading-modal/loading-snackbar.service';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { NotificationType } from 'src/app/common/utils/system-notifications/system.notifications.constants';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.constants';
import { PagesTransactionCategoriesService } from '../../pages-transaction-categories.service';
import { TransactionCategory } from '../../transaction-category.model';
import { PagesCategoriesEditorComponent } from './pages-categories-editor.component';
import { ITransactionCategoryEditorPayload } from './pages-categories-editor.types';

@Injectable({
  providedIn: 'root',
})
export class PagesCategoriesEditorService {
  public constructor(
    private readonly dialog: MatDialog,
    private readonly systemNotificationsService: SystemNotificationsService,
    private readonly pagesTransactionCategoriesService: PagesTransactionCategoriesService,
    private readonly loadingService: LoadingSnackbarService,
  ) { }

  public openEditor(type: WalletTransactionType, categoryId?: TServerEntityId): Observable<TransactionCategory | null> {
    return this.dialog.open<PagesCategoriesEditorComponent, ITransactionCategoryEditorPayload, TransactionCategory>(
      PagesCategoriesEditorComponent,
      {
        data: { type, categoryId },
      },
    ).afterClosed().pipe(
      switchMap(category => {
        if (!category) {
          return of(null);
        }
        this.loadingService.show('Saving category');

        return this.makeRequest(category).pipe(
          tap(() => this.systemNotificationsService.showNotification({
            message: 'Category saved successfully',
            type: NotificationType.Success,
          })),
          finalize(() => {
            this.loadingService.hide();
          }),
          catchError(() => {
            this.systemNotificationsService.showNotification({
              message: 'Saving category failed',
              type: NotificationType.Error,
            });

            return of(null);
          }),
        );
      }),
    );
  }

  private makeRequest(category: TransactionCategory): Observable<TransactionCategory> {
    return category.id ?
      this.pagesTransactionCategoriesService.updateTransactionCategory(category) :
      this.pagesTransactionCategoriesService.createTransactionCategory(category);
  }
}
