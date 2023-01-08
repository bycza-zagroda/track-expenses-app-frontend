import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { PagesWalletsManagementService } from '../pages-wallets-management.service';
import { WalletsManagementItem } from '../pages-wallets-wallets-management-item.model';
import { PagesWalletsManagementEditorComponent } from './pages-wallets-management-editor.component';
import { IWalletModalData } from './pages-wallets-management-editor.types';

@Injectable({
  providedIn: 'root'
})
export class PagesWalletsManagementEditorService {

  private subject?: Subject<WalletsManagementItem | undefined>;

  public constructor(
    private readonly dialog: MatDialog,
    private readonly systemNotificationsService: SystemNotificationsService,
    private readonly myWalletsService: PagesWalletsManagementService,
  ) { }

  public openWalletEditor(wallet?: WalletsManagementItem): Observable<WalletsManagementItem | undefined> {
    this.subject = new Subject<WalletsManagementItem | undefined>();

    this.dialog.open<PagesWalletsManagementEditorComponent, IWalletModalData | undefined, IWalletModalData>(PagesWalletsManagementEditorComponent, {
      data: { name: wallet?.name ?? '' },
    }).afterClosed().subscribe( (walletResp: IWalletModalData | undefined) => {
      if(walletResp) {
        this.makeRequest(walletResp, wallet);
      } else {
        this.subject?.next(undefined);
        this.subject?.complete();
      }
    });

    return this.subject.asObservable();
  }

  private makeRequest(walletResp: IWalletModalData, wallet?: WalletsManagementItem): void {
    const walletObject = WalletsManagementItem.create(wallet ? { name: walletResp.name, id: wallet!.id! } : { name: walletResp.name });

    const action = wallet ? this.myWalletsService.updateWallet(walletObject) : this.myWalletsService.createWallet(walletObject);
    action.subscribe( (walletResp: WalletsManagementItem) => {
      this.notify(walletResp, wallet ? 'updated' : 'created');

      this.subject?.next(walletResp);
      this.subject?.complete();
    });
  }

  private notify(updatedWallet: WalletsManagementItem, type: string): void {

    if(!updatedWallet) {
      this.systemNotificationsService.showNotification({ message: 'Sorry. Something went wrong and your wallet was not saved. Contact administrator.' });
      return;
    }

    this.systemNotificationsService.showNotification({ message: `Congratulations! Your wallet was ${type} successfully.` });
  }
}
