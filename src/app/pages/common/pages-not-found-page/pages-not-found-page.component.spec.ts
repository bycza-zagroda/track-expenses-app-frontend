import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesNotFoundPageComponent } from './pages-not-found-page.component';

describe('PagesNotFoundPageComponent', () => {
  let component: PagesNotFoundPageComponent;
  let fixture: ComponentFixture<PagesNotFoundPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesNotFoundPageComponent ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PagesNotFoundPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
