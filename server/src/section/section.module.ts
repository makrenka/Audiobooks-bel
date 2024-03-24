import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Section, SectionSchema } from './schemas/section.schema';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Section.name, schema: SectionSchema }]),
    AuthModule,
  ],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {}
