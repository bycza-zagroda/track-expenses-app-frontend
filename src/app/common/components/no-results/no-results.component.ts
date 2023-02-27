import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-results',
  templateUrl: './no-results.component.html',
  styleUrls: [ './no-results.component.scss' ], 
})
export class NoResultsComponent {
  @Input() public title = 'Ooops!';
  @Input() public text!: string;
}
