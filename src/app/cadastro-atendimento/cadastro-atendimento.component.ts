import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-cadastro-atendimento',
  templateUrl: './cadastro-atendimento.component.html',
  styleUrls: ['./cadastro-atendimento.component.css']
})
export class CadastroAtendimentoComponent implements OnInit {

  mensagemErro: string;
  mensagemSucesso: string;
  mensagemProcessamento: string;
  errosLocal: [];
  errosDataAtendimento: [];
  errosIdPaciente: [];
  errosIdMedico: [];
  errosObservacoes: [];
  medicos = [];
  pacientes = [];

  constructor(private HttpClient: HttpClient) { }

  ngOnInit(): void {
    this.consultarPacientes();
    this.consultarMedicos();
  }

  consultarPacientes() {
    this.HttpClient.get(environment.apiUrlPaciente)
      .subscribe(
        (success: any[]) => {
          this.pacientes = success;
        },
        e => {
          console.log(e);
        }
      )
  }

  consultarMedicos() {
    this.HttpClient.get(environment.apiUrlMedico)
      .subscribe(
        (success: any[]) => {
          this.medicos = success;
        },
        e => {
          console.log(e);
        }
      )
  }

  cadastrarAtendimento(formCadastro) {

    this.mensagemProcessamento = "Processando requisição,por favor aguarde...";
    this.mensagemSucesso = "";
    this.mensagemErro = "";
    this.errosIdMedico = [];
    this.errosIdPaciente = [];
    this.errosObservacoes = [];
    this.errosIdMedico = [];
    this.errosLocal = [];

    this.HttpClient.post(environment.apiUrlAtendimento, formCadastro.value, { responseType: 'text' })
      .subscribe(
        sucess => {
          this.mensagemProcessamento = "";
          this.mensagemSucesso = sucess;
          formCadastro.reset();
        },
        e => {
          this.mensagemProcessamento = "";

          switch (e.status) {
            case 400:
              this.mensagemErro = "Ocorreram Erros na Validação do Formulario.";

              var validations = JSON.parse(e.error);

              this.errosDataAtendimento = validations.erros.DataAtendimento;
              this.errosIdMedico = validations.errors.IdMedico;
              this.errosObservacoes = validations.errors.Observacoes;
              this.errosIdPaciente = validations.errors.IdPaciente;
              this.errosLocal = validations.errors.Local;
              break;

            case 403:
              this.mensagemErro = e.error;
              break;

            default:
              this.mensagemErro = e.error;
              break;
          }
        }
      );
  }

  limparMensagemSucesso() {
    this.mensagemSucesso = "";
  }
  limparMensagemErro() {
    this.mensagemErro = "";
  }

}
