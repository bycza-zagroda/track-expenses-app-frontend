import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalletComponent } from './wallet.component';

describe('WalletComponent', () => {
  let component: WalletComponent;
  let fixture: ComponentFixture<WalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WalletComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the wallet component instance', () => {
    const fixture = TestBed.createComponent(WalletComponent);
    const wallet = fixture.componentInstance;
    expect(wallet).toBeTruthy();
  });

  it('should render wallets', () => {
    const fixture = TestBed.createComponent(WalletComponent);
    fixture.detectChanges();

    const elem = fixture.nativeElement as HTMLElement;
    expect(elem.querySelector('div')).toBeTruthy();
  });
});
