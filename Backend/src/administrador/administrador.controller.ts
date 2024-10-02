import { Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { AdministradorService } from "./administrador.service";

@Controller('administrador')
export class AdministradorController {

  constructor(
    private service: AdministradorService
  ) {}

  //@Delete('deletarUsuario')
  criarUsuario() {}

  //@Get('obterHistorico')
  obterHistorico() {}

  //@Get('historicos')
  historicos() {}

}