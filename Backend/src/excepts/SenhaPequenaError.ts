export class SenhaPequenaError extends Error {
  public readonly nome: string;
  public readonly statusCode: number;

  constructor() {
    super("A senha deve ter mais de 5 dígitos.");
    this.nome = "Bad Request";
    this.statusCode = 400;
  }

  toString() {
    return `{
      message: A senha deve ter mais de 5 dígitos.,
      statusCode: 400
    }`
  }
}