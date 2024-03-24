import { ObjectId } from 'mongoose';

export class AddSectionBookDto {
  readonly name: string;
  readonly bookId: ObjectId;
}
