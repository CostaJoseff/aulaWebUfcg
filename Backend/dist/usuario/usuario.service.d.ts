import { NovoUsuarioDTO } from "src/DTOs";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { DadosLoginDTO } from "src/DTOs/dadosLogin.dto";
import { ConfigService } from "@nestjs/config";
import { Usuario } from "@prisma/client";
import { AlterarSenhaDTO } from "src/DTOs/alterarsenha.dto";
import { AlterarEmailDTO } from "src/DTOs/alteraremail.dto";
import { EsqueciMinhSenhaDTO } from "src/DTOs/esqueciMinhaSenha.dto";
import { FinalizarEsqueciSenhaDTO } from "src/DTOs/finalizarEsqueciSenha.dto";
import { PomboCorreioService } from "src/pombo-correio/pombo-correio.service";
export declare class UsuarioService {
    private prisma;
    private jwt;
    private config;
    private readonly pomboCorreio;
    private LOGGER;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService, pomboCorreio: PomboCorreioService);
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
    alterarSenha(novaSenhaDTO: AlterarSenhaDTO, matricula: string): Promise<{
        message: string;
        statusCode: number;
    }>;
    solicitarAlterarEmail(novoEmailDTO: AlterarEmailDTO, matricula: string): Promise<{
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
    solicitarEsqueciMinhaSenha(matricula: string): Promise<{
        token: string;
        codigoVerificacao: string;
        message: string;
        statusCode: number;
    }>;
    validarCodigoEsqueciMinhaSenha(esqueciMinhSenhaDTO: EsqueciMinhSenhaDTO, matricula: string): Promise<{
        codigoValido: boolean;
        statusCode: number;
    }>;
    finalizarEsqueciSenha(finalizarEsqueciSenhaDTO: FinalizarEsqueciSenhaDTO, matricula: string): Promise<{
        message: string;
        statusCode: number;
    }>;
    obterHistorico(matricula: string): Promise<({
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
    obterDados(matricula: string): Promise<{
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
    alterarEmailToken(novoEmailDTO: AlterarEmailDTO): Promise<string>;
    novoUsuarioToken(novoUsuario: NovoUsuarioDTO): Promise<string>;
    esqueciMinhaSenhatoken(matricula: string): Promise<string>;
    tokenDeAcesso(usuario: Usuario): Promise<string>;
    cpfDisponivel(cpf: string): Promise<boolean>;
    emailDisponivel(email: string): Promise<boolean>;
    matriculaDisponivel(matricula: string): Promise<boolean>;
    limparSolicitacoesAlterarEmail(): Promise<void>;
}
