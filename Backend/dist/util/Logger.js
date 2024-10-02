"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    constructor() {
        this.reset = "\x1b[0m";
        this.yellow = "\x1b[33m";
        this.red = "\x1b[31m";
        this.green = "\x1b[32m";
        this.blue = "\x1b[34m";
        this.white = "\x1b[37m";
        this.redBg = "\x1b[41m";
        this.blueBg = "\x1b[44m";
    }
    print(evento, usuario) {
        const log = `\nMatricula: ${usuario}$ - ${this.obterData()} | ${evento}`;
        process.stdout.write(log);
    }
    erro(evento, usuario) {
        const log = `\n${this.red}Matricula: ${usuario}${this.reset} - ${this.obterData()} | ${this.red}${evento}${this.reset}`;
        process.stderr.write(log);
    }
    sucesso(evento, usuario) {
        const log = `\n${this.green}Matricula: ${usuario}${this.reset} - ${this.obterData()} | ${this.green}${(evento)}${this.reset}`;
        process.stdout.write(log);
    }
    alerta(evento, usuario) {
        const log = `\n${this.yellow}Matricula: ${usuario}${this.reset} - ${this.obterData()} | ${this.yellow}${evento}${this.reset}`;
        process.stdout.write(log);
    }
    perigo(evento, usuario) {
        const log = `\n${this.white}${this.redBg} PERIGO - Matricula: ${usuario}${this.reset} - ${this.obterData()} | ${this.white}${this.redBg}${evento}${this.reset}`;
        process.stdout.write(log);
    }
    sistema(evento) {
        const log = `\n${this.yellow}SISTEMA: ${this.reset}${this.obterData()} | ${this.yellow}${evento}${this.reset}`;
        process.stdout.write(log);
    }
    obterData() {
        const agora = new Date();
        const dia = agora.getDate();
        const mes = agora.getMonth() + 1;
        const ano = agora.getFullYear();
        const hora = agora.getHours();
        const minuto = agora.getMinutes();
        const segundo = agora.getSeconds();
        return `${this.blue}[${dia}/${mes}/${ano} - ${hora}:${minuto}:${segundo}]${this.reset}`;
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map