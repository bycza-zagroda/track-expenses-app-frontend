import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { DomainsWalletsGateway } from 'src/app/domains/wallets/domains.wallets.gateway';
import { IWalletApiResponse } from 'src/app/domains/wallets/domains.wallets.types';
import { WalletsManagementItem } from 'src/app/pages/wallets/management/pages-wallets-wallets-management-item.model';

@Injectable({
  providedIn: 'root'
})
export class PagesWalletDetailsResolver implements Resolve<WalletsManagementItem> {

  constructor(private readonly domainsWalletsGateway: DomainsWalletsGateway) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<WalletsManagementItem> {

    const walletsObs = await this.domainsWalletsGateway.getWallets();
    const wallets = await firstValueFrom(walletsObs);
    let rawId: string = route.paramMap.get('id') || '1'; // ????
    const wallet = wallets.find((wallet: IWalletApiResponse) => wallet.id === parseInt(rawId))!;
    const walletResponse = new WalletsManagementItem(wallet);
    return walletResponse;
  }
}
