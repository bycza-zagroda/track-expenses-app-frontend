import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesCategoriesManagementComponent } from './pages-categories-management.component';

describe('PagesCategoriesManagementComponent', () => {
  let component: PagesCategoriesManagementComponent;
  let fixture: ComponentFixture<PagesCategoriesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesCategoriesManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesCategoriesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
