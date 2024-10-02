import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { DadoEmBrancoError } from 'src/excepts/DadoEmBrancoError';

export class VerificarCodigoEmailDTO {

  @ApiProperty()
  @IsString({message: ""})
  token: string;

  @ApiProperty()
  @IsString({message: ""})
  codigoVerificacao: string;


  validarDados() {
    this.token = this.token.trim();
    this.codigoVerificacao = this.codigoVerificacao.trim();

    if (this.token.length === 0) {
      throw new DadoEmBrancoError("O token");
    }
    if (this.codigoVerificacao.length === 0) {
      throw new DadoEmBrancoError("O codigo de verificação");
    }
  }
}