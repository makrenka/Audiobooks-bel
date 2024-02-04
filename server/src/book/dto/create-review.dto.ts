import { ObjectId } from 'mongoose';

export class CreateReviewDto {
  readonly username: string;
  readonly text: string;
  readonly bookId: ObjectId;
}
