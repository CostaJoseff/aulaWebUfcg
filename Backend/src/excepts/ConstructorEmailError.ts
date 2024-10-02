import { HttpException } from "@nestjs/common";

export class ConstructorEmailError extends HttpException {

  constructor() {
    super({
      message: `Serviço de email indisponível`,
      statusCode: 503,
    }, 503);
  }

  toString() {
    return `{
      message: Serviço de email indisponível,
      statusCode: 503
    }`;
  }
}