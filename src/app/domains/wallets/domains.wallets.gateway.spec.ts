import { getTestBed, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DomainsWalletsGateway } from './domains.wallets.gateway';
import { IWalletApiResponse } from './domains.wallets.types';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

describe('DomainsWalletsGateway', () => {
  let service: DomainsWalletsGateway;
  let walletResp: IWalletApiResponse[];
  let mockService: any;
  let httpMock: HttpTestingController;

  beforeEach( () => {
    walletResp = [{ name: 'Wallet 1', creationDate: '2022-10-22T09:47:52.595721658Z', id: 1, }];

    mockService = createSpyObj(DomainsWalletsGateway.name, ['getWallets']);
    mockService.getWallets.and.returnValue(of(walletResp));

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        { provide: DomainsWalletsGateway, useValue: mockService }

      ],
    }).compileComponents();

    httpMock = getTestBed().get(HttpClientTestingModule);
    service = TestBed.inject(DomainsWalletsGateway);


  });

  describe('getWallets', () => {

    it('should getWallets method be called', () => {
        mockService.getWallets();
        expect(mockService.getWallets).toHaveBeenCalledTimes(1);
    });

    it('should getWallets method return wallets', (done) => {
        mockService.getWallets();

        mockService.getWallets().subscribe((val: any) => {
            expect(val).toEqual(walletResp);

            done();
        });
    });
  });

});