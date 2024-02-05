import { ObjectId } from 'mongoose';

export class BanUserDto {
  readonly userId: ObjectId;
  readonly banReason: string;
}
