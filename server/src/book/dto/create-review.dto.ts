import { ObjectId } from 'mongoose';

export class CreateReviewDto {
  readonly userneme: string;
  readonly text: string;
  readonly bookId: ObjectId;
}
