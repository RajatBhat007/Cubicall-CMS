import { TestBed } from '@angular/core/testing';

import { FormSharingService } from './form-sharing.service';

describe('FormSharingService', () => {
  let service: FormSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
