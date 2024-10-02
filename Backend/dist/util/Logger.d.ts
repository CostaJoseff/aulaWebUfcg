export declare class Logger {
    private reset;
    private yellow;
    private red;
    private green;
    private blue;
    private white;
    private redBg;
    private blueBg;
    constructor();
    print(evento: string, usuario: string): void;
    erro(evento: string, usuario: string): void;
    sucesso(evento: string, usuario: string): void;
    alerta(evento: string, usuario: string): void;
    perigo(evento: string, usuario: string): void;
    sistema(evento: string): void;
    private obterData;
}
