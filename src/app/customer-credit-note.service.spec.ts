import { TestBed } from '@angular/core/testing';

import { CustomerCreditNoteService } from './customer-credit-note.service';

describe('CustomerCreditNoteService', () => {
  let service: CustomerCreditNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerCreditNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
