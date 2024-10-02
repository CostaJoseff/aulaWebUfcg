"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PomboCorreio = exports.OperacaoAtiva = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv = __importStar(require("dotenv"));
class OperacaoAtiva {
    static gerarCodigoDeVerificacao(totDigitos) {
        let resultado = "";
        for (let i = 0; i < totDigitos; i++) {
            resultado += Math.floor(Math.random() * 10);
        }
        return resultado;
    }
}
exports.OperacaoAtiva = OperacaoAtiva;
class PomboCorreio {
    static enviarEmail(destino, assunto, texto) {
        dotenv.config();
        let transportador = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
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
            console.log('enviado');
        });
    }
}
exports.PomboCorreio = PomboCorreio;
//# sourceMappingURL=Util.js.map