import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from '../../../ui/container/container.component';
import { WalletsOverviewItemComponent } from './wallets-overview-item/wallets-overview-item.component';
import { ButtonModule } from 'primeng/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { WalletsGatewayService } from '../../../domains/wallets/wallets-gateway.service';
import { Wallet } from '../../../domains/wallets/wallet.model';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogService } from 'primeng/dynamicdialog';
import { WalletEditorComponent } from '../wallet-editor/wallet-editor.component';
import { FilterByTextPipe } from '../../../common/pipes/filter-by.pipe';
import { NoResultsComponent } from '../../../common/components/no-results/no-results.component';
import { LoadingDataErrorComponent } from '../../../common/components/loading-data-error/loading-data-error.component';
import { SortByTextPipe } from '../../../common/pipes/sort-by-text.pipe';

@Component({
  selector: 'teaf-ng-wallets-overview',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    WalletsOverviewItemComponent,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    ProgressSpinnerModule,
    FilterByTextPipe,
    NoResultsComponent,
    LoadingDataErrorComponent,
    SortByTextPipe,
  ],
  templateUrl: './wallets-overview.component.html',
  styleUrls: ['./wallets-overview.component.scss'],
})
export class WalletsOverviewComponent implements OnInit {
  public walletSearchControl = new FormControl<string>(
    { value: '', disabled: false },
    { nonNullable: true },
  );

  public wallets: Wallet[] = [];

  public get showWallets(): boolean {
    return this.wallets.length > 0 && !this.isLoading;
  }

  public get showNoWalletsInfo(): boolean {
    return (
      this.wallets.length === 0 && !this.isLoading && !this.hasLoadingError
    );
  }

  public get showLoadingError(): boolean {
    return this.hasLoadingError && !this.isLoading;
  }

  public get showLoading(): boolean {
    return this.isLoading;
  }

  private hasLoadingError = false;
  private isLoading = true;

  public constructor(
    private readonly gateway: WalletsGatewayService,
    private readonly dialogService: DialogService,
  ) {}

  public ngOnInit(): void {
    this.walletSearchControl.disable();

    this.gateway.getWallets().subscribe({
      next: (wallets) => {
        this.wallets = wallets.map((wallet) => Wallet.fromResponse(wallet));
        this.isLoading = false;
        this.walletSearchControl.enable();
      },
      error: () => {
        this.isLoading = false;
        this.hasLoadingError = true;
      },
    });
  }

  public onWalletDelete(wallet: Wallet): void {
    this.wallets = this.wallets.filter((w) => w.id !== wallet.id);
  }

  public onWalletCreate(): void {
    const ref = this.dialogService.open(WalletEditorComponent, {
      header: 'Create wallet',
      width: 'min(100%, 600px)',
    });

    ref.onClose.subscribe({
      next: (wallet: Wallet | undefined) => {
        if (wallet) {
          this.wallets = [...this.wallets, wallet];
        }
      },
    });
  }
}
