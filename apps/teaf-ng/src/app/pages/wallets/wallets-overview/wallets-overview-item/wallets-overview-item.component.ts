import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Wallet } from '../../../../domains/wallets/wallet.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { WalletsGatewayService } from '../../../../domains/wallets/wallets-gateway.service';
import { Router } from '@angular/router';
import { DatePipe } from '../../../../common/pipes/date.pipe';

@Component({
  selector: 'teaf-ng-wallets-overview-item',
  standalone: true,
  imports: [ CommonModule, ButtonModule, TagModule, ConfirmPopupModule, DatePipe ],
  templateUrl: './wallets-overview-item.component.html',
  styleUrls: [ './wallets-overview-item.component.scss' ],
})
export class WalletsOverviewItemComponent {
  @Input() public wallet!: Wallet;

  @Output() public walletDeleted = new EventEmitter<void>();

  public isDeletingWallet = false;

  public constructor(
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly gateway: WalletsGatewayService,
    private readonly router: Router,
  ) {}

  public onWalletDelete($event: MouseEvent): void {
    if ($event.target === null || this.isDeletingWallet) {
      return;
    }

    this.confirmationService.confirm({
      target: $event.target,
      message: `Are you sure you want to delete ${this.wallet.name} wallet and all related data?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteWallet();
      },
    });
  }

  public async goToDetails(): Promise<void> {
    await this.router.navigate([ '/wallets', this.wallet.id ]);
  }

  private deleteWallet(): void {
    this.isDeletingWallet = true;

    this.gateway.deleteWallet(this.wallet.id).subscribe({
      next: () => {
        this.walletDeleted.emit();

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Wallet deleted',
        });
      },
      error: () => {
        this.isDeletingWallet = false;

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete wallet',
        });
      },
    });
  }
}
