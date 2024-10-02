export class SolicitacaoExpirouError extends Error {
  public readonly nome: string;
  public readonly statusCode: number;

  constructor() {
    super(`A solicitação expirou, o token não é mais válido.`);
    this.nome = "Unauthorized";
    this.statusCode = 401;
  }

  toString() {
    return `{
      message: A solicitação expirou, o token não é mais válido,
      statusCode: 401
    }`
  }
}