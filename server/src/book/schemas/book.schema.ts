import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Review } from './review.schema';
import { Section } from './section.schema';
import { Category } from './category.schema';
import { User } from 'src/user/schemas/user.schema';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  cover: string;

  @Prop()
  summary: string;

  @Prop()
  audio: string;

  @Prop()
  listens: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] })
  reviews: Review[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }] })
  sections: Section[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
  categories: Category[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const BookSchema = SchemaFactory.createForClass(Book);
