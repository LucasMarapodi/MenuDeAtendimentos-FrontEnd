import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.css']
})
export class CadastroPacienteComponent implements OnInit {

  mensagemProcessamento: string;
  mensagemSucesso: string;
  mensagemErro: string;
  errosNome = [];
  errosEmail = [];
  errosCpf = [];
  errosTelefone = [];
  errosDataNascimento = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  cadastrarPaciente(formCadastro) {
    this.mensagemProcessamento = "Processando requisição,por favor aguarde...";
    this.mensagemSucesso = "";
    this.mensagemErro = "";
    this.errosNome = [];
    this.errosEmail = [];
    this.errosCpf = [];
    this.errosTelefone = [];
    this.errosDataNascimento = [];

    this.httpClient.post(environment.apiUrlPaciente, formCadastro.value, { responseType: 'text' })
      .subscribe(
        success => {
          this.mensagemProcessamento = "";
          this.mensagemSucesso = success;
          formCadastro.reset();
        },
        e => {
          this.mensagemProcessamento = "";

          switch (e.status) {
            case 400:
              this.mensagemErro = "Ocorreram Erros na Validação do Formulario.";

              var validations = JSON.parse(e.error);

              this.errosNome = validations.errors.Nome;
              this.errosCpf = validations.errors.Cpf;
              this.errosEmail = validations.errors.Email;
              this.errosDataNascimento = validations.errors.DataNascimento;
              this.errosTelefone = validations.errors.Telefone;

              break;
            case 403:
              this.mensagemErro = e.error;
              break;

            default: //nenhum dos anteriores
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
