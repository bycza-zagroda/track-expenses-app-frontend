import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, finalize, Observable, of, switchMap, tap } from 'rxjs';
import { LoadingSnackbarService } from 'src/app/common/loading-modal/loading-snackbar.service';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { NotificationType } from 'src/app/common/utils/system-notifications/system.notifications.constants';
import { TransactionCategory } from 'src/app/domains/categories/domains.transaction-categories.types';
import { PagesCategoriesEditorComponent } from './pages-categories-editor.component';

@Injectable({
  providedIn: 'root'
})
export class PagesCategoriesEditorService {

  constructor(
    private readonly dialog: MatDialog,
    private readonly systemNotificationsService: SystemNotificationsService,
    private readonly loadingService: LoadingSnackbarService,
  ) { }

  public openEditor(category: TransactionCategory): Observable<TransactionCategory | null> {
    return this.dialog.open<PagesCategoriesEditorComponent, TransactionCategory, TransactionCategory>(
      PagesCategoriesEditorComponent,
      {
        data: category,
      },
    ).afterClosed().pipe(
      switchMap(category => {
        if (!category) {
          return of(null);
        }

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
    this.loadingService.show('Saving category');
    throw new Error();
    // return transaction.id ?
    //   this.pagesWalletDetailsService.editWalletTransaction(transaction) :
    //   this.pagesWalletDetailsService.createWalletTransaction(transaction);
  }
}
