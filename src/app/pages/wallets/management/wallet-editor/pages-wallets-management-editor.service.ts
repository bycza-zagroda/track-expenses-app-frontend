import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom, Observable, Subject } from 'rxjs';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { IWalletApiResponse } from 'src/app/domains/wallets/domains.wallets.types';
import { PagesWalletsManagementService } from '../pages-wallets-management.service';
import { WalletsManagementItem } from '../pages-wallets-wallets-management-item.model';
import { PagesWalletsManagementEditorComponent } from './pages-wallets-management-editor.component';
import { IWalletModalData } from './pages-wallets-management-editor.types';

@Injectable({
  providedIn: 'root'
})
export class PagesWalletsManagementEditorService {

  subject?: Subject<WalletsManagementItem | undefined>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly systemNotificationsService: SystemNotificationsService,
    private readonly myWalletsService: PagesWalletsManagementService,
  ) { }

  public openWalletEditor(wallet?: WalletsManagementItem): Observable<WalletsManagementItem | undefined> {
    this.subject = new Subject<WalletsManagementItem | undefined>();

    this.openWalletModal({ name: wallet?.name ?? '' }).subscribe( (walletResp: IWalletModalData | undefined) => {
      if(walletResp) {
        this.makeRequest(walletResp, wallet);
      }
    });

    return this.subject.asObservable();
  }

  public makeRequest(walletResp: IWalletModalData, wallet?: WalletsManagementItem): void {

    let newWalletData: Partial<IWalletApiResponse> = wallet ? { name: walletResp.name, id: wallet!.id! } : { name: walletResp.name };

    const walletObject = WalletsManagementItem.create(newWalletData);

    //const action = wallet ? this.myWalletsService.updateWallet : this.myWalletsService.createWallet;
    this.myWalletsService.createWallet(walletObject).subscribe( (walletResp: WalletsManagementItem) => {
      this.notify(walletResp, wallet ? 'updated' : 'created');

      this.subject?.next(walletResp);
      this.subject?.complete();
    });
  }

  public notify(updatedWallet: WalletsManagementItem, type: string): void {

    if(!updatedWallet) {
      this.systemNotificationsService.showNotification({ message: 'Sorry. Something went wrong and your wallet was not saved. Contact administrator.' });
      return;
    }

    this.systemNotificationsService.showNotification({ message: `Congratulations! Your wallet was ${type} successfully.` });
  }

  private openWalletModal(wallet: IWalletModalData): Observable<IWalletModalData | undefined> {
    const dialogRef = this.dialog.open<PagesWalletsManagementEditorComponent, IWalletModalData | undefined, IWalletModalData>(PagesWalletsManagementEditorComponent, {
      data: wallet,
    });

    return dialogRef.afterClosed();
  }
}
