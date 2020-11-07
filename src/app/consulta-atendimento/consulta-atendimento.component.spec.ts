import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaAtendimentoComponent } from './consulta-atendimento.component';

describe('ConsultaAtendimentoComponent', () => {
  let component: ConsultaAtendimentoComponent;
  let fixture: ComponentFixture<ConsultaAtendimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaAtendimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
