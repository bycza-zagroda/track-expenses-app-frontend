import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesWalletsManagementItemComponent } from './pages-wallets-management-item.component';
import { WalletsManagementItem } from '../pages-wallets-wallets-management-item.model';

describe('PagesWalletsManagementItemComponent', () => {
  let component: PagesWalletsManagementItemComponent;
  let fixture: ComponentFixture<PagesWalletsManagementItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesWalletsManagementItemComponent ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PagesWalletsManagementItemComponent);
    component = fixture.componentInstance;

    component.wallet = new WalletsManagementItem({
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
