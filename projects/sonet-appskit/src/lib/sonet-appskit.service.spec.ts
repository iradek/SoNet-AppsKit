import { TestBed } from '@angular/core/testing';

import { SonetAppskitService } from './sonet-appskit.service';

describe('SonetAppskitService', () => {
  let service: SonetAppskitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SonetAppskitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
