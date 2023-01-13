import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { PagesWalletsManagementComponent } from '../pages-wallets-management.component';
import { MaterialModule } from '../../../../material.module';
import { PagesWalletsManagementService } from '../pages-wallets-management.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { Subject } from 'rxjs';
import { WalletsManagementItem } from '../pages-wallets-wallets-management-item.model';
import { IWalletApiResponse } from '../../../../domains/wallets/domains.wallets.types';
import {
  WALLET_INSTANCE_MOCK,
  UPDATED_WALLET_INSTANCE_MOCK,
  WALLET_RESP_MOCK,
} from 'src/app/domains/wallets/domains.wallets.mocks';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { By } from '@angular/platform-browser';
import { SystemMessageComponent } from 'src/app/common/components/system-message/system-message.component';
import { ModalEditorService } from 'src/app/common/utils/modal/modal-editor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PagesWalletsManagementComponent', () => {
  let component: PagesWalletsManagementComponent;
  let fixture: ComponentFixture<PagesWalletsManagementComponent>;
  let myWalletsServiceMock: SpyObj<PagesWalletsManagementService>;
  let systemNotificationsServiceMock: SpyObj<SystemNotificationsService>;
  let walletResp: IWalletApiResponse;
  let walletsSubject: Subject<WalletsManagementItem[]>;
  let walletSubject: Subject<WalletsManagementItem>;
  let matEditorSubject: Subject<WalletsManagementItem | null>;
  let editorService: SpyObj<ModalEditorService>;

  beforeEach(async () => {
    walletsSubject = new Subject<WalletsManagementItem[]>();
    walletSubject = new Subject<WalletsManagementItem>();
    matEditorSubject = new Subject<WalletsManagementItem | null>();
    walletResp = WALLET_RESP_MOCK;

    editorService = createSpyObj<ModalEditorService>(ModalEditorService.name, ['openEditor']);
    editorService.openEditor.and.returnValue(matEditorSubject.asObservable());

    myWalletsServiceMock = createSpyObj<PagesWalletsManagementService>(PagesWalletsManagementService.name, [
      'getWallets',
      'createWallet',
      'updateWallet',
    ]);

    myWalletsServiceMock.getWallets.and.returnValue(walletsSubject.asObservable());
    myWalletsServiceMock.createWallet.and.returnValue(walletSubject.asObservable());
    myWalletsServiceMock.updateWallet.and.returnValue(walletSubject.asObservable());

    await TestBed.configureTestingModule({
      declarations: [
        PagesWalletsManagementComponent,
        SystemMessageComponent,
      ],
      imports: [ MaterialModule, BrowserAnimationsModule ],
      providers: [
        { provide: PagesWalletsManagementService, useValue: myWalletsServiceMock },
        { provide: SystemNotificationsService, useValue: systemNotificationsServiceMock },
        { provide: ModalEditorService, useValue: editorService },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PagesWalletsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    describe('getting my wallets', () => {
      describe('success', () => {
        it('should get my wallets', () => {
          walletsSubject.next([ new WalletsManagementItem(walletResp) ]);

          expect(component.myWalletsData.data).toEqual([ new WalletsManagementItem(walletResp) ]);
        });
      });

      describe('error', () => {
        it('should set error state to false when get my wallets throws fail', () => {
          walletsSubject.error('error');

          expect(component.myWalletsData.data).toEqual(null);
          expect(component.myWalletsData.hasError).toEqual(true);
        });

        it('should display notification container when get my wallets throws fail', () => {
          const debugElement = fixture.debugElement;
          walletsSubject.error('error');

          fixture.detectChanges();

          const notificationContainer = debugElement.query(By.css('.message-container'));
          expect(notificationContainer.nativeElement).toBeTruthy();
        });
      });
    });
  });

  describe('handleWalletEdit', () => {
    beforeEach(() => {
      component.myWalletsData.data = [
        WALLET_INSTANCE_MOCK,
      ];
    });

    describe('success', () => {
      it('should update wallet\'s name', fakeAsync(() => {
        component.handleWalletEdit(WALLET_INSTANCE_MOCK);
        matEditorSubject.next(UPDATED_WALLET_INSTANCE_MOCK);
        flushMicrotasks();
        expect(component.myWalletsData.data!.length).toEqual(1);
        expect(component.myWalletsData.data![0].name).toBe(UPDATED_WALLET_INSTANCE_MOCK.name);
      }));
    });

    describe('canceled', () => {
      it('myWalletsData should stay untouched', fakeAsync(() => {
        component.handleWalletEdit(WALLET_INSTANCE_MOCK);
        matEditorSubject.next(null);
        flushMicrotasks();

        expect(component.myWalletsData.data!.length).toBe(1);
        expect(component.myWalletsData.data![0].name).toBe(WALLET_INSTANCE_MOCK.name);
      }));
    });
  });

  describe('handleWalletCreate', () => {
    beforeEach(() => {
      component.myWalletsData.data = [];
    });

    describe('success', () => {
      it('should add new wallet to myWalletData.data', fakeAsync(() => {
        component.handleWalletCreate();
        matEditorSubject.next(new WalletsManagementItem(WALLET_RESP_MOCK));
        flushMicrotasks();

        expect(component.myWalletsData.data!.length).toBe(1);
      }));
    });

    describe('canceled', () => {
      it('myWalletsData should stay untouched', fakeAsync(() => {
        component.handleWalletCreate();
        matEditorSubject.next(null);
        flushMicrotasks();

        expect(component.myWalletsData.data!.length).toBe(0);
      }));
    });
  });
});
