import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { TServerEntityId } from 'src/app/common/http/common.http.types';
import { DomainsTransactionsGateway } from 'src/app/domains/transactions/domains.transactions.gateway';
import { IWalletTransactionApiResponse } from 'src/app/domains/transactions/domains.transactions.types';
import { WalletTransaction } from './pages-wallet-details-item.model';

@Injectable({
  providedIn: 'root',
})
export class PagesWalletDetailsService {
  public constructor(
    private readonly gateway: DomainsTransactionsGateway,
  ) { }

  public getWalletTransactions(id: TServerEntityId): Observable<WalletTransaction[]> {
    return this.gateway.getWalletTransactions(id).pipe(
      map(transactionsResp => transactionsResp.map(
        (item: IWalletTransactionApiResponse) => new WalletTransaction(item),
      )),
    );
  }

  public createWalletTransaction(data: WalletTransaction): Observable<WalletTransaction> {
    return this.gateway.createWalletTransaction(data).pipe(
      map(transactionsResp => new WalletTransaction(transactionsResp)),
    );
  }

  public editWalletTransaction(data: WalletTransaction): Observable<WalletTransaction> {
    return this.gateway.editWalletTransaction(data).pipe(
      map(transactionsResp => new WalletTransaction(transactionsResp)),
    );
  }
}
