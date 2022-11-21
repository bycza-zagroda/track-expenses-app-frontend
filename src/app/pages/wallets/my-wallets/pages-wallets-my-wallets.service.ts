import { Injectable } from '@angular/core';
import { DomainsWalletsGateway } from '../../../domains/wallets/domains.wallets.gateway';
import { catchError, map, Observable, ObservableInput, of } from 'rxjs';
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
      map(walletsResp => walletsResp.map(resp => new MyWallet(resp))),
    );
  }

  public createWallet(wallet: MyWallet): Observable<MyWallet> {
    return this.gateway.createWallet(wallet.toPayload()).pipe(
      map(walletsResp => new MyWallet(walletsResp)),
    );
  }

  public updateWallet(wallet: MyWallet): Observable<MyWallet> {
    return this.gateway.updateWallet(wallet.id!, wallet.toPayload()).pipe(
        map(response => new MyWallet(response)),
    );
  }
}
