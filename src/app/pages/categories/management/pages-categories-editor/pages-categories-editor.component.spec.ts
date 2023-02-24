import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesCategoriesEditorComponent } from './pages-categories-editor.component';

describe('PagesCategoriesEditorComponent', () => {
  let component: PagesCategoriesEditorComponent;
  let fixture: ComponentFixture<PagesCategoriesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesCategoriesEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesCategoriesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
