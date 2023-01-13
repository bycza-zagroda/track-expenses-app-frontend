import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { LoadingModalComponent } from './loading-modal.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingSnackbarService {
  private snackBarRef: MatSnackBarRef<LoadingModalComponent> | undefined;

  public constructor(private snackBar: MatSnackBar) {
  }

  public show(message: string): void {
    this.snackBarRef = this.snackBar.openFromComponent(LoadingModalComponent, { data: message });
  }

  public hide(): void {
    if (this.snackBarRef === undefined) {
      throw new Error('hide() called before showing loading indicator');
    }

    this.snackBarRef.dismiss();
  }
}
