import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorridaLista } from './corrida-lista';

describe('CorridaLista', () => {
  let component: CorridaLista;
  let fixture: ComponentFixture<CorridaLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorridaLista],
    }).compileComponents();

    fixture = TestBed.createComponent(CorridaLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
