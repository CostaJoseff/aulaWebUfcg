"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const cpf_cnpj_validator_1 = require("cpf-cnpj-validator");
const validator_1 = require("validator");
const SenhasDiferentesError_1 = require("../excepts/SenhasDiferentesError");
const SolicitacaoExpirouError_1 = require("../excepts/SolicitacaoExpirouError");
const DadoIndisponivelError_1 = require("../excepts/DadoIndisponivelError");
const Util_1 = require("../util/Util");
const CodigoDeVerificacaoInvalidoError_1 = require("../excepts/CodigoDeVerificacaoInvalidoError");
const CodigoJaValidadoError_1 = require("../excepts/CodigoJaValidadoError");
const CodigoNaoValidadoError_1 = require("../excepts/CodigoNaoValidadoError");
const UsuarioNaoExisteError_1 = require("../excepts/UsuarioNaoExisteError");
const pombo_correio_service_1 = require("../pombo-correio/pombo-correio.service");
const Logger_1 = require("../util/Logger");
let UsuarioService = class UsuarioService {
    constructor(prisma, jwt, config, pomboCorreio) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
        this.pomboCorreio = pomboCorreio;
        this.LOGGER = new Logger_1.Logger();
    }
    async iniciarCriacao(novoUsuarioDTO) {
        switch (false) {
            case await this.cpfDisponivel(novoUsuarioDTO.cpf):
                throw new DadoIndisponivelError_1.DadoIndisponivelError("cpf");
            case await this.emailDisponivel(novoUsuarioDTO.email):
                throw new DadoIndisponivelError_1.DadoIndisponivelError("email");
            case await this.matriculaDisponivel(novoUsuarioDTO.matricula):
                throw new DadoIndisponivelError_1.DadoIndisponivelError("matricula");
        }
        this.LOGGER.alerta("Solicitou criação de novo usuário.", novoUsuarioDTO.matricula);
        const token = await this.novoUsuarioToken(novoUsuarioDTO);
        const url = `${novoUsuarioDTO.URLFinalizarCriacao}?token=${token}`;
        const statusCode = 201;
        const dados = {
            nome: novoUsuarioDTO.nome,
            matricula: novoUsuarioDTO.matricula,
            cpf: novoUsuarioDTO.cpf,
            email: novoUsuarioDTO.email,
            senha: novoUsuarioDTO.senha,
            token
        };
        await this.prisma.usuario.create({ data: dados });
        const conteudoHTML = `<p>Clique no link para finalizar a criação de sua nova conta</p><a href="${url}">Finalizar criação de conta.</a>`;
        await this.pomboCorreio.enviarEmail(novoUsuarioDTO.email, "Finalizar criação de conta.", conteudoHTML);
        this.LOGGER.sucesso("Email de novo usuário enviado", novoUsuarioDTO.matricula);
        return { url, statusCode };
    }
    async finalizarCriacao(token) {
        let usuario = await this.prisma.usuario.findFirst({ where: { token } });
        if (!usuario) {
            throw new SolicitacaoExpirouError_1.SolicitacaoExpirouError();
        }
        if (usuario.criacaoFinalizada) {
            this.LOGGER.alerta("Tentou finalizar criação de uma conta já finalizada", usuario.matricula);
            return;
        }
        usuario = await this.prisma.usuario.update({
            where: { matricula: usuario.matricula },
            data: {
                criacaoFinalizada: true,
                token: null
            },
        });
        const statusCode = 201;
        delete usuario.senha;
        delete usuario.token;
        delete usuario.codigoVerificacao;
        this.LOGGER.sucesso("Criação de conta finalizada", usuario.matricula);
        return {
            usuario,
            statusCode
        };
    }
    async efetuarLogin(dadosLoginDTO) {
        const usuario = await this.prisma.usuario.findUnique({
            where: {
                matricula: dadosLoginDTO.matricula,
                criacaoFinalizada: true
            },
        });
        if (!usuario || usuario.senha !== dadosLoginDTO.senha) {
            throw new common_1.UnauthorizedException({ message: "Matricula e/ou senha incorreto(s).", statusCode: 401 });
        }
        const token = await this.tokenDeAcesso(usuario);
        delete usuario.senha;
        delete usuario.dataDeCriacao;
        delete usuario.criacaoFinalizada;
        delete usuario.codigoVerificacao;
        delete usuario.token;
        this.LOGGER.sucesso("Efetuou login", usuario.matricula);
        return {
            token,
            usuario,
            statusCode: 200
        };
    }
    async alterarSenha(novaSenhaDTO, matricula) {
        let usuario = await this.prisma.usuario.findUnique({ where: { matricula: matricula } });
        if (usuario.senha !== novaSenhaDTO.senhaAtual) {
            throw new SenhasDiferentesError_1.SenhasDiferentesError();
        }
        await this.prisma.usuario.update({
            where: { matricula: matricula },
            data: { senha: novaSenhaDTO.novaSenha }
        });
        this.LOGGER.sucesso("Alterou a senha estando autenticado", usuario.matricula);
        return {
            message: "Senha alterada",
            statusCode: 200
        };
    }
    async solicitarAlterarEmail(novoEmailDTO, matricula) {
        this.limparSolicitacoesAlterarEmail();
        const usuario = await this.prisma.usuario.findUnique({ where: { matricula: matricula } });
        if (usuario.senha !== novoEmailDTO.senha) {
            throw new SenhasDiferentesError_1.SenhasDiferentesError();
        }
        if (usuario.email === novoEmailDTO.novoEmail) {
            this.LOGGER.alerta("Informou o email ja cadastrado como novo email durante solicitação de alteração de email", usuario.matricula);
            return { message: "O email informado já pertence a sua conta.", statusCode: 201 };
        }
        if (!(await this.emailDisponivel(novoEmailDTO.novoEmail))) {
            const pendencia = await this.prisma.alterarEmailPendente.findUnique({ where: { novoEmail: novoEmailDTO.novoEmail } });
            if (!pendencia || matricula !== pendencia.matricula) {
                throw new DadoIndisponivelError_1.DadoIndisponivelError("email");
            }
            const url = `${novoEmailDTO.URLAlterarEmail}?token=${pendencia.id}`;
            const conteudoHTML = `<p>Clique no link para finalizar a alteração de e-mail.</p><a href="${url}">Alterar e-mail.</a>`;
            await this.pomboCorreio.enviarEmail(novoEmailDTO.novoEmail, "Finalizar criação de conta.", conteudoHTML);
            this.LOGGER.alerta("Solicitou alteração de Email com uma solicitação pendente", pendencia.matricula);
            return { url };
        }
        const dataAtual = new Date();
        const validade = new Date(dataAtual.setDate(dataAtual.getDate() + 3));
        const token = await this.alterarEmailToken(novoEmailDTO);
        await this.prisma.alterarEmailPendente.create({ data: {
                id: token,
                matricula,
                novoEmail: novoEmailDTO.novoEmail,
                validade
            } });
        this.LOGGER.sucesso("Usuário solicitou troca de Email.", matricula);
        const url = `${novoEmailDTO.URLAlterarEmail}?token=${token}`;
        const statusCode = 201;
        const message = "Para continuar acesse o link que foi enviado para seu E-mail";
        const conteudoHTML = `<p>Clique no link para finalizar a alteração de e-mail.</p><a href="${url}">Alterar e-mail.</a>`;
        await this.pomboCorreio.enviarEmail(novoEmailDTO.novoEmail, "Finalizar criação de conta.", conteudoHTML);
        this.LOGGER.sucesso("Email enviado para o novo Email", matricula);
        return { url, statusCode, message };
    }
    async finalizarAlterarEmail(token) {
        await this.limparSolicitacoesAlterarEmail();
        const pendencia = await this.prisma.alterarEmailPendente.findUnique({ where: { id: token } });
        if (!pendencia) {
            throw new SolicitacaoExpirouError_1.SolicitacaoExpirouError();
        }
        const usuario = await this.prisma.usuario.update({
            where: { matricula: pendencia.matricula },
            data: { email: pendencia.novoEmail }
        });
        delete usuario.senha;
        delete usuario.token;
        delete usuario.codigoVerificacao;
        await this.prisma.alterarEmailPendente.deleteMany({ where: { matricula: pendencia.matricula } });
        const statusCode = 200;
        this.LOGGER.sucesso("O email foi confirmado e alterado", usuario.matricula);
        return {
            usuario,
            statusCode
        };
    }
    async solicitarEsqueciMinhaSenha(matricula) {
        const usuario = await this.prisma.usuario.findUnique({ where: { matricula } });
        if (!usuario) {
            throw new UsuarioNaoExisteError_1.UsuarioNaoExisteError();
        }
        const token = await this.esqueciMinhaSenhatoken(matricula);
        const codigoVerificacao = Util_1.OperacaoAtiva.gerarCodigoDeVerificacao(4);
        await this.prisma.usuario.update({
            where: { matricula },
            data: {
                codigoVerificacao
            }
        });
        this.LOGGER.alerta("Solicitou serviço de esqueci minha senha", matricula);
        const conteudoHTML = `<p>${codigoVerificacao} é o seu código de verificação. Utilize-o para prosseguir com a nova senha.</p>`;
        await this.pomboCorreio.enviarEmail(usuario.email, "Código de verificação esqueciMinhaSenha", conteudoHTML);
        const statusCode = 200;
        this.LOGGER.sucesso("Codigo de confirmação de 4 dígitos enviado", matricula);
        return {
            token,
            codigoVerificacao,
            message: "Email enviado",
            statusCode,
        };
    }
    async validarCodigoEsqueciMinhaSenha(esqueciMinhSenhaDTO, matricula) {
        const usuario = await this.prisma.usuario.findUnique({ where: { matricula } });
        if (!usuario) {
            throw new UsuarioNaoExisteError_1.UsuarioNaoExisteError();
        }
        if (!usuario.codigoVerificacao) {
            throw new common_1.UnauthorizedException("Operação não permitida");
        }
        if (usuario.codigoVerificacao.length > 4) {
            throw new CodigoJaValidadoError_1.CodigoJaValidadoError();
        }
        if (usuario.codigoVerificacao !== esqueciMinhSenhaDTO.codigo) {
            throw new CodigoDeVerificacaoInvalidoError_1.CodigoDeVerificacaoInvalidoError();
        }
        await this.prisma.usuario.update({
            where: { matricula: usuario.matricula },
            data: { codigoVerificacao: usuario.codigoVerificacao + ".OK" }
        });
        this.LOGGER.sucesso("O codigo de 4 dígitos foi validado", matricula);
        return {
            codigoValido: true,
            statusCode: 200
        };
    }
    async finalizarEsqueciSenha(finalizarEsqueciSenhaDTO, matricula) {
        const usuario = await this.prisma.usuario.findUnique({ where: { matricula } });
        if (!usuario) {
            throw new UsuarioNaoExisteError_1.UsuarioNaoExisteError();
        }
        if (!usuario.codigoVerificacao) {
            throw new common_1.UnauthorizedException("Operação não permitida");
        }
        if (usuario.codigoVerificacao.length === 4) {
            throw new CodigoNaoValidadoError_1.CodigoNaoValidadoError();
        }
        await this.prisma.usuario.update({
            where: { matricula },
            data: {
                codigoVerificacao: null,
                senha: finalizarEsqueciSenhaDTO.novaSenha
            }
        });
        this.LOGGER.sucesso("A senha foi alterada via Esqueci Minha Senha", matricula);
        return {
            message: "Senha alterada",
            statusCode: 200
        };
    }
    async obterHistorico(matricula) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { matricula },
            include: { relatorios: {
                    include: { linhas: true }
                } }
        });
        this.LOGGER.sucesso("Solicitou histórico de contagens", matricula);
        return usuario.relatorios;
    }
    async obterDados(matricula) {
        const usuario = await this.prisma.usuario.findUnique({ where: { matricula } });
        delete usuario.senha;
        delete usuario.criacaoFinalizada;
        delete usuario.codigoVerificacao;
        delete usuario.token;
        this.LOGGER.sucesso("Solicitou dados de usuário", matricula);
        return usuario;
    }
    alterarEmailToken(novoEmailDTO) {
        const payload = {
            novoEmail: novoEmailDTO.novoEmail,
            sub: Math.floor(Math.random() * (1000))
        };
        return this.jwt.signAsync(payload, {
            secret: this.config.get('JWT_SECRET')
        });
    }
    novoUsuarioToken(novoUsuario) {
        const payload = {
            nome: novoUsuario.nome,
            sub: Math.floor(Math.random() * (1000))
        };
        return this.jwt.signAsync(payload, {
            secret: this.config.get('JWT_SECRET')
        });
    }
    esqueciMinhaSenhatoken(matricula) {
        const payload = {
            id: matricula,
        };
        return this.jwt.signAsync(payload, {
            expiresIn: this.config.get('JWT_EMS_EXPIRATION'),
            secret: this.config.get('JWT_SECRET')
        });
    }
    tokenDeAcesso(usuario) {
        const payload = {
            id: usuario.id,
            matricula: usuario.matricula,
            sub: Math.floor(Math.random() * (1000))
        };
        return this.jwt.signAsync(payload, {
            expiresIn: this.config.get('JWT_EXPIRATION'),
            secret: this.config.get('JWT_SECRET')
        });
    }
    async cpfDisponivel(cpf) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { cpf: cpf }
        });
        this.LOGGER.sistema("Verificação de CPF disponível solicitado");
        return !usuario && cpf_cnpj_validator_1.cpf.isValid(cpf);
    }
    async emailDisponivel(email) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { email: email }
        });
        const pendencia = await this.prisma.alterarEmailPendente.findUnique({
            where: { novoEmail: email }
        });
        this.LOGGER.sistema("Verificação de EMAIL disponível solicitado");
        return !usuario && !pendencia && (0, validator_1.isEmail)(email);
    }
    async matriculaDisponivel(matricula) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { matricula: matricula }
        });
        this.LOGGER.sistema("Verificação de MATRICULA disponível solicitado");
        return !usuario;
    }
    async limparSolicitacoesAlterarEmail() {
        const dataAtual = new Date();
        await this.prisma.alterarEmailPendente.deleteMany({
            where: {
                validade: {
                    lte: dataAtual
                }
            }
        });
        this.LOGGER.sistema("Removidas solicitações de alterar email velhas");
    }
};
exports.UsuarioService = UsuarioService;
exports.UsuarioService = UsuarioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService,
        pombo_correio_service_1.PomboCorreioService])
], UsuarioService);
//# sourceMappingURL=usuario.service.js.map