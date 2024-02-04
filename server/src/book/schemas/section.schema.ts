import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Book } from './book.schema';

export type SectionDocument = HydratedDocument<Section>;

@Schema()
export class Section {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book' })
  book: Book;
}

export const SectionSchema = SchemaFactory.createForClass(Section);
