import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class ParseJsonPipe implements PipeTransform {
    transform(value: any, { metatype }: ArgumentMetadata): Promise<any[]>;
}
