import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { DomainsWalletsGateway } from 'src/app/domains/wallets/domains.wallets.gateway';
import { IWalletTransactionApiResponse } from 'src/app/domains/wallets/domains.wallets.types';
import { WalletsDetailsTransaction } from './pages-wallet-details-item.model';

@Injectable({
  providedIn: 'root',
})
export class PagesWalletDetailsService {

  public constructor(
    private readonly gateway: DomainsWalletsGateway,
  ) { }

  public getWalletsDetails(id: number): Observable<WalletsDetailsTransaction[]> {
    return this.gateway.getWalletsDetails(id).pipe(
      map(walletsResp => walletsResp.map((item: IWalletTransactionApiResponse) => new WalletsDetailsTransaction(item))),
    );
  }
}
