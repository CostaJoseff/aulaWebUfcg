import { Module } from '@nestjs/common';
import { PomboCorreioService } from './pombo-correio.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from "@nestjs/config";

@Module({
    providers: [PomboCorreioService],
    exports: [PomboCorreioService]
})
export class PomboCorreioModule {}
