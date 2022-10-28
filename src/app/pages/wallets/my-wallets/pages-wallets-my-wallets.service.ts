import { Injectable } from '@angular/core';
import { DomainsWalletsGateway } from '../../../domains/wallets/domains.wallets.gateway';
import { map, Observable } from 'rxjs';
import { MyWallet } from './pages-wallets-my-wallet.model';

@Injectable({
  providedIn: 'root',
})
export class PagesWalletsMyWalletsService {
  public constructor(
    private readonly gateway: DomainsWalletsGateway,
  ) {}

  public getMyWallets(): Observable<MyWallet[]> {
    return this.gateway.getWallets().pipe(
      map(walletsResp => walletsResp.map(resp => new MyWallet(resp)))
    );
  }
}
