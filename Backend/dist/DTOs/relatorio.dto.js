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
exports.RelatorioDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const linhaSwagger_dto_1 = require("./linhaSwagger.dto");
class RelatorioDTO {
}
exports.RelatorioDTO = RelatorioDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    __metadata("design:type", Number)
], RelatorioDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Caminho do youtube caso tenha sido efetuado upload ou caminho do backend (caminho do backend é utilizado pelo backend)",
        example: "/app/uploads/123456/resultado_video_resultado.mp4 ou https://youtube.com/video"
    }),
    __metadata("design:type", Number)
], RelatorioDTO.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], RelatorioDTO.prototype, "dataDeExecucao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "5 tipos de status: EM_EXECUCAO, CONCLUIDO, NO_YOUTUBE, ERRO, USUARIO_DELETADO",
        example: "EM_EXECUCAO"
    }),
    __metadata("design:type", String)
], RelatorioDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Conjunto de linhas daquele relatorio",
        type: linhaSwagger_dto_1.LinhaSwaggerDTO
    }),
    __metadata("design:type", Array)
], RelatorioDTO.prototype, "linhas", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "123456"
    }),
    __metadata("design:type", String)
], RelatorioDTO.prototype, "usuarioMatricula", void 0);
//# sourceMappingURL=relatorio.dto.js.map