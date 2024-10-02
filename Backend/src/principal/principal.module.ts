import { Module } from '@nestjs/common';
import { PrincipalController } from './principal.controller';
import { PrincipalService } from './principal.service';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { log } from 'console';

@Module({
  imports: [
    MulterModule.register({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          const caminho = `./uploads/${req['user'].matricula}`;
          require('fs').mkdirSync(caminho, {recursive: true});
          cb(null, caminho);
        },
        filename: (req, file, cb) => {
          const nomeUnico = `${req['user'].matricula}-${Date.now()}`;
          req["nomeDoVideo"] = nomeUnico+'-'+file.originalname;
          cb(null, nomeUnico+'-'+file.originalname)
        }
      })
    })
  ],
  controllers: [PrincipalController],
  providers: [PrincipalService],
})
export class PrincipalModule {}
