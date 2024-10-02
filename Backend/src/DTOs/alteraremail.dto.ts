import { ApiProperty } from "@nestjs/swagger"
import { isEmail, IsString } from "class-validator"
import { DadoEmBrancoError } from "src/excepts/DadoEmBrancoError"
import { NaoEhEmailError } from "src/excepts/NaoEhEmailError"
import { SenhaPequenaError } from "src/excepts/SenhaPequenaError"

export class AlterarEmailDTO {

  @ApiProperty()
  @IsString()
  senha: string

  @ApiProperty()
  @IsString()
  novoEmail: string

  @ApiProperty()
  @IsString()
  URLAlterarEmail: string

  validarDados() {
    this.senha = this.senha.trim();
    this.novoEmail = this.novoEmail.trim();

    switch (true) {
      case (this.senha.length === 0):
        throw new DadoEmBrancoError("A senha");
      case (this.senha.length <= 5):
        throw new SenhaPequenaError();
      case (!isEmail(this.novoEmail)):
        throw new NaoEhEmailError(this.novoEmail);
    }
  }

}