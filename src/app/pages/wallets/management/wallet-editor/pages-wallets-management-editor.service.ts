import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, switchMap, tap } from 'rxjs';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { PagesWalletsManagementService } from '../pages-wallets-management.service';
import { WalletsManagementItem } from '../pages-wallets-wallets-management-item.model';
import { PagesWalletsManagementEditorComponent } from './pages-wallets-management-editor.component';
import { IWalletModalData } from './pages-wallets-management-editor.types';

@Injectable({
  providedIn: 'root',
})
export class PagesWalletsManagementEditorService {

  public constructor(
    private readonly dialog: MatDialog,
    private readonly systemNotificationsService: SystemNotificationsService,
    private readonly myWalletsService: PagesWalletsManagementService,
  ) { }

  public openWalletEditor(wallet?: WalletsManagementItem): Observable<WalletsManagementItem | null> {

    return this.dialog.open<PagesWalletsManagementEditorComponent, IWalletModalData | undefined, IWalletModalData>(PagesWalletsManagementEditorComponent, {
      data: { name: wallet?.name ?? '' },
    }).afterClosed().pipe(
      switchMap((walletResp: IWalletModalData | undefined) => {
        return !!walletResp ? this.makeRequest(walletResp, wallet ?? null) : of(null);
    }),
      tap((w: WalletsManagementItem | null) => {
        w && this.notify(w, wallet ? 'updated' : 'created');
      }),
    )
  }

  private makeRequest(walletResp: IWalletModalData, wallet: WalletsManagementItem | null): Observable<WalletsManagementItem> {
    const walletObject = WalletsManagementItem.create(wallet ? { name: walletResp.name, id: wallet!.id! } : { name: walletResp.name });
    //  36:93  error    This assertion is unnecessary since it does not change the type of the expression ??
    return (wallet ? this.myWalletsService.updateWallet(walletObject) : this.myWalletsService.createWallet(walletObject));
  }

  private notify(updatedWallet: WalletsManagementItem | null, type: string): void {

    if(!updatedWallet) {
      this.systemNotificationsService.showNotification({ message: 'Sorry. Something went wrong and your wallet was not saved. Contact administrator.' });
      return;
    }

    this.systemNotificationsService.showNotification({ message: `Congratulations! Your wallet was ${type} successfully.` });
  }
}
