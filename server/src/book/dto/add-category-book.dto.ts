import { ObjectId } from 'mongoose';

export class AddCategoryBookDto {
  readonly categories: string[];
  readonly bookId: ObjectId;
}
