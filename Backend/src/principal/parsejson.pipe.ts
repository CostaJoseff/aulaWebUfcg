import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ParseJsonPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (typeof value !== 'string') {
      throw new BadRequestException('Validation failed');
    }
    try {
      const parsed = JSON.parse(value);
      if (!Array.isArray(parsed)) {
        throw new BadRequestException('Validation failed');
      }
      const objects = plainToInstance(metatype, parsed);
      const errors = await validate(objects);
      if (errors.length > 0) {
        throw new BadRequestException('Validation failed');
      }
      return objects;
    } catch (error) {
      throw new BadRequestException('Invalid JSON string');
    }
  }
}
