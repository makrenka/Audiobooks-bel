import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Book } from './book.schema';

export type ReviewDocument = HydratedDocument<Review>;

@Schema()
export class Review {
  @Prop()
  username: string;

  @Prop()
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book' })
  book: Book;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
