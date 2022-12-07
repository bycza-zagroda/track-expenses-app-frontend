import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { LoadingModalComponent } from './loading-modal.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingSnackbarService {

  public constructor(private snackBar: MatSnackBar) {
  }

  private snackBarRef: MatSnackBarRef<LoadingModalComponent> | undefined;

  public show(message: string): void {
    this.snackBarRef = this.snackBar.openFromComponent(LoadingModalComponent, {data: message});
  }

  public hide(): void {
    if (this.snackBarRef === undefined) {
      throw new Error('hide() called before showing loading indicator');
    }
    this.snackBarRef.dismiss();
  }
}
