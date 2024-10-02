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
exports.SolicitarContagemDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const linha_dto_1 = require("./linha.dto");
const tabela_dto_1 = require("./tabela.dto");
const class_validator_1 = require("class-validator");
class SolicitarContagemDTO {
}
exports.SolicitarContagemDTO = SolicitarContagemDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [linha_dto_1.LinhaDTO] }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SolicitarContagemDTO.prototype, "linhas", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: tabela_dto_1.TabelaDTO }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", tabela_dto_1.TabelaDTO)
], SolicitarContagemDTO.prototype, "tabelaDTO", void 0);
//# sourceMappingURL=solicitarContagem.dto.js.map