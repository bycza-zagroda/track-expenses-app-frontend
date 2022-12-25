import { Injectable } from '@angular/core';
import { DomainsWalletsGateway } from '../../../domains/wallets/domains.wallets.gateway';
import { map, Observable } from 'rxjs';
import { WalletsManagementItem } from './pages-wallets-wallets-management-item.model';

@Injectable({
  providedIn: 'root',
})
export class PagesWalletsManagementService {
  public constructor(
      private readonly gateway: DomainsWalletsGateway,
  ) {
  }

  public getWallets(): Observable<WalletsManagementItem[]> {
    return this.gateway.getWallets().pipe(
        map(walletsResp => walletsResp.map(resp => new WalletsManagementItem(resp))),
    );
  }

  public createWallet(wallet: WalletsManagementItem): Observable<WalletsManagementItem> {
    return this.gateway.createWallet(wallet.toPayload()).pipe(
      map(walletsResp => new WalletsManagementItem(walletsResp)),
    );
  }

  public updateWallet(wallet: WalletsManagementItem): Observable<WalletsManagementItem> {
    return this.gateway.updateWallet(wallet.id!, wallet.toPayload()).pipe(
        map(response => new WalletsManagementItem(response)),
    );
  }

  public deleteWallet(wallet: WalletsManagementItem): Observable<void> {
    return this.gateway.deleteWallet(wallet.id!);
  }
}
