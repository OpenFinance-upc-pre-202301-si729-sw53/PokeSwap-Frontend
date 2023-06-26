import { TestBed } from '@angular/core/testing';

import { DataConfigService } from './data-config.service';

describe('DataConfigService', () => {
  let service: DataConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
