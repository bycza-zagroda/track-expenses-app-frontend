import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ContainerComponent } from '../../ui/container/container.component';

@Component({
  selector: 'teaf-ng-home',
  standalone: true,
  imports: [ CommonModule, ContainerComponent, NgOptimizedImage ],
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ],
})
export class HomeComponent {}
