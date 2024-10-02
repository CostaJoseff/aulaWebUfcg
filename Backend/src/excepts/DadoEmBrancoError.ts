import { HttpException } from "@nestjs/common";

export class DadoEmBrancoError extends HttpException {

  constructor(dadoEmBranco: string) {
    super({
      message: `${dadoEmBranco} não pode estar em branco.`,
      statusCode: 400,
      dadoEmBranco: dadoEmBranco.split(" ").length === 2 ? dadoEmBranco.split(" ")[1] : dadoEmBranco
    }, 400);
  }

  toString() {
    return `{
      message: X não pode estar em branco,
      statusCode: 400,
      dadoEmBranco: X
    }`;
  }

}