import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { DomainsWalletsGateway } from 'src/app/domains/wallets/domains.wallets.gateway';
import { ITransactionPayload, IWalletTransactionApiResponse } from 'src/app/domains/wallets/domains.wallets.types';
import { WalletsDetailsTransaction } from './pages-wallet-details-item.model';

@Injectable({
  providedIn: 'root',
})
export class PagesWalletDetailsService {
  public constructor(
    private readonly gateway: DomainsWalletsGateway,
  ) { }

  public getWalletTransactions(id: number): Observable<WalletsDetailsTransaction[]> {
    return this.gateway.getWalletTransactions(id).pipe(
      map(transactionsResp => transactionsResp.map((item: IWalletTransactionApiResponse) => new WalletsDetailsTransaction(item))),
    );
  }

  public createWalletTransaction(data: ITransactionPayload): Observable<WalletsDetailsTransaction> {
    return this.gateway.createWalletTransaction(data).pipe(
      map(transactionsResp => new WalletsDetailsTransaction(transactionsResp)),
    );
  }

  public editWalletTransaction(id: number, data: WalletsDetailsTransaction): Observable<WalletsDetailsTransaction> {
    return this.gateway.editWalletTransaction(id, data).pipe(
      map(transactionsResp =>  new WalletsDetailsTransaction(transactionsResp)),
    );
  }
}
