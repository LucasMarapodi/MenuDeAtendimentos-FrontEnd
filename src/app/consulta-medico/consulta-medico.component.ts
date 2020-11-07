import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-consulta-medico',
  templateUrl: './consulta-medico.component.html',
  styleUrls: ['./consulta-medico.component.css']
})
export class ConsultaMedicoComponent implements OnInit {

  mensagemSucessoExclusao: string;
  listagemDeMedicos = [];
  mensagemSucessoEdicao: string;
  mensagemErroEdicao: string;
  mensagemErroExclusao: string;
  errosNome = [];
  errosEspecializacao = [];
  errosCrm = [];

  medicoEdicao = {
    idMedico: '',
    nome: '',
    crm: '',
    especializacao: ''
  }

  constructor(private HttpClient: HttpClient) { }

  ngOnInit(): void {
    this.consultaMedicos();
  }

  consultaMedicos() {

    this.HttpClient.get(environment.apiUrlMedico)
      .subscribe
      (
        (success: any[]) => {
          this.listagemDeMedicos = success;
        },
        e => {
          console.log(e);
        }
      )
  }

  exibirMedico(item) {
    this.medicoEdicao = item;
    this.mensagemSucessoEdicao = "";
    this.mensagemErroEdicao = "";
    this.errosNome = [];
    this.errosCrm = [];
    this.errosEspecializacao = [];
  }

  atualizarMedico(formCadastro) {
    this.mensagemSucessoEdicao = "";
    this.mensagemErroEdicao = "";
    this.errosNome = [];
    this.errosCrm = [];
    this.errosEspecializacao = [];

    this.HttpClient.put(environment.apiUrlMedico, formCadastro.value, { responseType: 'text' })
      .subscribe(
        success => {
          this.mensagemSucessoEdicao = success;
          this.consultaMedicos();
        },
        e => {
          this.consultaMedicos();

          switch (e.status) {
            case 400:
              this.mensagemErroEdicao = "Ocorreram Erros na validação do formulario";

              var validations = JSON.parse(e.error);

              this.errosNome = validations.errors.Nome;
              this.errosEspecializacao = validations.errors.Especializacao;
              this.errosCrm = validations.errors.Crm;

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

  excluirMedico(id) {
    if (window.confirm('Deseja Excluir Este Medico ?')) {
      this.HttpClient.delete(environment.apiUrlMedico + "/" + id, { responseType: 'text' })
        .subscribe(
          success => {
            this.mensagemSucessoExclusao = success;
            this.consultaMedicos();
          },
          e => {
            this.mensagemErroExclusao = e.error;
          }
        )
    }
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

  limparMensagemErroExclusao() {
    this.mensagemErroExclusao = "";
  }
}
