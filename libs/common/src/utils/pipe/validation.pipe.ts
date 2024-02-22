import {
  PipeTransform,
  ArgumentMetadata,
  HttpStatus,
  Injectable,
  Optional,
  ValidationPipeOptions,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass, classToPlain } from 'class-transformer';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  protected isTransformEnabled: boolean;
  protected isDetailedOutputDisabled?: boolean;
  protected validatorOptions: ValidatorOptions;

  constructor(
    @Optional() options: ValidationPipeOptions = { whitelist: true },
  ) {
    options = options || {};
    const { transform, disableErrorMessages, ...validatorOptions } = options;
    this.isTransformEnabled = !!transform;
    this.validatorOptions = validatorOptions;
    this.isDetailedOutputDisabled = disableErrorMessages;
  }

  async transform(@Optional() value: any, metadata: ArgumentMetadata) {
    if (value instanceof Object && this.isEmpty(value)) {
      throw new HttpException(
        'Validation failed: No data submitted',
        HttpStatus.BAD_REQUEST,
      );
    }
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object, this.validatorOptions);
    if (errors.length > 0) {
      throw new HttpException(
        `Validation failed: ${this.formatError(errors)}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.isTransformEnabled
      ? object
      : Object.keys(this.validatorOptions).length > 0
        ? classToPlain(object)
        : value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private isEmpty(value: any) {
    if (Object.keys(value).length > 0) {
      return false;
    }
    return true;
  }

  private formatError(errors: any[]) {
    return errors
      .map((err) => {
        for (let property in err.constraints) {
          return err.constraints[property];
        }
      })
      .join(', ');
  }
}
