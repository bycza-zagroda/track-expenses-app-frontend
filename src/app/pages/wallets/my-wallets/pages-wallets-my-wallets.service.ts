import {Injectable} from '@angular/core';
import {DomainsWalletsGateway} from '../../../domains/wallets/domains.wallets.gateway';
import {map, Observable} from 'rxjs';
import {MyWallet} from './pages-wallets-my-wallet.model';

@Injectable({
  providedIn: 'root',
})
export class PagesWalletsMyWalletsService {
  public constructor(
    private readonly gateway: DomainsWalletsGateway,
  ) {
  }

  public getMyWallets(): Observable<MyWallet[]> {
    return this.gateway.getWallets().pipe(
      map(walletsResp => walletsResp.map(resp => new MyWallet(resp))),
    );
  }

  public addNewWallet(wallet: MyWallet): Observable<MyWallet> {
    return this.gateway.addNewWallet(wallet.toPayload()).pipe(
      map(walletsResp => new MyWallet(walletsResp)),
    );
  }

  public updateNewWallet(wallet: MyWallet): Observable<MyWallet> {
    return this.gateway.updateNewWallet(wallet.id!, wallet.toPayload()).pipe(
      map(response => new MyWallet(response)),
    );
  }

  public deleteWallet(wallet: MyWallet): Observable<MyWallet> {
    return this.gateway.deleteWallet(wallet.id!, wallet.toPayload()).pipe(
      map(response => new MyWallet(response)),
    );
  }
}
