import { TestBed } from '@angular/core/testing';

import { VendorCreditNoteService } from './vendor-credit-note.service';

describe('VendorCreditNoteService', () => {
  let service: VendorCreditNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorCreditNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
