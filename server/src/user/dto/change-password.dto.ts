import { IsString, Length } from 'class-validator';
import { ObjectId } from 'mongoose';

export class ChangePasswordDto {
  readonly userId: ObjectId;

  readonly oldPassword: string;

  @IsString({ message: 'Must be string' })
  @Length(4, 16, { message: 'Min 4 symbols, max - 16' })
  readonly newPassword: string;

  readonly newPasswordRepeat: string;
}
