import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { TServerEntityId } from 'src/app/common/http/common.http.types';
import { DomainsTransactionsGateway } from 'src/app/domains/transactions/domains.transactions.gateway';
import { ITransactionPayload, IWalletTransactionApiResponse } from 'src/app/domains/transactions/domains.transactions.types';
import { WalletsDetailsTransaction } from './pages-wallet-details-item.model';

@Injectable({
  providedIn: 'root',
})
export class PagesWalletDetailsService {
  public constructor(
    private readonly gateway: DomainsTransactionsGateway,
  ) { }

  public getWalletTransactions(id: TServerEntityId): Observable<WalletsDetailsTransaction[]> {
    return this.gateway.getWalletTransactions(id).pipe(
      map(transactionsResp => transactionsResp.map(
        (item: IWalletTransactionApiResponse) => new WalletsDetailsTransaction(item),
      )),
    );
  }

  public createWalletTransaction(data: ITransactionPayload): Observable<WalletsDetailsTransaction> {
    return this.gateway.createWalletTransaction(data).pipe(
      map(transactionsResp => new WalletsDetailsTransaction(transactionsResp)),
    );
  }

  public editWalletTransaction(id: TServerEntityId, data: WalletsDetailsTransaction): Observable<WalletsDetailsTransaction> {
    return this.gateway.editWalletTransaction(id, data).pipe(
      map(transactionsResp =>  new WalletsDetailsTransaction(transactionsResp)),
    );
  }
}
