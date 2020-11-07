import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CadastroMedicoComponent } from './cadastro-medico/cadastro-medico.component';
import { ConsultaMedicoComponent } from './consulta-medico/consulta-medico.component';

import { RouterModule, Routes } from '@angular/router';
import { CadastroPacienteComponent } from './cadastro-paciente/cadastro-paciente.component';
import { ConsultaPacienteComponent } from './consulta-paciente/consulta-paciente.component';
import { CadastroAtendimentoComponent } from './cadastro-atendimento/cadastro-atendimento.component';
import { ConsultaAtendimentoComponent } from './consulta-atendimento/consulta-atendimento.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cadastrar-medicos', component: CadastroMedicoComponent },
  { path: 'consultar-medicos', component: ConsultaMedicoComponent },
  { path: 'cadastrar-pacientes', component: CadastroPacienteComponent },
  { path: 'consultar-pacientes', component: ConsultaPacienteComponent },
  { path: 'cadastrar-atendimentos', component: CadastroAtendimentoComponent },
  { path: 'consultar-atendimentos', component: ConsultaAtendimentoComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    CadastroMedicoComponent,
    ConsultaMedicoComponent,
    CadastroPacienteComponent,
    ConsultaPacienteComponent,
    CadastroAtendimentoComponent,
    ConsultaAtendimentoComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
