import { ObjectId } from 'mongoose';

export class AddCategoryBookDto {
  readonly name: string;
  readonly bookId: ObjectId;
}
