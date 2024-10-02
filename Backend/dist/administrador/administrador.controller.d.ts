import { AdministradorService } from "./administrador.service";
export declare class AdministradorController {
    private service;
    constructor(service: AdministradorService);
    criarUsuario(): void;
    obterHistorico(): void;
    historicos(): void;
}
