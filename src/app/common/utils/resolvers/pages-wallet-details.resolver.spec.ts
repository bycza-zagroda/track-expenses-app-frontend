import { TestBed } from '@angular/core/testing';

import { PagesWalletDetailsResolver } from './pages-wallet-details.resolver';

describe('PagesWalletDetailsResolver', () => {
  let resolver: PagesWalletDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PagesWalletDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
