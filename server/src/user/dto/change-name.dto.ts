import { ObjectId } from 'mongoose';

export class ChangeNameDto {
  readonly userId: ObjectId;
  readonly name: string;
}
