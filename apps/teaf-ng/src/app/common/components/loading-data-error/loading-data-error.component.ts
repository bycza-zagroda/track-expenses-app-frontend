import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'teaf-ng-loading-data-error',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './loading-data-error.component.html',
  styleUrls: ['./loading-data-error.component.scss'],
})
export class LoadingDataErrorComponent {}
