import { TestBed } from '@angular/core/testing';

import { CartPanel } from './cart-panel';

describe('CartPanel', () => {
  let service: CartPanel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartPanel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
