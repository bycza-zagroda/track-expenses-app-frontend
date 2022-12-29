import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { DomainsWalletsGateway } from 'src/app/domains/wallets/domains.wallets.gateway';
import { WalletDetailsItem } from './pages-wallet-details-item.model';

@Injectable({
  providedIn: 'root',
})
export class PagesWalletDetailsService {

  public constructor(
    private readonly gateway: DomainsWalletsGateway,
  ) { }

  public getWalletsDetails(id: number): Observable<WalletDetailsItem> {
    return this.gateway.getWalletsDetails(id).pipe(
      map(walletsResp => new WalletDetailsItem(walletsResp)),
    );
  }
}
