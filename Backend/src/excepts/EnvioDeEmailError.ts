import { HttpException } from "@nestjs/common";

export class EnvioDeEmailError extends HttpException {

  constructor() {
    super({
      message: `Falha ao enviar email`,
      statusCode: 500,
    }, 503);
  }

  toString() {
    return `{
      message: Falha ao enviar email,
      statusCode: 500
    }`;
  }

}