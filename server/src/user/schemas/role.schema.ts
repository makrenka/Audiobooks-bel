import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {
  @Prop()
  value: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  user: User;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
