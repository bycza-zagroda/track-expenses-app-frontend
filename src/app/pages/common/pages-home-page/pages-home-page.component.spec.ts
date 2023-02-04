import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesHomePageComponent } from './pages-home-page.component';

describe('PagesHomePageComponent', () => {
  let component: PagesHomePageComponent;
  let fixture: ComponentFixture<PagesHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesHomePageComponent ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PagesHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
