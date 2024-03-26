import { ObjectId } from 'mongoose';

export class ChangeEmailDto {
  readonly userId: ObjectId;
  readonly email: string;
}
