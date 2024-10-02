"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrincipalService = void 0;
const common_1 = require("@nestjs/common");
const child_process_1 = require("child_process");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const Logger_1 = require("../util/Logger");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const queue_fifo_1 = __importDefault(require("queue-fifo"));
let PrincipalService = class PrincipalService {
    constructor(prisma) {
        this.prisma = prisma;
        this.LOGGER = new Logger_1.Logger();
        this.queue = new queue_fifo_1.default();
        this.contando = false;
    }
    async efetuarContagem(matricula, solicitarContagemDTO, nomeDoVideo) {
        this.LOGGER.alerta("Upload efetuado", matricula);
        const relatorio = await this.prisma.relatorio.create({
            data: {
                url: `./uploads/${matricula}/${nomeDoVideo}`,
                usuario: { connect: { matricula } },
                posicaoNaFila: this.queue.size() + 1,
                linhas: {
                    create: solicitarContagemDTO.linhas.map(linha => ({
                        nome: linha.nome,
                        coordenadas: linha.coordenadas,
                        direcao: linha.direcao,
                        cor: linha.cor,
                        carros: 0,
                        motos: 0,
                        onibus: 0,
                        caminhoes: 0,
                        vans: 0
                    }))
                }
            },
            include: { linhas: true }
        });
        this.queue.enqueue({
            matricula,
            solicitarContagemDTO,
            nomeDoVideo,
            relatorioId: relatorio.id
        });
        if (!this.contando) {
            this.chamarPython();
            return {
                message: "Upload concluído, a contagem está sendo efetuada",
                statusCode: 201,
            };
        }
        else {
            return {
                message: `Upload concluído, o vídeo está na posição ${this.queue.size()}`,
                statusCode: 201,
            };
        }
    }
    streamToConsole(stream, matricula) {
        stream.on('data', (chunk) => {
            process.stdout.write(chunk);
        });
        stream.on('error', (error) => {
            this.LOGGER.erro(`Stream error: ${error}`, matricula);
        });
    }
    direcaoToPython(direcao) {
        switch (direcao) {
            case client_1.Direcao.CIMA_BAIXO:
                return 0;
            case client_1.Direcao.BAIXO_CIMA:
                return 1;
            case client_1.Direcao.DIREITA_ESQUERDA:
                return 2;
            case client_1.Direcao.ESQUERDA_DIREITA:
                return 3;
        }
    }
    produzirLinhasPython(linhas) {
        const linhasPython = [];
        linhas.forEach(linha => {
            linhasPython.push({
                x1: linha.coordenadas[0],
                y1: linha.coordenadas[1],
                x2: linha.coordenadas[2],
                y2: linha.coordenadas[3],
                nome: linha.nome,
                cor: linha.cor,
                direcao: this.direcaoToPython(linha.direcao),
            });
        });
        return linhasPython;
    }
    produzirTabela(linhasPython, tabelaDTO) {
        return {
            xi: tabelaDTO.xi,
            yi: tabelaDTO.yi,
            xf: tabelaDTO.xf,
            yf: tabelaDTO.yf,
        };
    }
    async chamarPython() {
        this.contando = true;
        while (this.queue.size() != 0) {
            const solicitacao = this.queue.dequeue();
            const solicitarContagemDTO = solicitacao.solicitarContagemDTO;
            const matricula = solicitacao.matricula;
            const filepath = `./uploads/${solicitacao.matricula}/${solicitacao.nomeDoVideo}`;
            const relatorioId = solicitacao.relatorioId;
            const nomeDoVideo = solicitacao.nomeDoVideo;
            this.LOGGER.alerta("Iniciando contagem", matricula);
            const caminhoIA = "./IA/contador4.py";
            const linhasPython = this.produzirLinhasPython(solicitarContagemDTO.linhas);
            const tabelaDoVideo = this.produzirTabela(linhasPython, solicitarContagemDTO.tabelaDTO);
            const jsonData = JSON.stringify({
                relatorioId,
                linhas: linhasPython,
                tabela: tabelaDoVideo,
                filepath,
                nome_saida: `resultado__${nomeDoVideo}__resultado`,
                matricula
            });
            const child = (0, child_process_1.execFile)('python', ['-u', caminhoIA, jsonData]);
            this.streamToConsole(child.stdout, matricula);
            this.streamToConsole(child.stderr, matricula);
            child.on('close', async (code) => {
                if (code === 0) {
                    this.LOGGER.sucesso("Contagem finalizada", matricula);
                }
                else {
                    this.LOGGER.erro("Contagem Falhou", matricula);
                    await this.prisma.relatorio.update({
                        where: { id: relatorioId },
                        data: {
                            status: client_1.StatusRelatorio.ERRO
                        }
                    });
                }
                let directoryPath = path.join(__dirname, '../..', 'uploads');
                directoryPath = path.join(directoryPath, matricula);
                const pathResultado = path.join(directoryPath, `resultado__${nomeDoVideo}__resultado.mp4`);
                fs.unlink(pathResultado, (err) => {
                    if (!err.message.includes("no such file or directory")) {
                        this.LOGGER.erro("Falha ao remover arquivo de vídeo resultado", matricula);
                        this.LOGGER.sistema(err.message);
                    }
                    else {
                        this.LOGGER.sucesso("Arquivo de vídeo resultado deletado", matricula);
                    }
                });
                const pathVideoOriginal = path.join(directoryPath, nomeDoVideo);
                fs.unlink(pathVideoOriginal, (err) => {
                    if (!err.message.includes("no such file or directory")) {
                        this.LOGGER.erro("Falha ao remover arquivo de vídeo original", matricula);
                        this.LOGGER.sistema(err.message);
                    }
                    else {
                        this.LOGGER.sucesso("Arquivo de vídeo original deletado", matricula);
                    }
                });
            });
        }
    }
};
exports.PrincipalService = PrincipalService;
exports.PrincipalService = PrincipalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrincipalService);
//# sourceMappingURL=principal.service.js.map