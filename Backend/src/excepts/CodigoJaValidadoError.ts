export class CodigoJaValidadoError extends Error {
    public readonly nome: string;
    public readonly statusCode: number;
  
    constructor() {
      super(`O codigo de verificação já foi validado. A operação de finalização já foi liberada`);
      this.nome = "Forbidden";
      this.statusCode = 403;
    }

    toString() {
      return `{
        message: O codigo de verificação já foi validado. A operação de finalização já foi liberada,
        statusCode: 403
      }`
    }
  }