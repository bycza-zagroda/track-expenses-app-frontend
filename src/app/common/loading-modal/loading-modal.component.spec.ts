import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingModalComponent } from './loading-modal.component';
import { MaterialModule } from '../../material.module';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

describe('LoadingModalComponent', () => {
  let component: LoadingModalComponent;
  let fixture: ComponentFixture<LoadingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingModalComponent ],
      imports: [
        MaterialModule,
      ],
      providers: [
        { provide: MAT_SNACK_BAR_DATA, useValue: 'some data' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
