import { ObjectId } from 'mongoose';

export class ChangePasswordDto {
  readonly userId: ObjectId;
  readonly oldPassword: string;
  readonly newPassword: string;
  readonly newPasswordRepeat: string;
}
