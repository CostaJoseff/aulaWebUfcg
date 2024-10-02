export class CodigoNaoValidadoError extends Error {
    public readonly nome: string;
    public readonly statusCode: number;
  
    constructor() {
      super(`O codigo de verificação não foi validado.`);
      this.nome = "Forbidden";
      this.statusCode = 403;
    }

    toString() {
      return `{
        message: O codigo de verificação não foi validado,
        statusCode: 403
      }`
    }
  }