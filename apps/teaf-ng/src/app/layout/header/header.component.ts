import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from '../../ui/container/container.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ManageCategoriesComponent } from '../../pages/wallets/wallet-details/manage-categories/manage-categories.component';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'teaf-ng-header',
  standalone: true,
  imports: [ CommonModule, ContainerComponent, RouterLink, RouterLinkActive, ButtonModule, ManageCategoriesComponent, SidebarModule ],
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ],
})
export class HeaderComponent {
  public menuVisible = false;
}
