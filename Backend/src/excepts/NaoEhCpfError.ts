export class NaoEhCpfError extends Error {
    public readonly nome: string;
    public readonly statusCode: number;
  
    constructor(cpf: string) {
      super(`${cpf} não é aceito como cpf.`);
      this.nome = "Bad Request";
      this.statusCode = 400;
    }

    toString() {
      return `{
        message: X não é aceito como cpf,
        statusCode: 400,
      }`
    }
  }