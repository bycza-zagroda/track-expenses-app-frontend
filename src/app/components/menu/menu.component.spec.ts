import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the menu instance', () => {
    const fixture = TestBed.createComponent(MenuComponent);
    const menu = fixture.componentInstance;
    expect(menu).toBeTruthy();
  });

  it('should return all router links', () => {
    const fixture = TestBed.createComponent(MenuComponent);
    const menu = fixture.componentInstance;

    expect(menu?.routes?.length).toEqual(2);
  });

  it('should render nav', () => {
    const fixture = TestBed.createComponent(MenuComponent);
    fixture.detectChanges();

    const elem = fixture.nativeElement as HTMLElement;
    expect(elem.querySelector('nav')).toBeTruthy();
  });
});
