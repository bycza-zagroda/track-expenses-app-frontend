import { Pipe, PipeTransform } from '@angular/core';
import { WalletsDetailsTransaction } from 'src/app/pages/wallets/wallet-details/pages-wallet-details-item.model';
import { WalletTransactionType } from 'src/app/pages/wallets/wallet-details/pages-wallet-details.types';

@Pipe({
  name: 'transactionsTypeFilter'
})
export class TransactionsTypeFilterPipe implements PipeTransform {

  transform(value: WalletsDetailsTransaction[], walletTransactionType: WalletTransactionType): WalletsDetailsTransaction[] {
    if(walletTransactionType == WalletTransactionType.Expences) {
      return value.filter( (item: WalletsDetailsTransaction) => item.amount < 0);
    }

    if(walletTransactionType == WalletTransactionType.Incomes) {
      return value.filter( (item: WalletsDetailsTransaction) => item.amount >= 0);
    }

    return value;
  }

}
