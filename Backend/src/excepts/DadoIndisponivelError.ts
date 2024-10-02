import { HttpException } from "@nestjs/common";

export class DadoIndisponivelError extends HttpException {

  constructor(dadoIndisponivel: string) {
    super({
      message: `${dadoIndisponivel} informado não está disponível.`,
      statusCode: 409,
      dadoIndisponivel
    }, 409);
  }

  toString() {
    return `{
      message: X informado não está disponível.,
      statusCode: 409,
      dadoIndisponível: cpf
    }`
  }
}


