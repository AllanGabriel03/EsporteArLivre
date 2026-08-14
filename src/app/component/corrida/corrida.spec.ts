import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Corrida } from './corrida';

describe('Corrida', () => {
  let component: Corrida;
  let fixture: ComponentFixture<Corrida>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Corrida],
    }).compileComponents();

    fixture = TestBed.createComponent(Corrida);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
