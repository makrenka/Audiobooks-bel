import { ObjectId } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export class ForgottenPasswordDto {
  readonly email: string;
  readonly name: string;
  readonly userId: ObjectId;
}
