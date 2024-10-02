export class SenhasDiferentesError extends Error {
  public readonly nome: string;
  public readonly statusCode: number;

  constructor() {
    super("A senha atual informada não confere com a senha atual registrada");
    this.nome = "Bad Request";
    this.statusCode = 400;
  }

  toString() {
    return `{
      message: A senha atual informada não confere com a senha atual registrada,
      statusCode: 400
    }`
  }
}