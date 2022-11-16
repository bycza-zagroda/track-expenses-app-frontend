import { TestBed } from '@angular/core/testing';
import { DomainsWalletsGateway } from './domains.wallets.gateway';

describe('DomainsWalletsGateway', () => {
  let service: DomainsWalletsGateway;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        DomainsWalletsGateway,
      ],
    }).compileComponents();

    service = TestBed.inject(DomainsWalletsGateway);
  });

  describe('getWallets', () => {
    it('should return wallets', (done) => {
      service.getWallets().subscribe(val => {
        expect(val).toEqual([
          {
            name: 'Wallet 1',
            creationDate: '2022-10-22T09:47:52.595721658Z',
            id: 1,
          },
          {
            name: 'Wallet 2',
            creationDate: '2022-10-23T09:47:52.595721658Z',
            id: 2,
          },
          {
            name: 'Wallet 3',
            creationDate: '2022-10-24T09:47:52.595721658Z',
            id: 3,
          },
        ]);

        done();
      });
    });
  });
});
