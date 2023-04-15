import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormFieldComponent } from '../../../common/forms/form-field/form-field.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Wallet } from '../../../domains/wallets/wallet.model';
import { WalletsGatewayService } from '../../../domains/wallets/wallets-gateway.service';
import { map, Observable } from 'rxjs';
import { FormsUtils } from '../../../common/forms/forms.utils';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'teaf-ng-wallet-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, FormFieldComponent],
  templateUrl: './wallet-editor.component.html',
  styleUrls: ['./wallet-editor.component.scss'],
})
export class WalletEditorComponent implements OnInit {
  public isSaving = false;

  public form = new FormGroup({
    name: new FormControl<string>({ value: '', disabled: false }, { nonNullable: true, validators: [Validators.required,  Validators.maxLength(20),] }),
  });

  private wallet: Wallet | undefined;

  public constructor(
    private readonly gateway: WalletsGatewayService,
    private readonly dialogRef: DynamicDialogRef,
    private readonly dialogConfig: DynamicDialogConfig<{ wallet?: Wallet }>,
    private readonly messageService: MessageService,
  ) {
  }

  public ngOnInit(): void {
    if (this.dialogConfig.data === undefined) {
      throw new Error('Data is not defined');
    }

    this.wallet = this.dialogConfig.data.wallet;

    if (this.wallet) {
      this.form.patchValue({
        name: this.wallet.name,
      });
    }
  }

  public save(): void {
    FormsUtils.markAllControlsAsDirty([this.form]);

    if (this.form.invalid) {
      return;
    }

    this.isSaving = true;

    const observable = this.wallet ? this.updateWallet() : this.createWallet();

    observable.subscribe({
      next: (wallet) => {
        this.isSaving = false;

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Wallet saved',
        });



        this.dialogRef.close(wallet);
      },
      error: () => {
        this.isSaving = false;

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to save wallet',
        });
      }
    });
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  private createWallet(): Observable<Wallet> {
    const wallet = Wallet.create({
      name: this.form.controls.name.value,
      id: null,
    });

    return this.gateway.createWallet(wallet.toPayload()).pipe(
      map(resp => Wallet.fromResponse(resp)),
    );
  }

  private updateWallet(): Observable<Wallet> {
    if (this.wallet === undefined) {
      throw new Error('Wallet is not defined');
    }

    const wallet = this.wallet.copy({ name: this.form.controls.name.value });

    return this.gateway.updateWallet(this.wallet.id, wallet.toPayload()).pipe(
      map(resp => Wallet.fromResponse(resp)),
    );
  }
}
