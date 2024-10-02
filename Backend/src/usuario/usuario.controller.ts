import { Body, Controller, Get, HttpCode, Param, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { NovoUsuarioDTO, VerificarCodigoEmailDTO } from "src/DTOs";
import { ApiGoneResponse, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Public } from "src/auth/constants.ts/constants";
import { AuthGuard } from "src/auth/auth.guard";
import { DadosLoginDTO } from "src/DTOs/dadosLogin.dto";
import { AlterarSenhaDTO } from "src/DTOs/alterarsenha.dto";
import { AlterarEmailDTO } from "src/DTOs/alteraremail.dto";
import { EsqueciMinhSenhaDTO } from "src/DTOs/esqueciMinhaSenha.dto";
import { FinalizarEsqueciSenhaDTO } from "src/DTOs/finalizarEsqueciSenha.dto";
import { CodigoDeVerificacaoInvalidoError } from "src/excepts/CodigoDeVerificacaoInvalidoError";
import { DadoIndisponivelError } from "src/excepts/DadoIndisponivelError";
import { DadoEmBrancoError } from "src/excepts/DadoEmBrancoError";
import { NaoEhCpfError } from "src/excepts/NaoEhCpfError";
import { NaoEhEmailError } from "src/excepts/NaoEhEmailError";
import { SenhaPequenaError } from "src/excepts/SenhaPequenaError";
import { SolicitacaoExpirouError } from "src/excepts/SolicitacaoExpirouError";
import { SenhasDiferentesError } from "src/excepts/SenhasDiferentesError";
import { UsuarioNaoExisteError } from "src/excepts/UsuarioNaoExisteError";
import { CodigoJaValidadoError } from "src/excepts/CodigoJaValidadoError";
import { log } from "console";
import { CodigoNaoValidadoError } from "src/excepts/CodigoNaoValidadoError";
import { Logger } from "src/util/Logger";
import { RelatorioDTO } from "src/DTOs/relatorio.dto";

@Controller('usuario')
export class UsuarioController {

  private LOGGER: Logger = new Logger();

  constructor(
    private service: UsuarioService
  ) {}

  @Public()
  @Post('iniciarCriacao')
  @ApiOperation({
    summary: 'Inicia um processo de criação de usuário',
    description: "Neste endpoint, você deve fornecer a URL da página de finalização de criação. \nQuando o endpoint for concluído, um e-mail será enviado ao usuário com a URL fornecida e um token adicional. Esse token deve ser utilizado na página de finalização de criação. " +
                  "\n\n(ex: Se a URL fornecida for siteBonito.com/telaDeFinalizacao, o e-mail enviado ao usuário incluirá um link como siteBonito.com/telaDeFinalizacao?token=hgig5g4. O usuário deve clicar nesse link, e o front-end precisará capturar o token da URL para completar o processo de finalização de criação.)"
  })
  @ApiResponse({ 
    status: 201, description: 'A solicitação foi criada e a URL foi enviada.'
  })
  @ApiResponse({ 
    status: 400, description: 'Algum dado entregue se encontra fora do esperado.\n\n'+
                              (new DadoEmBrancoError("")).toString()+'\n\n'+
                              (new NaoEhCpfError("")).toString()+'\n\n'+
                              (new NaoEhEmailError("")).toString()+'\n\n'+
                              (new SenhaPequenaError()).toString(),
  })
  @ApiResponse({ 
    status: 409, description: 'O CPF ou E-mail informado já está em uso. "dadoIndisponivel" é a variável que informa qual deles já está em uso. \n\nSe algum usuário solicitar alteração de e-mail, o e-mail solicitado estará indisponível mesmo que não esteja de fato em uso.\n\n'+
                              (new DadoIndisponivelError("")).toString()
  })
  iniciarCriacao(@Body() novoUsuarioDTO: NovoUsuarioDTO) {
    novoUsuarioDTO.validarDados();
    return this.service.iniciarCriacao(novoUsuarioDTO);
  }

  @Public()
  @Post('finalizarCriacao')
  @ApiOperation({
    summary: 'Finaliza a criação de um usuário.',
    description: "Neste endpoint, você deve por no final da URL de requisição da API '?token=' seguido do token que consta na URL do navegador (a URL utilizada para acessar a página). \nSe nenhum token estiver presente, redirecione o usuário para outra página, pois ele não deve acessar esta tela sem um token." +
                  "\n\nEste token é essencial para liberar o acesso do novo usuário."
  })
  @ApiResponse({ 
    status: 201, description: 'O usuário foi criado e será retornado para fins de confirmação ou cache. Caso não retorne nada significa que o usuário já possui conta.\n\n'+
                              '{ usuario: { id: 1, dataDeCriacao: "2024-..., nome: "feioso", matricula: "123", cpf: "123", email: "a@a.a", criacaoFinalizada: true, relatorios: []}, statusCode: 201 }'
  })
  @ApiResponse({ 
    status: 401, description: 'A conta já foi finalizada ou o token não é válido.\n\n'+
                              (new SolicitacaoExpirouError()).toString()
  })
  finalizarCriacao(@Query('token') token: string) {
    return this.service.finalizarCriacao(token);
  }

  @Public()
  @ApiOperation({
    summary: 'Verifica se o CPF informado está disponível.',
    description: 'Retorno booleano puro informando se o CPF está disponível. \nCódigo de status não é necessário nessa operação.\n\n'+
                  '{ disponivel: true }'
  })
  @Get('cpfDisponivel/:cpf')
  async cpfDisponivel(@Param('cpf') cpf: string){
    cpf.trim();
    const disponivel = await this.service.cpfDisponivel(cpf);
    return { disponivel };
  }

  @Public()
  @ApiOperation({
    summary: 'Verifica se o E-mail informado está disponível.',
    description: 'Retorno booleano puro informando se o E-mail está disponível. \nCódigo de status não é necessário nessa operação.\n\n'+
                  '{ disponivel: true }'
  })
  @Get('emailDisponivel/:email')
  async emailDisponivel(@Param('email') email: string) {
    email.trim();
    const disponivel = await this.service.emailDisponivel(email);
    return { disponivel };
  }

  @Public()
  @ApiOperation({
    summary: 'Verifica se a matricula informada está disponível.',
    description: 'Retorno booleano puro informando se a matricula está disponível. \nCódigo de status não é necessário nessa operação.\n\n'+
                  '{ disponivel: true }'
  })
  @Get('matriculaDisponivel/:matricula')
  async matriculaDisponivel(@Param('matricula') matricula: string) {
    matricula.trim();
    const disponivel = await this.service.matriculaDisponivel(matricula);
    return { disponivel };
  }

  @Public()
  @ApiOperation({
    summary: 'Libera acesso de um determinado usuário ao sistema.',
    description: 'Se houver uma correspondência de matrícula e senha, a API retornará um token de acesso que DEVE ser fornecido para acessar as rotas privadas. \n\nO token tem duração de 30 minutos.'
  })
  @ApiResponse({ 
    status: 200, description: 'Usuário autorizado e token enviado.\n\n'+
                              '{ token: "skdfhk", usuario: {TODOS os dados do usuário, incluíndo seus relatórios e as linhas de cada relatório} statusCode: 200 }'
  })
  @ApiResponse({ 
    status: 400, description: 'Algum dado entregue se encontra fora do esperado.\n\n'+
                              (new DadoEmBrancoError("")).toString()+'\n\n'+
                              (new SenhaPequenaError()).toString(),
                              
  })
  @ApiResponse({ 
    status: 401, description: 'Acesso negado, não houve match.\n\n'+
                              '{ message: Matricula e/ou senha incorreto(s).,  statusCode: 401}'
  })
  @Post('entrar')
  @HttpCode(200)
  efetuarLogin(@Body() dadosLoginDTO: DadosLoginDTO) {
    dadosLoginDTO.validarDados();
    return this.service.efetuarLogin(dadosLoginDTO);
  }

  @UseGuards(AuthGuard)
  @Put('alterarSenha')
  @ApiOperation({
    summary: '[ROTA PRIVADA] Altera a senha do usuário.',
    description: 'Esta alteração de senha ocorre com o usuário autenticado, ou seja, ocorre no perfil do usuário, portanto, não precisa verificação via e-mail. Voce deve fornecer a senha atual do usuário e a nova senha. \nSe a senha atual corresponder à armazenada no sistema, a senha será atualizada.'
  })
  @ApiResponse({ 
    status: 200, description: 'Senha alterada com sucesso.'+
                              '{ message: Senha alterada, statusCode: 200 }'
  })
  @ApiResponse({ 
    status: 400, description: 'Algum dado entregue se encontra fora do esperado. Neste caso será informado "A senha atual" ou "A nova senha"\n\n'+
                              (new DadoEmBrancoError("")).toString()+'\n\n'+
                              (new SenhaPequenaError()).toString()+'\n\n'+
                              (new SenhasDiferentesError()).toString()
  })
  @ApiResponse({
    status: 401, description: 'O token expirou, necessário efetuar login novamente.\n\n'+
                              '{ message: Unauthorized, statusCode: 401 }'
  })
  alterarSenha(@Body() novaSenhaDTO: AlterarSenhaDTO, @Request() req) {
    const matricula = req['user'].matricula;
    novaSenhaDTO.validarDados();
    return this.service.alterarSenha(novaSenhaDTO, matricula);
  }

  @UseGuards(AuthGuard)
  @Post('solicitarAlterarEmail')
  @ApiOperation({
    summary: '[ROTA PRIVADA] Solicita alteração do e-mail do usuário.',
    description: 'A alteração de e-mail será realizada da mesma forma que no cadastro de usuário, sendo necessário fornecer a URL da página de finalizar alteração de e-mail. \nSerá enviado uma URL para o novo e-mail do usuário.'+
                  '\n\n(1) Caso o usuário solicite a alteração de e-mail para o mesmo endereço mais de uma vez, o mesmo token será fornecido.' +
                  '\n(2) Ao solicitar alteração de e-mail, o novo endereço de e-mail ficará indisponível para qualquer outra operação até que a solicitação seja cancelada.'
  })
  @ApiResponse({ 
    status: 201, description: 'A solicitação foi criada e está na lista de espera ou o email informado já pertence ao usuário.\n\n'+
                              '{ message: O email informado já pertence a sua conta., statusCode: 201 }\n\n'+
                              '{ message: Para continuar acesse o link que foi enviado para seu E-mail: statusCode: 201}'
  })
  @ApiResponse({ 
    status: 400, description: 'Algum dado entregue se encontra fora do esperado.'+
                              (new DadoEmBrancoError('')).toString()+'\n\n'+
                              (new SenhaPequenaError()).toString()+'\n\n'+
                              (new NaoEhEmailError('')).toString()+'\n\n'+
                              (new SenhasDiferentesError()).toString()
  })
  @ApiResponse({
    status: 401, description: 'O token expirou, necessário efetuar login novamente.\n\n'+
                              '{ message: Unauthorized, statusCode: 401 }'
  })
  @ApiResponse({ 
    status: 409, description: 'O e-mail informado não está disponível. \nOutro usuário está utilizando o e-mail ou o endereço de e-mail informado está na fila de alteração para outro usuário.\n\n'+
                              (new DadoIndisponivelError('')).toString()
  })
  solicitarAlterarEmail(@Body() novoEmailDTO: AlterarEmailDTO, @Request() req) {
    const matricula = req['user'].matricula;
    novoEmailDTO.validarDados();
    return this.service.solicitarAlterarEmail(novoEmailDTO, matricula);
  }

  @UseGuards(AuthGuard)
  @Put('finalizarAlterarEmail')
  @ApiOperation({
    summary: '[ROTA PRIVADA] Altera o e-mail do usuário.',
    description: 'Finaliza a operação de alterar de e-mail, removendo todas as outras solicitações de alterar e-mail feitas pelo usuário.'
  })
  @ApiResponse({ 
    status: 200, description: 'O e-mail foi alterado.'+
                              '{ statusCode: 200, usuario: {tooodos aqueles dados do usuário que não voi colocar de novo U_U tempraquê!} }'
  })
  @ApiResponse({
    status: 401, description: 'O token expirou, necessário efetuar login novamente.\n\n'+
                              '{ message: Unauthorized, statusCode: 401 }\n\n'+
                              (new SolicitacaoExpirouError()).toString()
  })
  finalizarAlterarEmail(@Query('token') token: string) {
    return this.service.finalizarAlterarEmail(token);
  }

  @ApiOperation({
    summary: 'Inicia o processo de esqueci senha',
    description: 'Esse endpoint envia o código de 4 dígitos para o email do usuário. Será entregue um token para garantir que os outros endpoints serão acessados dentro de um período de tempo estiamdo.\n\n'+
                  'Multiplas solicitações irão gerar multiplos tokens e códigos mas apenas o ultimo será considerado.'
  })
  @ApiResponse({
    status: 200, description: "Os 4 dígitos foram enviados ou reenviados para o email do usuário\n\n"+
                              "{ token: sfdsdf, codigoVerificação: XXXX, message: Email enviado, statusCode: 200 }"
  })
  @ApiResponse({
    status: 404, description: "Não foi encontrado usuário com a matricula informada."+
                              (new UsuarioNaoExisteError()).toString()
  })
  @Public()
  @Post('solicitarEsqueciSenha/:matricula')
  solicitarEsqueciSenha(@Param("matricula") matricula: string) {
    matricula = matricula.trim();
    return this.service.solicitarEsqueciMinhaSenha(matricula);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Valida o codigo de 4 dígitos e libera acesso para a rota de informar a nova senha "finalizarEsqueciSenha"',
    description: 'Esse endpoint recebe o token gerado pela solicitação e os 4 dígitos. Se forem válidos, o acesso ao endpoint "finalizarEsqueciSenha" ficará disponível para acesso.'
  })
  @ApiResponse({
    status: 200, description: 'O código foi validado e o acesso ao "finalizarEsqueciMinhaSenha" está liberado.'
  })
  @ApiResponse({
    status: 401, description: 'O token expirou, necessário efetuar solicitação novamente, não existe solicitação feita para o usuário (Acessou a URL na "mão") ou o código informado não é válido.\n\n'+
                              '{ message: Operação não permitida, statusCode: 401 }\n\n'+
                              (new CodigoDeVerificacaoInvalidoError()).toString()
  })
  @ApiResponse({
    status: 403, description: 'O código de verificação já foi validade. A operação de finalização já foi liberada'
  })
  @Put('validarCodigoEsqueciMinhaSenha')
  validarCodigoEsqueciMinhaSenha(@Request() req, @Body() esqueciMinhSenhaDTO: EsqueciMinhSenhaDTO) {
    const matricula = req['user'].id;
    esqueciMinhSenhaDTO.validarDados();
    return this.service.validarCodigoEsqueciMinhaSenha(esqueciMinhSenhaDTO, matricula);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Finaliza a operação de troca de senha, recebendo as novas senhas',
    description: 'Esse endpoint recebe as novas senhas e efetua a alteração. Esse endpoint é bloqueado e só libera caso os 4 dígitos forem validados.'
  })
  @ApiResponse({
    status: 200, description: 'A senha foi alterada.'
  })
  @ApiResponse({
    status: 401, description: 'O token expirou, necessário efetuar solicitação novamente.\n\n'+
                              '{ message: Unauthorized, statusCode: 401 }'
  })
  @ApiResponse({
    status: 403, description: 'O codigo de validação não foi validade.\n\n'+
                              (new CodigoNaoValidadoError()).toString()
  })
  @Put('finalizarEsqueciMinhaSenha')
  finalizarEsqueciSenha(@Request() req, @Body() finalizarEsqueciSenhaDTO: FinalizarEsqueciSenhaDTO) {
    const matricula = req['user'].id;
    finalizarEsqueciSenhaDTO.validarDados();
    return this.service.finalizarEsqueciSenha(finalizarEsqueciSenhaDTO, matricula);
  }

  @UseGuards(AuthGuard)
  @Get('obterHistorico')
  @ApiOperation({
    summary: '[Rota Privada] Retorna o histórico de contagens do usuário. Nenhum dado de conta será retornado',
    description: "Nesta rota é necessário apenas o token para obter os dados do usuário."
  })
  @ApiResponse({
    status: 200, description: 'Retorna uma lista com todas as contagens efetuadas\n'+
                              (new RelatorioDTO()).toString(),
    type: RelatorioDTO
  })
  obterHistorico(@Request() req) {
    const matricula = req['user'].matricula;
    return this.service.obterHistorico(matricula);
  }

  @UseGuards(AuthGuard)
  @Get('obterDados')
  @ApiOperation({
    summary: '[Rota Privada] Retorna os dados de conta do usuário. Nenhum dado de relatório será retornado',
    description: "Nesta rota é necessário apenas o token para obter os dados do usuário."
  })
  @ApiResponse({
    status: 200, description: 'Retorna uma lista com todos os dados pessoais do usuário.\n'
  })
  obterDados(@Request() req) {
    const matricula = req['user'].matricula;
    return this.service.obterDados(matricula);
  }

}