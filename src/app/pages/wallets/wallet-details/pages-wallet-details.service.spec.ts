import { TestBed } from '@angular/core/testing';

import { PagesWalletDetailsService } from './pages-wallet-details.service';

describe('PagesWalletDetailsService', () => {
  let service: PagesWalletDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagesWalletDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
