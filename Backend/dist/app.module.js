"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const usuario_module_1 = require("./usuario/usuario.module");
const prisma_module_1 = require("./prisma/prisma.module");
const administrador_module_1 = require("./administrador/administrador.module");
const principal_module_1 = require("./principal/principal.module");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const auth_guard_1 = require("./auth/auth.guard");
const pombo_correio_module_1 = require("./pombo-correio/pombo-correio.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            usuario_module_1.UsuarioModule,
            prisma_module_1.PrismaModule,
            administrador_module_1.AdministradorModule,
            principal_module_1.PrincipalModule, pombo_correio_module_1.PomboCorreioModule
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard
            }
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map