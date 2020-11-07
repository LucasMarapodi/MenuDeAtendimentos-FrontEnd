import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-consulta-atendimento',
  templateUrl: './consulta-atendimento.component.html',
  styleUrls: ['./consulta-atendimento.component.css']
})
export class ConsultaAtendimentoComponent implements OnInit {

  mensagemSucessoExclusao: string;
  listagemDeAtendimentos = [];
  mensagemSucessoEdicao: string;
  mensagemErroEdicao: string;
  errosLocal = [];
  errosDataAtendimento = [];
  errosObservacoes = [];
  errosIdAtendimento = [];
  errosIdPaciente = [];
  errosIdMedico = [];
  pacientes = [];
  medicos = [];
  atendimentoEdicao = {
    idAtendimento: '',
    idMedico: '',
    idPaciente: '',
    local: '',
    observacoes: '',
    dataAtendimento: ''
  }

  constructor(private HttpClient: HttpClient) { }

  ngOnInit(): void {
    this.consultaAtendimentos();
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

  consultaAtendimentos() {

    this.HttpClient.get(environment.apiUrlAtendimento)
      .subscribe
      (
        (success: any[]) => {
          this.listagemDeAtendimentos = success;
        },
        e => {
          console.log(e);
        }
      )
  }

  excluirAtendimento(id) {
    if (window.confirm('Deseja Excluir Este Atendimento ?')) {
      this.HttpClient.delete(environment.apiUrlAtendimento + "/" + id, { responseType: 'text' })
        .subscribe(
          success => {
            this.mensagemSucessoExclusao = success;
            this.consultaAtendimentos();
          },
          e => {
            console.log(e);
          }
        )
    }
  }

  exibirAtendimento(item) {

    this.atendimentoEdicao = item;
    this.mensagemSucessoEdicao = "";
    this.mensagemErroEdicao = "";
    this.errosLocal = [];
    this.errosObservacoes = [];
    this.errosDataAtendimento = [];
    this.errosIdMedico = [];
    this.errosIdPaciente = [];
  }

  atualizarAtendimento(formcadastro) {
    this.mensagemSucessoEdicao = "";
    this.mensagemErroEdicao = "";
    this.errosLocal = [];
    this.errosObservacoes = [];
    this.errosDataAtendimento = [];
    this.errosIdMedico = [];
    this.errosIdPaciente = [];

    this.HttpClient.put(environment.apiUrlAtendimento, formcadastro.value, { responseType: 'text' })
      .subscribe(
        success => {
          this.mensagemSucessoEdicao = success;
          this.consultaAtendimentos;
        },
        e => {
          this.consultaAtendimentos();

          switch (e.status) {
            case 400:
              this.mensagemErroEdicao = "Ocorreram Erros na validação do formulario";

              var validations = JSON.parse(e.error);

              this.errosIdAtendimento = validations.errors.IdAtendimento;
              this.errosDataAtendimento = validations.errors.DataAtendimento;
              this.errosIdPaciente = validations.errors.IdPaciente;
              this.errosIdMedico = validations.errors.IdMedico;
              this.errosObservacoes = validations.errors.Observacoes;
              this.errosLocal = validations.errors.Local;

              break;

            case 403:
              this.mensagemErroEdicao = e.error;
              break;

            default:
              this.mensagemErroEdicao = e.error;
              break;
          }
        }
      )

  }

  limparMensagemSucessoEdicao() {
    this.mensagemSucessoEdicao = "";
  }
  limparMensagemErroEdicao() {
    this.mensagemErroEdicao = "";
  }
  limparMensagemSucessoExclusao() {
    this.mensagemSucessoExclusao = "";
  }
}
