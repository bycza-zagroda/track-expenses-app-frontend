import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { DomainsWalletsGateway } from 'src/app/domains/wallets/domains.wallets.gateway';
import { IWalletApiResponse } from 'src/app/domains/wallets/domains.wallets.types';
import { WalletsManagementItem } from 'src/app/pages/wallets/management/pages-wallets-wallets-management-item.model';

@Injectable({
  providedIn: 'root',
})
export class PagesWalletDetailsResolver implements Resolve<WalletsManagementItem> {
  public constructor(private readonly domainsWalletsGateway: DomainsWalletsGateway, private readonly router: Router) {}

  public async resolve(route: ActivatedRouteSnapshot): Promise<WalletsManagementItem> {
    const wallets = await firstValueFrom(this.domainsWalletsGateway.getWallets());
    const id = route.paramMap.get('id')!;
    const wallet = wallets.find((wallet: IWalletApiResponse) => wallet.id === parseInt(id))!;

    this.navigateErrorPageIfWalletNotFound(wallet);

    return new WalletsManagementItem(wallet);
  }
  
  public navigateErrorPageIfWalletNotFound(wallet: IWalletApiResponse | undefined): void {
    if(!wallet) {
      void this.router.navigate([ '/**' ], { skipLocationChange: true });
    }
  }
}
