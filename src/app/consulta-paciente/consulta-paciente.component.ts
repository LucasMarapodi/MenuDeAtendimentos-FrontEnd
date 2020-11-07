import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-consulta-paciente',
  templateUrl: './consulta-paciente.component.html',
  styleUrls: ['./consulta-paciente.component.css']
})
export class ConsultaPacienteComponent implements OnInit {

  mensagemSucessoExclusao: string;
  listagemDePacientes = [];
  mensagemSucessoEdicao: string;
  mensagemErroEdicao: string;
  mensagemErroExclusao: string;
  errosNome = [];
  errosEmail = [];
  errosCpf = [];
  errosTelefone = [];
  errosDataNascimento = [];
  pacienteEdicao = {
    idPaciente: '',
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    dataNascimento: ''
  }

  constructor(private HttpClient: HttpClient) { }

  ngOnInit(): void {
    this.consultaPacientes();
  }

  consultaPacientes() {

    this.HttpClient.get(environment.apiUrlPaciente)
      .subscribe
      (
        (success: any[]) => {
          this.listagemDePacientes = success;
        },
        e => {
          console.log(e);
        }
      )
  }
  excluirPaciente(id) {
    if (window.confirm('Deseja Excluir Este Atendimento ?')) {
      this.HttpClient.delete(environment.apiUrlPaciente + "/" + id, { responseType: 'text' })
        .subscribe(
          success => {
            this.mensagemSucessoExclusao = success;
            this.consultaPacientes();
          },
          e => {
            this.mensagemErroExclusao = e.error;
          }
        )
    }
  }

  exibirPaciente(item) {
    this.pacienteEdicao = item;
    this.mensagemSucessoEdicao = "";
    this.mensagemErroEdicao = "";
    this.errosNome = [];
    this.errosEmail = [];
    this.errosCpf = [];
    this.errosTelefone = [];
    this.errosDataNascimento = [];
  }

  atualizarPaciente(formCadastro) {
    this.mensagemSucessoEdicao = "";
    this.mensagemErroEdicao = "";
    this.errosNome = [];
    this.errosEmail = [];
    this.errosCpf = [];
    this.errosTelefone = [];
    this.errosDataNascimento = [];

    this.HttpClient.put(environment.apiUrlPaciente, formCadastro.value, { responseType: 'text' })
      .subscribe(
        success => {
          this.mensagemSucessoEdicao = success;
          this.consultaPacientes();
        },
        e => {
          this.consultaPacientes();

          switch (e.status) {
            case 400:
              this.mensagemErroEdicao = "Ocorreram Erros na validação do Formulario.";

              var validations = JSON.parse(e.error);

              this.errosNome = validations.errors.Nome;
              this.errosEmail = validations.errors.Email;
              this.errosCpf = validations.errors.Cpf;
              this.errosTelefone = validations.errors.Telefone;
              this.errosDataNascimento = validations.errors.DataNascimento;


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

  limparMensagemSucessoExclusao() {
    this.mensagemSucessoExclusao = "";
  }
  limparMensagemErroEdicao() {
    this.mensagemErroEdicao = "";
  }
  limparMensagemSucessoEdicao() {
    this.mensagemSucessoEdicao = "";
  }
  limparMensagemErroExclusao() {
    this.mensagemErroExclusao = "";
  }
}
