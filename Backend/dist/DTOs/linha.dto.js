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
exports.LinhaDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class LinhaDTO {
}
exports.LinhaDTO = LinhaDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LinhaDTO.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Os pontos x e y da linha organizados como [xi, yi, xf, yf]",
        example: [0, 100, 50, 150]
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], LinhaDTO.prototype, "coordenadas", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Cor organizada em RGB limitada a 255",
        example: [0, 255, 255]
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], LinhaDTO.prototype, "cor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "CIMA_BAIXO" }),
    (0, class_validator_1.IsEnum)(client_1.Direcao),
    __metadata("design:type", String)
], LinhaDTO.prototype, "direcao", void 0);
//# sourceMappingURL=linha.dto.js.map