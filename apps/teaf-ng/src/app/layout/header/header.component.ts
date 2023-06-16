import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from '../../ui/container/container.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ManageCategoriesComponent } from '../../pages/wallets/wallet-details/manage-categories/manage-categories.component';
import { SidebarModule } from 'primeng/sidebar';
import { AuthService } from '../../common/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'teaf-ng-header',
  standalone: true,
  imports: [ CommonModule, ContainerComponent, RouterLink, RouterLinkActive, ButtonModule, ManageCategoriesComponent, SidebarModule ],
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ],
})
export class HeaderComponent implements OnInit {
  public menuVisible = false;
  public isUserLoggedIn$!: Observable<boolean>;

  public constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    this.isUserLoggedIn$ = this.auth.isUserLoggedIn$;
  }

  public async goToSignIn(): Promise<void> {
    await this.router.navigate([ '/auth/sign-in' ]);
  }

  public async goToSignOn(): Promise<void> {
    await this.router.navigate([ '/auth/sign-on' ]);
  }

  public logout(): void {
    this.auth.signOut().subscribe(() => {
      void this.goToSignIn();
    });
  }
}
