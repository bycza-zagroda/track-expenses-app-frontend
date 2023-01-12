import { TestBed } from '@angular/core/testing';

import { ModalEditorService } from './modal-editor.service';

xdescribe('ModalEditorService', () => {
  let service: ModalEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
