import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { NovoUsuarioDTO, VerificarCodigoEmailDTO } from "src/DTOs";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { DadosLoginDTO } from "src/DTOs/dadosLogin.dto";
import { ConfigService } from "@nestjs/config";
import { Usuario } from "@prisma/client";
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { isEmail } from 'validator';
import { AlterarSenhaDTO } from "src/DTOs/alterarsenha.dto";
import { SenhasDiferentesError } from "src/excepts/SenhasDiferentesError";
import { AlterarEmailDTO } from "src/DTOs/alteraremail.dto";
import { log } from "console";
import { SolicitacaoExpirouError } from "src/excepts/SolicitacaoExpirouError";
import { DadoIndisponivelError } from "src/excepts/DadoIndisponivelError";
import { OperacaoAtiva } from "src/util/Util";
import { EsqueciMinhSenhaDTO } from "src/DTOs/esqueciMinhaSenha.dto";
import { hostname } from "os";
import { FinalizarEsqueciSenhaDTO } from "src/DTOs/finalizarEsqueciSenha.dto";
import { CodigoDeVerificacaoInvalidoError } from "src/excepts/CodigoDeVerificacaoInvalidoError";
import { CodigoJaValidadoError } from "src/excepts/CodigoJaValidadoError";
import { CodigoNaoValidadoError } from "src/excepts/CodigoNaoValidadoError";
import { UsuarioNaoExisteError } from "src/excepts/UsuarioNaoExisteError";
import { PomboCorreioService } from "src/pombo-correio/pombo-correio.service";
import { Logger } from "src/util/Logger";

@Injectable()
export class UsuarioService {

  private LOGGER: Logger = new Logger();

  constructor(
    private prisma: PrismaService, 
    private jwt: JwtService, 
    private config: ConfigService,
    private readonly pomboCorreio: PomboCorreioService
  ) {
  }

  async iniciarCriacao(novoUsuarioDTO: NovoUsuarioDTO) {
    switch (false) {
      case await this.cpfDisponivel(novoUsuarioDTO.cpf):
        throw new DadoIndisponivelError("cpf");
      case await this.emailDisponivel(novoUsuarioDTO.email):
        throw new DadoIndisponivelError("email");
      case await this.matriculaDisponivel(novoUsuarioDTO.matricula):
        throw new DadoIndisponivelError("matricula");
    }

    this.LOGGER.alerta("Solicitou criação de novo usuário.", novoUsuarioDTO.matricula)
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
    }
    await this.prisma.usuario.create({data: dados});
    const conteudoHTML = `<p>Clique no link para finalizar a criação de sua nova conta</p><a href="${url}">Finalizar criação de conta.</a>`
    await this.pomboCorreio.enviarEmail(novoUsuarioDTO.email, "Finalizar criação de conta.", conteudoHTML);
    this.LOGGER.sucesso("Email de novo usuário enviado", novoUsuarioDTO.matricula);
    return {url, statusCode};
  }

  async finalizarCriacao(token: string) {
    let usuario = await this.prisma.usuario.findFirst({where: {token}});
    if (!usuario) { throw new SolicitacaoExpirouError() }
    if (usuario.criacaoFinalizada) {
      this.LOGGER.alerta("Tentou finalizar criação de uma conta já finalizada", usuario.matricula);
      return;
    }
    usuario = await this.prisma.usuario.update({
      where: {matricula: usuario.matricula},
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

  async efetuarLogin(dadosLoginDTO: DadosLoginDTO) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        matricula: dadosLoginDTO.matricula,
        criacaoFinalizada: true
      },
    });

    if (!usuario || usuario.senha !== dadosLoginDTO.senha) {
      throw new UnauthorizedException({message: "Matricula e/ou senha incorreto(s).", statusCode: 401});
    }

    const token = await this.tokenDeAcesso(usuario);
    delete usuario.senha
    delete usuario.dataDeCriacao
    delete usuario.criacaoFinalizada
    delete usuario.codigoVerificacao
    delete usuario.token
    this.LOGGER.sucesso("Efetuou login", usuario.matricula)
    return { 
      token,
      usuario,
      statusCode: 200
    };
  }

  async alterarSenha(novaSenhaDTO: AlterarSenhaDTO, matricula: string) {
    let usuario = await this.prisma.usuario.findUnique({ where: {matricula: matricula}}) // Está autenticado. TEM USUÁRIO não precisa verificar
    if (usuario.senha !== novaSenhaDTO.senhaAtual) {
      throw new SenhasDiferentesError();
    }
    await this.prisma.usuario.update({
      where: {matricula: matricula},
      data: {senha: novaSenhaDTO.novaSenha}
    })

    this.LOGGER.sucesso("Alterou a senha estando autenticado", usuario.matricula);
    return {
      message: "Senha alterada",
      statusCode: 200
    }

  }

  async solicitarAlterarEmail(novoEmailDTO: AlterarEmailDTO, matricula: string) {
    this.limparSolicitacoesAlterarEmail();
    const usuario = await this.prisma.usuario.findUnique({where: {matricula: matricula}}); // Está autenticado. TEM USUÀRIO não precisa verificar
    if (usuario.senha !== novoEmailDTO.senha) { throw new SenhasDiferentesError() }
    if (usuario.email === novoEmailDTO.novoEmail) {
      this.LOGGER.alerta("Informou o email ja cadastrado como novo email durante solicitação de alteração de email", usuario.matricula);
      return {message: "O email informado já pertence a sua conta.", statusCode: 201}
    }

    if (!(await this.emailDisponivel(novoEmailDTO.novoEmail))) {
      const pendencia = await this.prisma.alterarEmailPendente.findUnique({where: {novoEmail: novoEmailDTO.novoEmail}})
      if (!pendencia || matricula !== pendencia.matricula) { throw new DadoIndisponivelError("email"); }
      const url = `${novoEmailDTO.URLAlterarEmail}?token=${pendencia.id}`;
      const conteudoHTML = `<p>Clique no link para finalizar a alteração de e-mail.</p><a href="${url}">Alterar e-mail.</a>`
      await this.pomboCorreio.enviarEmail(novoEmailDTO.novoEmail, "Finalizar criação de conta.", conteudoHTML);
      this.LOGGER.alerta("Solicitou alteração de Email com uma solicitação pendente", pendencia.matricula);
      return {url};
    }
    const dataAtual = new Date();
    const validade = new Date(dataAtual.setDate(dataAtual.getDate() + 3));
    const token = await this.alterarEmailToken(novoEmailDTO);
    await this.prisma.alterarEmailPendente.create({data: {
      id: token,
      matricula,
      novoEmail: novoEmailDTO.novoEmail,
      validade
    }});

    this.LOGGER.sucesso("Usuário solicitou troca de Email.", matricula);
    const url = `${novoEmailDTO.URLAlterarEmail}?token=${token}`;
    const statusCode = 201
    const message = "Para continuar acesse o link que foi enviado para seu E-mail"
    const conteudoHTML = `<p>Clique no link para finalizar a alteração de e-mail.</p><a href="${url}">Alterar e-mail.</a>`
    await this.pomboCorreio.enviarEmail(novoEmailDTO.novoEmail, "Finalizar criação de conta.", conteudoHTML);
    this.LOGGER.sucesso("Email enviado para o novo Email", matricula);
    return {url, statusCode, message};
  }

  async finalizarAlterarEmail(token: string) {
    await this.limparSolicitacoesAlterarEmail();
    const pendencia = await this.prisma.alterarEmailPendente.findUnique({where:{id:token}});
    if (!pendencia) { throw new SolicitacaoExpirouError() }
    const usuario = await this.prisma.usuario.update({
      where: {matricula: pendencia.matricula},
      data: {email: pendencia.novoEmail}
    })
    delete usuario.senha;
    delete usuario.token;
    delete usuario.codigoVerificacao;
    await this.prisma.alterarEmailPendente.deleteMany({where: {matricula: pendencia.matricula}});
    const statusCode = 200;
    this.LOGGER.sucesso("O email foi confirmado e alterado", usuario.matricula);
    return { 
      usuario,
      statusCode
    };
  }

  async solicitarEsqueciMinhaSenha(matricula: string) {
    const usuario = await this.prisma.usuario.findUnique({where: {matricula}});
    if (!usuario) { throw new UsuarioNaoExisteError() }

    const token = await this.esqueciMinhaSenhatoken(matricula);
    const codigoVerificacao = OperacaoAtiva.gerarCodigoDeVerificacao(4);
    await this.prisma.usuario.update({
      where: {matricula},
      data: {
        codigoVerificacao
      }
    });

    this.LOGGER.alerta("Solicitou serviço de esqueci minha senha", matricula)
    const conteudoHTML = `<p>${codigoVerificacao} é o seu código de verificação. Utilize-o para prosseguir com a nova senha.</p>`
    await this.pomboCorreio.enviarEmail(usuario.email, "Código de verificação esqueciMinhaSenha", conteudoHTML);
    const statusCode = 200;
    this.LOGGER.sucesso("Codigo de confirmação de 4 dígitos enviado", matricula);
    return {
      token,
      codigoVerificacao,
      message: "Email enviado",
      statusCode,
    }

  }

  async validarCodigoEsqueciMinhaSenha(esqueciMinhSenhaDTO: EsqueciMinhSenhaDTO, matricula: string) {
    const usuario = await this.prisma.usuario.findUnique({where: {matricula}});
    if (!usuario) { throw new UsuarioNaoExisteError() } // Desnecessário o auth já garante existencia de usuário
    if (!usuario.codigoVerificacao) { throw new UnauthorizedException("Operação não permitida") }
    if (usuario.codigoVerificacao.length > 4) { throw new CodigoJaValidadoError() }
    if (usuario.codigoVerificacao !== esqueciMinhSenhaDTO.codigo) { throw new CodigoDeVerificacaoInvalidoError() }
    await this.prisma.usuario.update({
      where: {matricula: usuario.matricula},
      data: {codigoVerificacao: usuario.codigoVerificacao+".OK"}
    })
    this.LOGGER.sucesso("O codigo de 4 dígitos foi validado", matricula);
    return {
      codigoValido: true,
      statusCode: 200
    }
  }

  async finalizarEsqueciSenha(finalizarEsqueciSenhaDTO: FinalizarEsqueciSenhaDTO, matricula: string) {
    const usuario = await this.prisma.usuario.findUnique({where: {matricula}});
    if (!usuario) { throw new UsuarioNaoExisteError() } // Desnecessáio auth garante existencia
    if (!usuario.codigoVerificacao) { throw new UnauthorizedException("Operação não permitida") }
    if (usuario.codigoVerificacao.length === 4) { throw new CodigoNaoValidadoError() }
    await this.prisma.usuario.update({
      where: {matricula},
      data: {
        codigoVerificacao: null,
        senha: finalizarEsqueciSenhaDTO.novaSenha
      }
    });

    this.LOGGER.sucesso("A senha foi alterada via Esqueci Minha Senha", matricula);
    return {
      message: "Senha alterada",
      statusCode: 200
    }
  }

  async obterHistorico(matricula: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {matricula},
      include: { relatorios: {
        include: {linhas: true}
      }}
    })

    this.LOGGER.sucesso("Solicitou histórico de contagens", matricula);
    return usuario.relatorios;
  }

  async obterDados(matricula: string) {
    const usuario = await this.prisma.usuario.findUnique({where: {matricula}})

    delete usuario.senha;
    delete usuario.criacaoFinalizada;
    delete usuario.codigoVerificacao;
    delete usuario.token;

    this.LOGGER.sucesso("Solicitou dados de usuário", matricula);
    return usuario;
  }

  alterarEmailToken(novoEmailDTO: AlterarEmailDTO) {
    const payload = {
      novoEmail: novoEmailDTO.novoEmail,
      sub: Math.floor(Math.random() * (1000))
    }
    return this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_SECRET')
    });
  }

  novoUsuarioToken(novoUsuario: NovoUsuarioDTO) {
    const payload = {
      nome: novoUsuario.nome,
      sub: Math.floor(Math.random() * (1000))
    };
    return this.jwt.signAsync(payload, {
      secret:this.config.get('JWT_SECRET')
    });
  }

  esqueciMinhaSenhatoken(matricula: string) {
    const payload = {
      id: matricula,
    }
    return this.jwt.signAsync(payload, {
      expiresIn: this.config.get('JWT_EMS_EXPIRATION'),
      secret: this.config.get('JWT_SECRET')
    })
  }

  tokenDeAcesso(usuario: Usuario) {
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

  async cpfDisponivel(cpf: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {cpf: cpf}
    });
    this.LOGGER.sistema("Verificação de CPF disponível solicitado");
    return !usuario && cpfValidator.isValid(cpf);
  }

  async emailDisponivel(email: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {email: email}
    });
    const pendencia = await this.prisma.alterarEmailPendente.findUnique({
      where: {novoEmail: email}
    })
    this.LOGGER.sistema("Verificação de EMAIL disponível solicitado");
    return !usuario && !pendencia && isEmail(email);
  }

  async matriculaDisponivel(matricula: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {matricula: matricula}
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
}
