import { Component, Input } from '@angular/core';
import { NotificationType } from 'src/app/common/utils/system-notifications/system-notifications.enums';

@Component({
  selector: 'app-system-message',
  templateUrl: './system-message.component.html',
  styleUrls: ['./system-message.component.scss'],
})
export class SystemMessageComponent {
    @Input() public type: string = NotificationType.Success;
    @Input() public text!: string;
    @Input() public description?: string;
}
