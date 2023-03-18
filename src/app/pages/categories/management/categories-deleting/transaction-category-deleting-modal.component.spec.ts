import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { TransactionCategory } from '../../transaction-category.model';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

import { TransactionCategoryDeletingModalComponent } from './transaction-category-deleting-modal.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesTransactionCategoriesService } from '../../pages-transaction-categories.service';
import { ITransactionCategoryDeletingModalData } from './transaction-category-deleting-modal.types';
import { MaterialModule } from 'src/app/material.module';

describe('TransactionCategoryDeletingModalComponent', () => {
  let component: TransactionCategoryDeletingModalComponent;
  let fixture: ComponentFixture<TransactionCategoryDeletingModalComponent>;
  let pagesTransactionCategoriesServiceMock: SpyObj<PagesTransactionCategoriesService>;
  let categoriesSubject: Subject<TransactionCategory[]>;
  let systemNotificationsServiceMock: SpyObj<SystemNotificationsService>;
  let dialogDataMock: ITransactionCategoryDeletingModalData;

  beforeEach(async () => {
    categoriesSubject = new Subject<TransactionCategory[]>();

    dialogDataMock = {
      headerText: 'Deleting category',
      confirmationText: '',
      confirmBtnText: 'Delete',
      denyBtnText: 'Cancel',
    };

    systemNotificationsServiceMock = createSpyObj<SystemNotificationsService>
    (SystemNotificationsService.name, [ 'showNotification' ]);
    
    pagesTransactionCategoriesServiceMock = createSpyObj<PagesTransactionCategoriesService>
    (PagesTransactionCategoriesService.name, [ 'getCategories' ]);
    pagesTransactionCategoriesServiceMock.getCategories.and.returnValue(categoriesSubject.asObservable());

    await TestBed.configureTestingModule({
      declarations: [ TransactionCategoryDeletingModalComponent ],
      imports: [
        MaterialModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dialogDataMock },
        { provide: PagesTransactionCategoriesService, useValue: pagesTransactionCategoriesServiceMock },
        { provide: SystemNotificationsService, useValue: systemNotificationsServiceMock },
      ], 
    })
      .compileComponents();

    fixture = TestBed.createComponent(TransactionCategoryDeletingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
