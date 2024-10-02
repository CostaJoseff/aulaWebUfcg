export class UsuarioNaoExisteError extends Error {
  public readonly nome: string;
  public readonly statusCode: number;

  constructor() {
    super("Usuário não encontrado");
    this.nome = "Not found";
    this.statusCode = 404;
  }

  toString() {
    return `{
      message: Usuário não encontrado,
      statusCode: 404
    }`
  }
}