import { ObjectId } from 'mongoose';

export class CreateCategoryDto {
  readonly name: string;
  readonly bookId: ObjectId;
}
