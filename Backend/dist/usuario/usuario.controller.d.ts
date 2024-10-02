import { UsuarioService } from "./usuario.service";
import { NovoUsuarioDTO } from "src/DTOs";
import { DadosLoginDTO } from "src/DTOs/dadosLogin.dto";
import { AlterarSenhaDTO } from "src/DTOs/alterarsenha.dto";
import { AlterarEmailDTO } from "src/DTOs/alteraremail.dto";
import { EsqueciMinhSenhaDTO } from "src/DTOs/esqueciMinhaSenha.dto";
import { FinalizarEsqueciSenhaDTO } from "src/DTOs/finalizarEsqueciSenha.dto";
export declare class UsuarioController {
    private service;
    private LOGGER;
    constructor(service: UsuarioService);
    iniciarCriacao(novoUsuarioDTO: NovoUsuarioDTO): Promise<{
        url: string;
        statusCode: number;
    }>;
    finalizarCriacao(token: string): Promise<{
        usuario: {
            id: number;
            dataDeCriacao: Date | null;
            nome: string;
            matricula: string;
            cpf: string;
            email: string;
            senha: string;
            criacaoFinalizada: boolean;
            codigoVerificacao: string | null;
            token: string | null;
        };
        statusCode: number;
    }>;
    cpfDisponivel(cpf: string): Promise<{
        disponivel: boolean;
    }>;
    emailDisponivel(email: string): Promise<{
        disponivel: boolean;
    }>;
    matriculaDisponivel(matricula: string): Promise<{
        disponivel: boolean;
    }>;
    efetuarLogin(dadosLoginDTO: DadosLoginDTO): Promise<{
        token: string;
        usuario: {
            id: number;
            dataDeCriacao: Date | null;
            nome: string;
            matricula: string;
            cpf: string;
            email: string;
            senha: string;
            criacaoFinalizada: boolean;
            codigoVerificacao: string | null;
            token: string | null;
        };
        statusCode: number;
    }>;
    alterarSenha(novaSenhaDTO: AlterarSenhaDTO, req: any): Promise<{
        message: string;
        statusCode: number;
    }>;
    solicitarAlterarEmail(novoEmailDTO: AlterarEmailDTO, req: any): Promise<{
        message: string;
        statusCode: number;
        url?: undefined;
    } | {
        url: string;
        message?: undefined;
        statusCode?: undefined;
    } | {
        url: string;
        statusCode: number;
        message: string;
    }>;
    finalizarAlterarEmail(token: string): Promise<{
        usuario: {
            id: number;
            dataDeCriacao: Date | null;
            nome: string;
            matricula: string;
            cpf: string;
            email: string;
            senha: string;
            criacaoFinalizada: boolean;
            codigoVerificacao: string | null;
            token: string | null;
        };
        statusCode: number;
    }>;
    solicitarEsqueciSenha(matricula: string): Promise<{
        token: string;
        codigoVerificacao: string;
        message: string;
        statusCode: number;
    }>;
    validarCodigoEsqueciMinhaSenha(req: any, esqueciMinhSenhaDTO: EsqueciMinhSenhaDTO): Promise<{
        codigoValido: boolean;
        statusCode: number;
    }>;
    finalizarEsqueciSenha(req: any, finalizarEsqueciSenhaDTO: FinalizarEsqueciSenhaDTO): Promise<{
        message: string;
        statusCode: number;
    }>;
    obterHistorico(req: any): Promise<({
        linhas: {
            id: number;
            nome: string;
            coordenadas: number[];
            direcao: import(".prisma/client").$Enums.Direcao;
            cor: number[];
            carros: number;
            motos: number;
            onibus: number;
            caminhoes: number;
            vans: number;
            relatorioId: number;
        }[];
    } & {
        id: number;
        dataDeExecucao: Date;
        url: string | null;
        quadroDisplay: string | null;
        status: import(".prisma/client").$Enums.StatusRelatorio;
        usuarioMatricula: string;
    })[]>;
    obterDados(req: any): Promise<{
        id: number;
        dataDeCriacao: Date | null;
        nome: string;
        matricula: string;
        cpf: string;
        email: string;
        senha: string;
        criacaoFinalizada: boolean;
        codigoVerificacao: string | null;
        token: string | null;
    }>;
}
