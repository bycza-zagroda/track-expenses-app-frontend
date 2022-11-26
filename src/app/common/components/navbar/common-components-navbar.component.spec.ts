import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonComponentsNavbarComponent } from './common-components-navbar.component';

describe('NavbarComponent', () => {
  let component: CommonComponentsNavbarComponent;
  let fixture: ComponentFixture<CommonComponentsNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonComponentsNavbarComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonComponentsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
