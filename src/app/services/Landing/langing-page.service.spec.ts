import { TestBed } from '@angular/core/testing';

import { LangingPageService } from './langing-page.service';

describe('LangingPageService', () => {
  let service: LangingPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LangingPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
