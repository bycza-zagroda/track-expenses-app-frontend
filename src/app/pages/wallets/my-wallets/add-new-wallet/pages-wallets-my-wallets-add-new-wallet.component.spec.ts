import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesWalletsMyWalletsAddNewWalletComponent } from './pages-wallets-my-wallets-add-new-wallet.component';
import { MaterialModule } from '../../../../material.module';

describe('PagesWalletsMyWalletsAddNewWalletComponent', () => {
  let component: PagesWalletsMyWalletsAddNewWalletComponent;
  let fixture: ComponentFixture<PagesWalletsMyWalletsAddNewWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesWalletsMyWalletsAddNewWalletComponent ],
      imports: [ MaterialModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesWalletsMyWalletsAddNewWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
