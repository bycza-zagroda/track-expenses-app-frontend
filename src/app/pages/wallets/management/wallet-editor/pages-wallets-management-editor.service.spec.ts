import { TestBed } from '@angular/core/testing';

import { PagesWalletsManagementEditorService } from './pages-wallets-management-editor.service';

describe('PagesWalletsManagementEditorService', () => {
  let service: PagesWalletsManagementEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagesWalletsManagementEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
