import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator"
import { DadoEmBrancoError } from 'src/excepts/DadoEmBrancoError';
import { NaoEhEmailError } from "src/excepts/NaoEhEmailError";
import { SenhaPequenaError } from 'src/excepts/SenhaPequenaError';
import { isEmail } from 'validator';
import { cpf } from 'cpf-cnpj-validator';
import { NaoEhCpfError } from "src/excepts/NaoEhCpfError";
import { log } from "console";

export class NovoUsuarioDTO {

  @ApiProperty()
  @IsString({message: "O nome deve ser do tipo string"})
  nome: string

  @ApiProperty()
  @IsString({message: "A matricula deve ser do tipo string"})
  matricula: string

  @ApiProperty()
  @IsString({message: "O CPF deve ser do tipo string"})
  cpf: string

  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty({
    description: "Deve possuir no mínimo 5 caracteres (espaços no inicio e no final são desconsiderados)"
  })
  @IsString({message: "A senha deve ser do tipo string"})
  senha: string

  @ApiProperty({
    description: "Essa URL deve ser o caminho para a tela de finalização de criação de conta. A tela de finalização de conta deve mandar uma requisição para o endpoint de finalização de conta que irá retornar sucesso ou fracasso e em caso de sucesso deve exibir o texto e um botão de redirecionamento para a tela de login."
  })
  @IsString({message: "A URL deve ser do tipo string"})
  URLFinalizarCriacao: String

  validarDados() {
    this.nome = this.nome.trim();
    this.matricula = this.matricula.trim();
    this.cpf = this.cpf.trim();
    this.cpf = cpf.format(this.cpf);
    this.email = this.email.trim();
    this.senha = this.senha.trim();
    this.URLFinalizarCriacao = this.URLFinalizarCriacao.trim();


    switch (true) {
      case (this.nome.length === 0):
        throw new DadoEmBrancoError("O nome");

      case (this.matricula.length === 0):
        throw new DadoEmBrancoError("A matricula");

      case (this.cpf.length === 0):
        throw new DadoEmBrancoError("O cpf");

      case (!cpf.isValid(this.cpf)):
        throw new NaoEhCpfError(this.cpf);

      case (this.email.length === 0):
        throw new DadoEmBrancoError("O email");

      case (!isEmail(this.email)):
        throw new NaoEhEmailError(this.email);

      case (this.senha.length === 0):
        throw new DadoEmBrancoError("A senha");

      case (this.senha.length <= 5):
        throw new SenhaPequenaError();

    }
  }
}