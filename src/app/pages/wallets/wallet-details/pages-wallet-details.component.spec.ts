import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesWalletDetailsComponent } from './pages-wallet-details.component';

describe('PagesWalletDetailsComponent', () => {
  let component: PagesWalletDetailsComponent;
  let fixture: ComponentFixture<PagesWalletDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesWalletDetailsComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesWalletDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
