import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import {LoadingModalComponent} from './loading-modal.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingDialogService {

  public constructor(private snackBar: MatSnackBar) {
  }

  private snackBarRef!: MatSnackBarRef<LoadingModalComponent>;

  public startLoading(message: string): void {
    this.snackBarRef = this.snackBar.openFromComponent(LoadingModalComponent, {data: message});
  }

  public stopLoading(): void {
    this.snackBarRef.dismiss();
  }
}
