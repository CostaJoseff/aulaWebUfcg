import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { log } from 'console';

export class OperacaoAtiva {

  static gerarCodigoDeVerificacao(totDigitos: number) {
    let resultado = "";
    for (let i = 0; i < totDigitos; i++) {
      resultado += Math.floor(Math.random() * 10);
    }

    return resultado;
  }
}

export class PomboCorreio {

  static enviarEmail(destino: string, assunto: string, texto: string){
    dotenv.config();
    let transportador = nodemailer.createTransport(
      {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      }
    )

    let opcoes = {
      from: process.env.EMAIL_USER,
      to: destino,
      subject: assunto,
      text: texto
    };

    transportador.sendMail(opcoes, (error, _) => {
      if (error) {
        return console.log(error);
      }
      console.log('enviado')
    })

  }
}