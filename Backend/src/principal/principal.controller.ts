import { Body, Controller, Delete, Get, Param, Post, Put, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { PrincipalService } from "./principal.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { plainToInstance } from 'class-transformer';
import { AuthGuard } from "src/auth/auth.guard";
import { SolicitarContagemDTO } from "src/DTOs/solicitarContagem.dto";
import { ApiBody, ApiOperation } from "@nestjs/swagger";

@Controller('')
export class PrincipalController {

  constructor(
    private service: PrincipalService
  ) {}

  @UseGuards(AuthGuard)
  @Post('efetuarContagem')
  // @UseInterceptors(FileInterceptor('arquivo'))
  @ApiOperation({
    summary: "Armazena o vídeo e inicia o processo de contagem.",
    description: "Neste endpoint, voce deve fornecer o vídeo nomeado como 'arquivo' e o body nomeado como 'linhasTabela' com os dados referente a contagem como descrito abaixo.\n\nNo final da documentação, em schemas, é possível encontrar os objetos brevemente explicados\n\nAo final do upload será adicionado um relatório zerado, referente ao upload atual e ao final da contagem, o relatório será atualizado com a url do youtube."
  })
  @ApiBody({ type: SolicitarContagemDTO })
  efetuarContagem(@Request() req, /*@UploadedFile() file: Express.Multer.File*/) { // , @Body('solicitarContagem') solicitarContagemDTO: SolicitarContagemDTO
    const solicitarContagemDTO = plainToInstance(SolicitarContagemDTO, JSON.parse(req.body.linhasTabela));
    return this.service.efetuarContagem(req['user'].matricula, solicitarContagemDTO, req['nomeDoVideo']);
  }

}