export class CodigoDeVerificacaoInvalidoError extends Error {
  public readonly nome: string;
  public readonly statusCode: number;

  constructor() {
    super(`O codigo de verificação não é válido.`);
    this.nome = "Unauthorized";
    this.statusCode = 401;
  }

  toString() {
    return `{
      message: O codigo de verificação não é válido.,
      statusCode: 401
    }`
  }
}