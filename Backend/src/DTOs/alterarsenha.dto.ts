import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { DadoEmBrancoError } from "src/excepts/DadoEmBrancoError";
import { SenhaPequenaError } from "src/excepts/SenhaPequenaError";

export class AlterarSenhaDTO {

  @ApiProperty()
  @IsString()
  senhaAtual: string

  @ApiProperty()
  @IsString()
  novaSenha: string

  validarDados() {
    this.senhaAtual = this.senhaAtual.trim();
    this.novaSenha = this.novaSenha.trim();

    switch (true) {
      case (this.senhaAtual.length === 0):
        throw new DadoEmBrancoError("A senha atual");
      case (this.senhaAtual.length <= 5 || this.novaSenha.length <= 5):
        throw new SenhaPequenaError();
      case (this.novaSenha.length === 0):
        throw new DadoEmBrancoError("A nova senha");
    }
  }
}