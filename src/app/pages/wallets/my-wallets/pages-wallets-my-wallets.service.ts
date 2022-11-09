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

  public addNewWallet(name_: string): Observable<MyWallet> {
    return this.gateway.addNewWallet(name_).pipe(
      map(walletsResp => new MyWallet(walletsResp))
    );
  }

  public updateNewWallet(id_: number, name_: string): Observable<MyWallet> {
    return this.gateway.updateNewWallet(id_, name_).pipe(
        map(response => new MyWallet(response))
    );
  }
}
