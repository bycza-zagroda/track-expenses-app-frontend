import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Wallet } from '../../../../domains/wallets/wallet.model';
import { DatePipe } from '../../../../common/pipes/date.pipe';
import { TagModule } from 'primeng/tag';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { WalletEditorComponent } from '../../wallet-editor/wallet-editor.component';

@Component({
  selector: 'teaf-ng-wallet-data',
  standalone: true,
  imports: [CommonModule, DatePipe, TagModule, ChartModule, ButtonModule],
  templateUrl: './wallet-data.component.html',
  styleUrls: ['./wallet-data.component.scss'],
})
export class WalletDataComponent{
  @Input() public wallet!: Wallet;

  public constructor(
    private readonly dialogService: DialogService,
  ) {}

  public onWalletEdit(): void {
    const ref = this.dialogService.open(WalletEditorComponent, {
      header: 'Edit wallet',
      width: 'min(100%, 600px)',
      data: {
        wallet: this.wallet,
      }
    });

    ref.onClose.subscribe({
      next: (wallet: Wallet | undefined) => {
        if (wallet) {
          this.wallet = wallet;
        }
      }
    });
  }
}
