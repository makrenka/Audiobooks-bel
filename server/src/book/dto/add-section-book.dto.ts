import { ObjectId } from 'mongoose';

export class AddSectionBookDto {
  readonly sections: string[];
  readonly bookId: ObjectId;
}
