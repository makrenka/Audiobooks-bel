import { ObjectId } from 'mongoose';

export class CreateSectionDto {
  readonly name: string;
  readonly bookId: ObjectId;
}
