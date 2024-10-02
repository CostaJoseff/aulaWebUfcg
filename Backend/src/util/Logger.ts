

export class Logger {

    private reset = "\x1b[0m";
    private yellow = "\x1b[33m";
    private red = "\x1b[31m";
    private green = "\x1b[32m";
    private blue = "\x1b[34m";
    private white = "\x1b[37m";
    private redBg = "\x1b[41m"
    private blueBg = "\x1b[44m"

    constructor() {}

    print(evento: string, usuario: string) {
        const log = `\nMatricula: ${usuario}$ - ${this.obterData()} | ${evento}`;
        process.stdout.write(log);
    }

    erro(evento: string, usuario: string) {
        const log = `\n${this.red}Matricula: ${usuario}${this.reset} - ${this.obterData()} | ${this.red}${evento}${this.reset}`;
        // process.stdout.write(log);
        process.stderr.write(log);
    }

    sucesso(evento: string, usuario: string) {
        const log = `\n${this.green}Matricula: ${usuario}${this.reset} - ${this.obterData()} | ${this.green}${(evento)}${this.reset}`;
        process.stdout.write(log)
    }

    alerta(evento: string, usuario: string) {
        const log = `\n${this.yellow}Matricula: ${usuario}${this.reset} - ${this.obterData()} | ${this.yellow}${evento}${this.reset}`;
        process.stdout.write(log);
    }

    perigo(evento: string, usuario: string) {
        const log = `\n${this.white}${this.redBg} PERIGO - Matricula: ${usuario}${this.reset} - ${this.obterData()} | ${this.white}${this.redBg}${evento}${this.reset}`
        process.stdout.write(log)
    }

    sistema(evento: string) {
        const log = `\n${this.yellow}SISTEMA: ${this.reset}${this.obterData()} | ${this.yellow}${evento}${this.reset}`;
        process.stdout.write(log);
    }
    
    private obterData() {
        const agora = new Date();

        const dia = agora.getDate();
        const mes = agora.getMonth()+1;
        const ano = agora.getFullYear();
        const hora = agora.getHours();
        const minuto = agora.getMinutes();
        const segundo = agora.getSeconds();

        return `${this.blue}[${dia}/${mes}/${ano} - ${hora}:${minuto}:${segundo}]${this.reset}`
    }
}