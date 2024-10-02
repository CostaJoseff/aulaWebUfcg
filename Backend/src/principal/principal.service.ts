import { Injectable } from "@nestjs/common";
import { execFile } from 'child_process';
import { promisify } from 'util';
import { LinhaDTO } from "src/DTOs/linha.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { error, log } from "console";
import { Direcao, StatusRelatorio } from "@prisma/client";
import { SolicitarContagemDTO } from "src/DTOs/solicitarContagem.dto";
import { TabelaDTO } from "src/DTOs/tabela.dto";
import { Logger } from "src/util/Logger";
import * as path from 'path';
import * as fs from 'fs';
import Queue from 'queue-fifo';

@Injectable()
export class PrincipalService {

  private LOGGER: Logger = new Logger();
  private contando: boolean = false;

  constructor(private prisma: PrismaService) {}

  async efetuarContagem(matricula: string, solicitarContagemDTO: SolicitarContagemDTO, nomeDoVideo: string) {
    this.LOGGER.alerta("Upload efetuado", matricula);
    const relatorio = await this.prisma.relatorio.create({
      data: {
        url: `./uploads/${matricula}/${nomeDoVideo}`,
        usuario: { connect: { matricula } },
        posicaoNaFila: 0,
        status: StatusRelatorio.CONCLUIDO,
        linhas: {
          create: solicitarContagemDTO.linhas.map(linha => ({
            nome: linha.nome,
            coordenadas: linha.coordenadas,
            direcao: linha.direcao,
            cor: linha.cor,
            carros: Math.floor(Math.random() * (50)),
            motos: Math.floor(Math.random() * (50)),
            onibus: Math.floor(Math.random() * (50)),
            caminhoes: Math.floor(Math.random() * (50)),
            vans: Math.floor(Math.random() * (50))
          }))
        }
      },
      include: { linhas: true }
    });

    return {
      message: "Upload concluído, a contagem está sendo efetuada",
      statusCode: 201,
    };
  }
}