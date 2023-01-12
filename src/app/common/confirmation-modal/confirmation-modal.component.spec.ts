import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationModalComponent } from './confirmation-modal.component';
import { MaterialModule } from '../../material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationModalComponent ],
      imports: [
        MaterialModule,
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA, useValue: {
            headerText: 'headerText',
            confirmationText: 'confirmationText',
            confirmBtnText: 'confirmBtnText',
            denyBtnText: ' denyBtnText',
          },
        },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
