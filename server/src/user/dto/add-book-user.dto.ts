import { ObjectId } from 'mongoose';

export class AddBookUserDto {
  readonly userId: ObjectId;
  readonly bookId: ObjectId;
}
