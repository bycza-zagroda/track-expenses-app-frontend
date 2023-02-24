import { TestBed } from '@angular/core/testing';

import { PagesCategoriesEditorService } from './pages-categories-editor.service';

describe('PagesCategoriesEditorService', () => {
  let service: PagesCategoriesEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagesCategoriesEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
