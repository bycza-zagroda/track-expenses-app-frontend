import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, finalize, Observable, of, switchMap, tap } from 'rxjs';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { PagesWalletsManagementService } from '../pages-wallets-management.service';
import { WalletsManagementItem } from '../pages-wallets-wallets-management-item.model';
import { PagesWalletsManagementEditorComponent } from './pages-wallets-management-editor.component';
import { NotificationType } from '../../../../common/utils/system-notifications/system.notifications.constants';
import { LoadingSnackbarService } from '../../../../common/loading-modal/loading-snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class PagesWalletsManagementEditorService {
  public constructor(
    private readonly dialog: MatDialog,
    private readonly systemNotificationsService: SystemNotificationsService,
    private readonly myWalletsService: PagesWalletsManagementService,
    private readonly loadingService: LoadingSnackbarService,
  ) { }

  public openEditor(wallet: WalletsManagementItem): Observable<WalletsManagementItem | null> {
    return this.dialog.open<PagesWalletsManagementEditorComponent, WalletsManagementItem, WalletsManagementItem>(
      PagesWalletsManagementEditorComponent,
      {
        data: wallet,
      },
    ).afterClosed().pipe(
      switchMap(wallet => {
        if (!wallet) {
          return of(null);
        }

        return this.makeRequest(wallet).pipe(
          tap(() => this.systemNotificationsService.showNotification({
            message: 'Wallet saved successfully',
            type: NotificationType.Success,
          })),
          finalize(() => {
            this.loadingService.hide();
          }),
          catchError(() => {
            this.systemNotificationsService.showNotification({
              message: 'Saving wallet failed',
              type: NotificationType.Error,
            });

            return of(null);
          }),
        );
      }),
    );
  }

  private makeRequest(wallet: WalletsManagementItem): Observable<WalletsManagementItem> {
    this.loadingService.show('Saving wallet');

    return wallet.id ?
      this.myWalletsService.updateWallet(wallet.id , wallet.toPayload()) :
      this.myWalletsService.createWallet(wallet.toPayload());
  }
}