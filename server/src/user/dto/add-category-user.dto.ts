import { ObjectId } from 'mongoose';

export class AddCategoryUserDto {
  readonly userId: ObjectId;
  readonly name: string[];
}
