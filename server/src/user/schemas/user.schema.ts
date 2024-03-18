import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Book } from 'src/book/schemas/book.schema';
import { Category } from 'src/book/schemas/category.schema';
import { Role } from './role.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  img: string;

  @Prop()
  password: string;

  @Prop()
  banned: boolean;

  @Prop()
  banReason: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Books' }] })
  books: Book[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
  categories: Category[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
