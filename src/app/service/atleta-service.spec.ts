import { TestBed } from '@angular/core/testing';

import { Atleta } from './atleta-service';

describe('Atleta', () => {
  let service: Atleta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Atleta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
