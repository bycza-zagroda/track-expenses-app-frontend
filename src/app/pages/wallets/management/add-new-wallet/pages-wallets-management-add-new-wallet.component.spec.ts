import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesWalletsManagementAddNewWalletComponent } from './pages-wallets-management-add-new-wallet.component';
import { MaterialModule } from '../../../../material.module';

describe('PagesWalletsManagementAddNewWalletComponent', () => {
  let component: PagesWalletsManagementAddNewWalletComponent;
  let fixture: ComponentFixture<PagesWalletsManagementAddNewWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesWalletsManagementAddNewWalletComponent ],
      imports: [ MaterialModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesWalletsManagementAddNewWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
