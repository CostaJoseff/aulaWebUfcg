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
exports.PrincipalController = void 0;
const common_1 = require("@nestjs/common");
const principal_service_1 = require("./principal.service");
const platform_express_1 = require("@nestjs/platform-express");
const class_transformer_1 = require("class-transformer");
const auth_guard_1 = require("../auth/auth.guard");
const solicitarContagem_dto_1 = require("../DTOs/solicitarContagem.dto");
const swagger_1 = require("@nestjs/swagger");
let PrincipalController = class PrincipalController {
    constructor(service) {
        this.service = service;
    }
    efetuarContagem(req, file) {
        const solicitarContagemDTO = (0, class_transformer_1.plainToInstance)(solicitarContagem_dto_1.SolicitarContagemDTO, JSON.parse(req.body.linhasTabela));
        return this.service.efetuarContagem(req['user'].matricula, solicitarContagemDTO, req['nomeDoVideo']);
    }
};
exports.PrincipalController = PrincipalController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('efetuarContagem'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('arquivo')),
    (0, swagger_1.ApiOperation)({
        summary: "Armazena o vídeo e inicia o processo de contagem.",
        description: "Neste endpoint, voce deve fornecer o vídeo nomeado como 'arquivo' e o body nomeado como 'linhasTabela' com os dados referente a contagem como descrito abaixo.\n\nNo final da documentação, em schemas, é possível encontrar os objetos brevemente explicados\n\nAo final do upload será adicionado um relatório zerado, referente ao upload atual e ao final da contagem, o relatório será atualizado com a url do youtube."
    }),
    (0, swagger_1.ApiBody)({ type: solicitarContagem_dto_1.SolicitarContagemDTO }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PrincipalController.prototype, "efetuarContagem", null);
exports.PrincipalController = PrincipalController = __decorate([
    (0, common_1.Controller)(''),
    __metadata("design:paramtypes", [principal_service_1.PrincipalService])
], PrincipalController);
//# sourceMappingURL=principal.controller.js.map