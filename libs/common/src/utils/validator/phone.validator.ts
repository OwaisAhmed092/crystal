import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsPhoneNumber(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isPhoneNumber',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const phoneRegex = /^\+?[0-9]{1,3}-?[0-9]{6,14}$/;
                    return typeof value === 'string' && phoneRegex.test(value);
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be a valid phone number`;
                },
            },
        });
    };
}