import { Component, Input } from '@angular/core';
import { NotificationType } from '../../utils/system-notifications/system.notifications.constants';

@Component({
  selector: 'app-system-message',
  templateUrl: './system-message.component.html',
  styleUrls: [ './system-message.component.scss' ],
})
export class SystemMessageComponent {
    @Input() public type: NotificationType = NotificationType.Success;
    @Input() public text!: string;
    @Input() public description?: string;
}
