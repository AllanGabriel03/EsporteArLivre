import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Atleta } from './atleta';

describe('Atleta', () => {
  let component: Atleta;
  let fixture: ComponentFixture<Atleta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Atleta],
    }).compileComponents();

    fixture = TestBed.createComponent(Atleta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
