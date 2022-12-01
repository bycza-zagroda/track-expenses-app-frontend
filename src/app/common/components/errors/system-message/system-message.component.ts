import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-system-message',
  templateUrl: './system-message.component.html',
  styleUrls: ['./system-message.component.scss'],
})
export class SystemMessageComponent {

    @Input() public type!: string;
    @Input() public text!: string;
    @Input() public description?: string = '';

    public getBackgroundColor = (): string => this.type;
}
