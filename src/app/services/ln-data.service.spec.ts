import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LnDataService } from './ln-data.service';

describe('LnDataService', () => {
  let service: LnDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(LnDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
