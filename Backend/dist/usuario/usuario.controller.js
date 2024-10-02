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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const common_1 = require("@nestjs/common");
const usuario_service_1 = require("./usuario.service");
const DTOs_1 = require("../DTOs");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../auth/constants.ts/constants");
const auth_guard_1 = require("../auth/auth.guard");
const dadosLogin_dto_1 = require("../DTOs/dadosLogin.dto");
const alterarsenha_dto_1 = require("../DTOs/alterarsenha.dto");
const alteraremail_dto_1 = require("../DTOs/alteraremail.dto");
const esqueciMinhaSenha_dto_1 = require("../DTOs/esqueciMinhaSenha.dto");
const finalizarEsqueciSenha_dto_1 = require("../DTOs/finalizarEsqueciSenha.dto");
const CodigoDeVerificacaoInvalidoError_1 = require("../excepts/CodigoDeVerificacaoInvalidoError");
const DadoIndisponivelError_1 = require("../excepts/DadoIndisponivelError");
const DadoEmBrancoError_1 = require("../excepts/DadoEmBrancoError");
const NaoEhCpfError_1 = require("../excepts/NaoEhCpfError");
const NaoEhEmailError_1 = require("../excepts/NaoEhEmailError");
const SenhaPequenaError_1 = require("../excepts/SenhaPequenaError");
const SolicitacaoExpirouError_1 = require("../excepts/SolicitacaoExpirouError");
const SenhasDiferentesError_1 = require("../excepts/SenhasDiferentesError");
const UsuarioNaoExisteError_1 = require("../excepts/UsuarioNaoExisteError");
const CodigoNaoValidadoError_1 = require("../excepts/CodigoNaoValidadoError");
const Logger_1 = require("../util/Logger");
const relatorio_dto_1 = require("../DTOs/relatorio.dto");
let UsuarioController = class UsuarioController {
    constructor(service) {
        this.service = service;
        this.LOGGER = new Logger_1.Logger();
    }
    iniciarCriacao(novoUsuarioDTO) {
        novoUsuarioDTO.validarDados();
        return this.service.iniciarCriacao(novoUsuarioDTO);
    }
    finalizarCriacao(token) {
        return this.service.finalizarCriacao(token);
    }
    async cpfDisponivel(cpf) {
        cpf.trim();
        const disponivel = await this.service.cpfDisponivel(cpf);
        return { disponivel };
    }
    async emailDisponivel(email) {
        email.trim();
        const disponivel = await this.service.emailDisponivel(email);
        return { disponivel };
    }
    async matriculaDisponivel(matricula) {
        matricula.trim();
        const disponivel = await this.service.matriculaDisponivel(matricula);
        return { disponivel };
    }
    efetuarLogin(dadosLoginDTO) {
        dadosLoginDTO.validarDados();
        return this.service.efetuarLogin(dadosLoginDTO);
    }
    alterarSenha(novaSenhaDTO, req) {
        const matricula = req['user'].matricula;
        novaSenhaDTO.validarDados();
        return this.service.alterarSenha(novaSenhaDTO, matricula);
    }
    solicitarAlterarEmail(novoEmailDTO, req) {
        const matricula = req['user'].matricula;
        novoEmailDTO.validarDados();
        return this.service.solicitarAlterarEmail(novoEmailDTO, matricula);
    }
    finalizarAlterarEmail(token) {
        return this.service.finalizarAlterarEmail(token);
    }
    solicitarEsqueciSenha(matricula) {
        matricula = matricula.trim();
        return this.service.solicitarEsqueciMinhaSenha(matricula);
    }
    validarCodigoEsqueciMinhaSenha(req, esqueciMinhSenhaDTO) {
        const matricula = req['user'].id;
        esqueciMinhSenhaDTO.validarDados();
        return this.service.validarCodigoEsqueciMinhaSenha(esqueciMinhSenhaDTO, matricula);
    }
    finalizarEsqueciSenha(req, finalizarEsqueciSenhaDTO) {
        const matricula = req['user'].id;
        finalizarEsqueciSenhaDTO.validarDados();
        return this.service.finalizarEsqueciSenha(finalizarEsqueciSenhaDTO, matricula);
    }
    obterHistorico(req) {
        const matricula = req['user'].matricula;
        return this.service.obterHistorico(matricula);
    }
    obterDados(req) {
        const matricula = req['user'].matricula;
        return this.service.obterDados(matricula);
    }
};
exports.UsuarioController = UsuarioController;
__decorate([
    (0, constants_1.Public)(),
    (0, common_1.Post)('iniciarCriacao'),
    (0, swagger_1.ApiOperation)({
        summary: 'Inicia um processo de criação de usuário',
        description: "Neste endpoint, você deve fornecer a URL da página de finalização de criação. \nQuando o endpoint for concluído, um e-mail será enviado ao usuário com a URL fornecida e um token adicional. Esse token deve ser utilizado na página de finalização de criação. " +
            "\n\n(ex: Se a URL fornecida for siteBonito.com/telaDeFinalizacao, o e-mail enviado ao usuário incluirá um link como siteBonito.com/telaDeFinalizacao?token=hgig5g4. O usuário deve clicar nesse link, e o front-end precisará capturar o token da URL para completar o processo de finalização de criação.)"
    }),
    (0, swagger_1.ApiResponse)({
        status: 201, description: 'A solicitação foi criada e a URL foi enviada.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 400, description: 'Algum dado entregue se encontra fora do esperado.\n\n' +
            (new DadoEmBrancoError_1.DadoEmBrancoError("")).toString() + '\n\n' +
            (new NaoEhCpfError_1.NaoEhCpfError("")).toString() + '\n\n' +
            (new NaoEhEmailError_1.NaoEhEmailError("")).toString() + '\n\n' +
            (new SenhaPequenaError_1.SenhaPequenaError()).toString(),
    }),
    (0, swagger_1.ApiResponse)({
        status: 409, description: 'O CPF ou E-mail informado já está em uso. "dadoIndisponivel" é a variável que informa qual deles já está em uso. \n\nSe algum usuário solicitar alteração de e-mail, o e-mail solicitado estará indisponível mesmo que não esteja de fato em uso.\n\n' +
            (new DadoIndisponivelError_1.DadoIndisponivelError("")).toString()
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTOs_1.NovoUsuarioDTO]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "iniciarCriacao", null);
__decorate([
    (0, constants_1.Public)(),
    (0, common_1.Post)('finalizarCriacao'),
    (0, swagger_1.ApiOperation)({
        summary: 'Finaliza a criação de um usuário.',
        description: "Neste endpoint, você deve por no final da URL de requisição da API '?token=' seguido do token que consta na URL do navegador (a URL utilizada para acessar a página). \nSe nenhum token estiver presente, redirecione o usuário para outra página, pois ele não deve acessar esta tela sem um token." +
            "\n\nEste token é essencial para liberar o acesso do novo usuário."
    }),
    (0, swagger_1.ApiResponse)({
        status: 201, description: 'O usuário foi criado e será retornado para fins de confirmação ou cache. Caso não retorne nada significa que o usuário já possui conta.\n\n' +
            '{ usuario: { id: 1, dataDeCriacao: "2024-..., nome: "feioso", matricula: "123", cpf: "123", email: "a@a.a", criacaoFinalizada: true, relatorios: []}, statusCode: 201 }'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401, description: 'A conta já foi finalizada ou o token não é válido.\n\n' +
            (new SolicitacaoExpirouError_1.SolicitacaoExpirouError()).toString()
    }),
    __param(0, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "finalizarCriacao", null);
__decorate([
    (0, constants_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Verifica se o CPF informado está disponível.',
        description: 'Retorno booleano puro informando se o CPF está disponível. \nCódigo de status não é necessário nessa operação.\n\n' +
            '{ disponivel: true }'
    }),
    (0, common_1.Get)('cpfDisponivel/:cpf'),
    __param(0, (0, common_1.Param)('cpf')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "cpfDisponivel", null);
__decorate([
    (0, constants_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Verifica se o E-mail informado está disponível.',
        description: 'Retorno booleano puro informando se o E-mail está disponível. \nCódigo de status não é necessário nessa operação.\n\n' +
            '{ disponivel: true }'
    }),
    (0, common_1.Get)('emailDisponivel/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "emailDisponivel", null);
__decorate([
    (0, constants_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Verifica se a matricula informada está disponível.',
        description: 'Retorno booleano puro informando se a matricula está disponível. \nCódigo de status não é necessário nessa operação.\n\n' +
            '{ disponivel: true }'
    }),
    (0, common_1.Get)('matriculaDisponivel/:matricula'),
    __param(0, (0, common_1.Param)('matricula')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "matriculaDisponivel", null);
__decorate([
    (0, constants_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Libera acesso de um determinado usuário ao sistema.',
        description: 'Se houver uma correspondência de matrícula e senha, a API retornará um token de acesso que DEVE ser fornecido para acessar as rotas privadas. \n\nO token tem duração de 30 minutos.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200, description: 'Usuário autorizado e token enviado.\n\n' +
            '{ token: "skdfhk", usuario: {TODOS os dados do usuário, incluíndo seus relatórios e as linhas de cada relatório} statusCode: 200 }'
    }),
    (0, swagger_1.ApiResponse)({
        status: 400, description: 'Algum dado entregue se encontra fora do esperado.\n\n' +
            (new DadoEmBrancoError_1.DadoEmBrancoError("")).toString() + '\n\n' +
            (new SenhaPequenaError_1.SenhaPequenaError()).toString(),
    }),
    (0, swagger_1.ApiResponse)({
        status: 401, description: 'Acesso negado, não houve match.\n\n' +
            '{ message: Matricula e/ou senha incorreto(s).,  statusCode: 401}'
    }),
    (0, common_1.Post)('entrar'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dadosLogin_dto_1.DadosLoginDTO]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "efetuarLogin", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)('alterarSenha'),
    (0, swagger_1.ApiOperation)({
        summary: '[ROTA PRIVADA] Altera a senha do usuário.',
        description: 'Esta alteração de senha ocorre com o usuário autenticado, ou seja, ocorre no perfil do usuário, portanto, não precisa verificação via e-mail. Voce deve fornecer a senha atual do usuário e a nova senha. \nSe a senha atual corresponder à armazenada no sistema, a senha será atualizada.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200, description: 'Senha alterada com sucesso.' +
            '{ message: Senha alterada, statusCode: 200 }'
    }),
    (0, swagger_1.ApiResponse)({
        status: 400, description: 'Algum dado entregue se encontra fora do esperado. Neste caso será informado "A senha atual" ou "A nova senha"\n\n' +
            (new DadoEmBrancoError_1.DadoEmBrancoError("")).toString() + '\n\n' +
            (new SenhaPequenaError_1.SenhaPequenaError()).toString() + '\n\n' +
            (new SenhasDiferentesError_1.SenhasDiferentesError()).toString()
    }),
    (0, swagger_1.ApiResponse)({
        status: 401, description: 'O token expirou, necessário efetuar login novamente.\n\n' +
            '{ message: Unauthorized, statusCode: 401 }'
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [alterarsenha_dto_1.AlterarSenhaDTO, Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "alterarSenha", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('solicitarAlterarEmail'),
    (0, swagger_1.ApiOperation)({
        summary: '[ROTA PRIVADA] Solicita alteração do e-mail do usuário.',
        description: 'A alteração de e-mail será realizada da mesma forma que no cadastro de usuário, sendo necessário fornecer a URL da página de finalizar alteração de e-mail. \nSerá enviado uma URL para o novo e-mail do usuário.' +
            '\n\n(1) Caso o usuário solicite a alteração de e-mail para o mesmo endereço mais de uma vez, o mesmo token será fornecido.' +
            '\n(2) Ao solicitar alteração de e-mail, o novo endereço de e-mail ficará indisponível para qualquer outra operação até que a solicitação seja cancelada.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201, description: 'A solicitação foi criada e está na lista de espera ou o email informado já pertence ao usuário.\n\n' +
            '{ message: O email informado já pertence a sua conta., statusCode: 201 }\n\n' +
            '{ message: Para continuar acesse o link que foi enviado para seu E-mail: statusCode: 201}'
    }),
    (0, swagger_1.ApiResponse)({
        status: 400, description: 'Algum dado entregue se encontra fora do esperado.' +
            (new DadoEmBrancoError_1.DadoEmBrancoError('')).toString() + '\n\n' +
            (new SenhaPequenaError_1.SenhaPequenaError()).toString() + '\n\n' +
            (new NaoEhEmailError_1.NaoEhEmailError('')).toString() + '\n\n' +
            (new SenhasDiferentesError_1.SenhasDiferentesError()).toString()
    }),
    (0, swagger_1.ApiResponse)({
        status: 401, description: 'O token expirou, necessário efetuar login novamente.\n\n' +
            '{ message: Unauthorized, statusCode: 401 }'
    }),
    (0, swagger_1.ApiResponse)({
        status: 409, description: 'O e-mail informado não está disponível. \nOutro usuário está utilizando o e-mail ou o endereço de e-mail informado está na fila de alteração para outro usuário.\n\n' +
            (new DadoIndisponivelError_1.DadoIndisponivelError('')).toString()
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [alteraremail_dto_1.AlterarEmailDTO, Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "solicitarAlterarEmail", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)('finalizarAlterarEmail'),
    (0, swagger_1.ApiOperation)({
        summary: '[ROTA PRIVADA] Altera o e-mail do usuário.',
        description: 'Finaliza a operação de alterar de e-mail, removendo todas as outras solicitações de alterar e-mail feitas pelo usuário.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200, description: 'O e-mail foi alterado.' +
            '{ statusCode: 200, usuario: {tooodos aqueles dados do usuário que não voi colocar de novo U_U tempraquê!} }'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401, description: 'O token expirou, necessário efetuar login novamente.\n\n' +
            '{ message: Unauthorized, statusCode: 401 }\n\n' +
            (new SolicitacaoExpirouError_1.SolicitacaoExpirouError()).toString()
    }),
    __param(0, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "finalizarAlterarEmail", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Inicia o processo de esqueci senha',
        description: 'Esse endpoint envia o código de 4 dígitos para o email do usuário. Será entregue um token para garantir que os outros endpoints serão acessados dentro de um período de tempo estiamdo.\n\n' +
            'Multiplas solicitações irão gerar multiplos tokens e códigos mas apenas o ultimo será considerado.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200, description: "Os 4 dígitos foram enviados ou reenviados para o email do usuário\n\n" +
            "{ token: sfdsdf, codigoVerificação: XXXX, message: Email enviado, statusCode: 200 }"
    }),
    (0, swagger_1.ApiResponse)({
        status: 404, description: "Não foi encontrado usuário com a matricula informada." +
            (new UsuarioNaoExisteError_1.UsuarioNaoExisteError()).toString()
    }),
    (0, constants_1.Public)(),
    (0, common_1.Post)('solicitarEsqueciSenha/:matricula'),
    __param(0, (0, common_1.Param)("matricula")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "solicitarEsqueciSenha", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Valida o codigo de 4 dígitos e libera acesso para a rota de informar a nova senha "finalizarEsqueciSenha"',
        description: 'Esse endpoint recebe o token gerado pela solicitação e os 4 dígitos. Se forem válidos, o acesso ao endpoint "finalizarEsqueciSenha" ficará disponível para acesso.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200, description: 'O código foi validado e o acesso ao "finalizarEsqueciMinhaSenha" está liberado.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401, description: 'O token expirou, necessário efetuar solicitação novamente, não existe solicitação feita para o usuário (Acessou a URL na "mão") ou o código informado não é válido.\n\n' +
            '{ message: Operação não permitida, statusCode: 401 }\n\n' +
            (new CodigoDeVerificacaoInvalidoError_1.CodigoDeVerificacaoInvalidoError()).toString()
    }),
    (0, swagger_1.ApiResponse)({
        status: 403, description: 'O código de verificação já foi validade. A operação de finalização já foi liberada'
    }),
    (0, common_1.Put)('validarCodigoEsqueciMinhaSenha'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, esqueciMinhaSenha_dto_1.EsqueciMinhSenhaDTO]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "validarCodigoEsqueciMinhaSenha", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Finaliza a operação de troca de senha, recebendo as novas senhas',
        description: 'Esse endpoint recebe as novas senhas e efetua a alteração. Esse endpoint é bloqueado e só libera caso os 4 dígitos forem validados.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200, description: 'A senha foi alterada.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401, description: 'O token expirou, necessário efetuar solicitação novamente.\n\n' +
            '{ message: Unauthorized, statusCode: 401 }'
    }),
    (0, swagger_1.ApiResponse)({
        status: 403, description: 'O codigo de validação não foi validade.\n\n' +
            (new CodigoNaoValidadoError_1.CodigoNaoValidadoError()).toString()
    }),
    (0, common_1.Put)('finalizarEsqueciMinhaSenha'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, finalizarEsqueciSenha_dto_1.FinalizarEsqueciSenhaDTO]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "finalizarEsqueciSenha", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('obterHistorico'),
    (0, swagger_1.ApiOperation)({
        summary: '[Rota Privada] Retorna o histórico de contagens do usuário. Nenhum dado de conta será retornado',
        description: "Nesta rota é necessário apenas o token para obter os dados do usuário."
    }),
    (0, swagger_1.ApiResponse)({
        status: 200, description: 'Retorna uma lista com todas as contagens efetuadas\n' +
            (new relatorio_dto_1.RelatorioDTO()).toString(),
        type: relatorio_dto_1.RelatorioDTO
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "obterHistorico", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('obterDados'),
    (0, swagger_1.ApiOperation)({
        summary: '[Rota Privada] Retorna os dados de conta do usuário. Nenhum dado de relatório será retornado',
        description: "Nesta rota é necessário apenas o token para obter os dados do usuário."
    }),
    (0, swagger_1.ApiResponse)({
        status: 200, description: 'Retorna uma lista com todos os dados pessoais do usuário.\n'
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "obterDados", null);
exports.UsuarioController = UsuarioController = __decorate([
    (0, common_1.Controller)('usuario'),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService])
], UsuarioController);
//# sourceMappingURL=usuario.controller.js.map