import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesWalletsManagementEditorComponent } from './pages-wallets-management-editor.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PagesWalletsManagementEditorComponent', () => {
  let component: PagesWalletsManagementEditorComponent;
  let fixture: ComponentFixture<PagesWalletsManagementEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesWalletsManagementEditorComponent ],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: null },
        { provide: MAT_DIALOG_DATA, useValue: undefined },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesWalletsManagementEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
