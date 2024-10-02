import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { PrismaModule } from './prisma/prisma.module';
import { AdministradorModule } from './administrador/administrador.module';
import { PrincipalModule } from './principal/principal.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { PomboCorreioModule } from './pombo-correio/pombo-correio.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    UsuarioModule, 
    PrismaModule,
    AdministradorModule, 
    PrincipalModule, PomboCorreioModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule {}
