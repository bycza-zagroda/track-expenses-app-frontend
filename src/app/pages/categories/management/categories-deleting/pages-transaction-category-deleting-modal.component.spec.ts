import { Subject } from 'rxjs';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { TransactionCategory } from '../../transaction-category.model';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

import { PagesTransactionCategoryDeletingModalComponent } from './pages-transaction-category-deleting-modal.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesTransactionCategoriesService } from '../../pages-transaction-categories.service';
import { MaterialModule } from 'src/app/material.module';
import { TransactionCategoryFull } from '../../transaction-category-full.model';

describe('TransactionCategoryDeletingModalComponent', () => {
  let component: PagesTransactionCategoryDeletingModalComponent;
  let fixture: ComponentFixture<PagesTransactionCategoryDeletingModalComponent>;
  let pagesTransactionCategoriesServiceMock: SpyObj<PagesTransactionCategoriesService>;
  let categoriesSubject: Subject<TransactionCategory[]>;
  let categorySubject: Subject<TransactionCategoryFull>;
  let systemNotificationsServiceMock: SpyObj<SystemNotificationsService>;

  beforeEach(async () => {
    categoriesSubject = new Subject<TransactionCategory[]>();
    categorySubject = new Subject<TransactionCategoryFull>();

    systemNotificationsServiceMock = createSpyObj<SystemNotificationsService>
    (SystemNotificationsService.name, [ 'showNotification' ]);
    
    pagesTransactionCategoriesServiceMock = createSpyObj<PagesTransactionCategoriesService>
    (PagesTransactionCategoriesService.name, [ 'getCategories', 'getTransactionCategoryById' ]);
    pagesTransactionCategoriesServiceMock.getCategories.and.returnValue(categoriesSubject.asObservable());
    pagesTransactionCategoriesServiceMock.getTransactionCategoryById.and.returnValue(categorySubject.asObservable());

    await TestBed.configureTestingModule({
      declarations: [ PagesTransactionCategoryDeletingModalComponent ],
      imports: [
        MaterialModule,
      ],
      providers: [
        { provide: PagesTransactionCategoriesService, useValue: pagesTransactionCategoriesServiceMock },
        { provide: SystemNotificationsService, useValue: systemNotificationsServiceMock },
      ], 
    })
      .compileComponents();

    fixture = TestBed.createComponent(PagesTransactionCategoryDeletingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
