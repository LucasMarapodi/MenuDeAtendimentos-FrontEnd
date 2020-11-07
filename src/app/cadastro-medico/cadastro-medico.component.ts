import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-cadastro-medico',
  templateUrl: './cadastro-medico.component.html',
  styleUrls: ['./cadastro-medico.component.css']
})
export class CadastroMedicoComponent implements OnInit {

  mensagemProcessamento: string;
  mensagemSucesso: string;
  mensagemErro: string;
  errosNome = [];
  errosEspecializacao = [];
  errosCrm = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  cadastrarMedico(formCadastro) {
    this.mensagemProcessamento = "Processando requisição,por favor aguarde...";
    this.mensagemSucesso = "";
    this.mensagemErro = "";
    this.errosNome = [];
    this.errosEspecializacao = [];
    this.errosCrm = [];

    this.httpClient.post(environment.apiUrlMedico, formCadastro.value, { responseType: 'text' })
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
              this.errosEspecializacao = validations.errors.Especializacao;
              this.errosCrm = validations.errors.Crm;

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
