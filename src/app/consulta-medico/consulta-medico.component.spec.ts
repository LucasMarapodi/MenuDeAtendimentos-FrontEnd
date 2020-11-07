import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaMedicoComponent } from './consulta-medico.component';

describe('ConsultaMedicoComponent', () => {
  let component: ConsultaMedicoComponent;
  let fixture: ComponentFixture<ConsultaMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
