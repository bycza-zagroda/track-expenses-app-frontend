import { Component, OnInit } from '@angular/core';
import { PagesWalletsMyWalletsService } from './pages-wallets-my-wallets.service';
import { MyWallet } from './pages-wallets-my-wallet.model';
import { TDataState } from '../../../common/http/common.http.types';

@Component({
  selector: 'app-my-wallets',
  templateUrl: './pages-wallets-my-wallets.component.html',
  styleUrls: ['./pages-wallets-my-wallets.component.scss']
})
export class PagesWalletsMyWalletsComponent implements OnInit {
  public myWalletsData: TDataState<MyWallet[]> = {
    isLoading: true,
    data: null,
    hasError: false,
  };

  public constructor(
    private readonly myWalletsService: PagesWalletsMyWalletsService,
  ) {}

  public ngOnInit(): void {
    this.myWalletsService.getMyWallets().subscribe({
      next: (data) => {
        this.myWalletsData = {
          data,
          isLoading: false,
          hasError: false,
        };
      },
      error: () => {
        this.myWalletsData = {
          data: null,
          isLoading: false,
          hasError: true,
        };
      },
    });
  }
}
