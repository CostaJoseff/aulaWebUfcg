export class NaoEhEmailError extends Error {
    public readonly nome: string;
    public readonly statusCode: number;
  
    constructor(email: string) {
      super(`${email} não é aceito como e-mail.`);
      this.nome = "Bad Request";
      this.statusCode = 400;
    }

    toString() {
      return `{
        message: X não é aceito como e-mail.,
        statusCode: 400
      }`;
    }
  }