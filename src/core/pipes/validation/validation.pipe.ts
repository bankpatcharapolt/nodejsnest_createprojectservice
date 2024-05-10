import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      let message = 'Some field is invalid';
      if (Object.prototype.hasOwnProperty.call(errors[0], 'constraints')) {
        const keys = Object.keys(errors[0].constraints);
        if (
          keys.length > 0 &&
          Object.prototype.hasOwnProperty.call(errors[0].constraints, keys[0])
        ) {
          message = errors[0].constraints[keys[0]];
        }
      }

      throw new BadRequestException(message);
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
