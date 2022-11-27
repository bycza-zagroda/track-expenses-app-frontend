import { TestBed } from '@angular/core/testing';
import { PagesWalletsMyWalletsService } from './pages-wallets-my-wallets.service';
import SpyObj = jasmine.SpyObj;
import { DomainsWalletsGateway } from '../../../domains/wallets/domains.wallets.gateway';
import createSpyObj = jasmine.createSpyObj;
import { of } from 'rxjs';
import { MyWallet } from './pages-wallets-my-wallet.model';
import { IWalletApiResponse } from '../../../domains/wallets/domains.wallets.types';

describe('PagesWalletsMyWalletsService', () => {
  let service: PagesWalletsMyWalletsService;
  let gatewayMock: SpyObj<DomainsWalletsGateway>;
  let walletResp: IWalletApiResponse;

  let walletRespForCreate: IWalletApiResponse;
  let walletCreatePayload: Partial<IWalletApiResponse>;
  let createdWalletFromPayload: MyWallet;

  let walletRespForUpdate: IWalletApiResponse;
  let walletUpdatePayload: Partial<IWalletApiResponse>;
  let updatedWalletFromPayload: MyWallet;

  beforeEach(async () => {
    walletResp = { creationDate: '2022-10-22T09:47:52.595721658Z', id: 12, name: 'wallet1' };
    gatewayMock = createSpyObj(DomainsWalletsGateway.name, ['getWallets', 'createWallet', 'updateWallet']);

    walletCreatePayload = { id: 15, name: 'Wallet 5' };
    walletRespForCreate = { creationDate: '2022-10-22T09:47:52.595721658Z', id: 15, name: 'wallet1' };
    createdWalletFromPayload = MyWallet.create(walletCreatePayload);

    walletUpdatePayload = { id: 15, name: 'Wallet 5', creationDate: '2022-10-22T09:47:52.595721658Z' };
    walletRespForUpdate = { creationDate: '2022-10-22T09:47:52.595721658Z', id: 15, name: 'wallet1' };
    updatedWalletFromPayload = MyWallet.create(walletUpdatePayload);

    gatewayMock.getWallets.and.returnValue(of([walletResp]));
    gatewayMock.createWallet.and.returnValue(of(walletRespForCreate));
    gatewayMock.updateWallet.and.returnValue(of(walletRespForUpdate));

    await TestBed.configureTestingModule({
      providers: [
        PagesWalletsMyWalletsService,
        { provide: DomainsWalletsGateway, useValue: gatewayMock },
      ],
    }).compileComponents();

    service = TestBed.inject(PagesWalletsMyWalletsService);
  });

  describe('getMyWallets', () => {
    it('should return my wallets', (done) => {
      service.getMyWallets().subscribe(val => {
        expect(val).toEqual([new MyWallet(walletResp)]);

        done();
      })
    });
  });

  describe('createWallet', () => {

    it('should create new wallet', (done) => {
      service.createWallet(createdWalletFromPayload).subscribe((val: MyWallet) => {
        expect(val).toEqual(new MyWallet(walletRespForCreate));

        done();
      })
    });
  });

  describe('updateWallet', () => {
    it('should update my wallet', (done) => {
      service.updateWallet(updatedWalletFromPayload).subscribe(val => {
        expect(val).toEqual(new MyWallet(walletRespForUpdate));

        done();
      })
    });
  });
});
