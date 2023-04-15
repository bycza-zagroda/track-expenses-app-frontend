import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'teaf-ng-no-results',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './no-results.component.html',
  styleUrls: ['./no-results.component.scss'],
})
export class NoResultsComponent {
  @Input() public title = 'No data available';
  @Input() public text = 'There is not data available for this page';
}
