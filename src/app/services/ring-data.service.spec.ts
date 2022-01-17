import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RingDataService } from './ring-data.service';

describe('RingDataService', () => {
  let service: RingDataService;
  const initialState = { loggedIn: false };
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        provideMockStore({ initialState }),
        
      ]
    });
    service = TestBed.inject(RingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
