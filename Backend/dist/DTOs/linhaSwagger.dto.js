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
exports.LinhaSwaggerDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class LinhaSwaggerDTO {
}
exports.LinhaSwaggerDTO = LinhaSwaggerDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], LinhaSwaggerDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Semaforo de entrada Rua Bonita" }),
    __metadata("design:type", String)
], LinhaSwaggerDTO.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [15, 3566, 145, 654] }),
    __metadata("design:type", Array)
], LinhaSwaggerDTO.prototype, "coordenadas", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Existem 4 tipos de direção: CIMA_BAIXO, BAIXO_CIMA, DIREITA_ESQUERDA e ESQUERDA_DIREITA",
        example: client_1.Direcao.CIMA_BAIXO
    }),
    __metadata("design:type", String)
], LinhaSwaggerDTO.prototype, "direcao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [255, 51, 21] }),
    __metadata("design:type", Array)
], LinhaSwaggerDTO.prototype, "cor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], LinhaSwaggerDTO.prototype, "carros", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], LinhaSwaggerDTO.prototype, "motos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], LinhaSwaggerDTO.prototype, "onibus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], LinhaSwaggerDTO.prototype, "caminhoes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], LinhaSwaggerDTO.prototype, "vans", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    __metadata("design:type", Number)
], LinhaSwaggerDTO.prototype, "relatorioId", void 0);
//# sourceMappingURL=linhaSwagger.dto.js.map