import { TestBed } from '@angular/core/testing';

import { StyleModeService } from './style-mode.service';

describe('StyleModeService', () => {
  let service: StyleModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StyleModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
