import { Component, OnInit } from '@angular/core';
import { TDataState } from 'src/app/common/http/common.http.types';
import { WalletDetailsItem } from './pages-wallet-details-item.model';
import { PagesWalletDetailsService } from './pages-wallet-details.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-pages-wallet-details',
  templateUrl: './pages-wallet-details.component.html',
  styleUrls: ['./pages-wallet-details.component.scss'],
})
export class PagesWalletDetailsComponent implements OnInit {

  selected = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);

  matcher = new MyErrorStateMatcher();

  public displayedColumns: string[] = ['id', 'date', 'description', 'amount', 'actions'];

  public walletsDetailsData: TDataState<WalletDetailsItem> = {
    data: null,
    hasError: false,
    isLoading: true,
  }

  public constructor(
    private pagesWalletDetailsService: PagesWalletDetailsService,
  ) { }

  public ngOnInit(): void {
    this.pagesWalletDetailsService.getWalletsDetails(1).subscribe({
      next: (data) => {
        this.walletsDetailsData = {
          data,
          hasError: false,
          isLoading: false,
        }
      },
      error: () => {
        this.walletsDetailsData = {
          data: null,
          isLoading: false,
          hasError: true,
        };
      },
    })
  }

}
