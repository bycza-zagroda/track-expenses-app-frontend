import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ContainerComponent } from '../../ui/container/container.component';

@Component({
  selector: 'teaf-ng-not-found',
  standalone: true,
  imports: [ CommonModule, ContainerComponent, NgOptimizedImage ],
  templateUrl: './not-found.component.html',
  styleUrls: [ './not-found.component.scss' ],
})
export class NotFoundComponent {}
