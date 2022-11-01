import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesWalletsMyWalletsMyWalletComponent } from './pages-wallets-my-wallets-my-wallet.component';
import { MyWallet } from '../pages-wallets-my-wallet.model';

describe('MyWalletComponent', () => {
  let component: PagesWalletsMyWalletsMyWalletComponent;
  let fixture: ComponentFixture<PagesWalletsMyWalletsMyWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesWalletsMyWalletsMyWalletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesWalletsMyWalletsMyWalletComponent);
    component = fixture.componentInstance;

    component.wallet = new MyWallet({
      creationDate: '2022-10-22T09:47:52.595721658Z',
      id: 12,
      name: 'My first wallet',
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
