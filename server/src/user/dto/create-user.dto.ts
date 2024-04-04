import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  readonly name: string;

  readonly displayName: string;

  @IsString({ message: 'Must be string' })
  @IsEmail({}, { message: 'Uncorrect email' })
  readonly email: string;

  @IsString({ message: 'Must be string' })
  @Length(4, 16, { message: 'Min 4 symbols, max - 16' })
  readonly password: string;

  readonly remember: boolean;
}
