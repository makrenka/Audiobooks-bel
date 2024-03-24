import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Section } from './schemas/section.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateSectionDto } from './dto/create-section.dto';

@Injectable()
export class SectionService {
  constructor(
    @InjectModel(Section.name) private sectionModel: Model<Section>,
  ) {}

  async createSection(dto: CreateSectionDto): Promise<Section> {
    const section = await this.sectionModel.create({ ...dto });
    return section;
  }

  async getSections(): Promise<Section[]> {
    const sections = await this.sectionModel.find();
    return sections;
  }

  async deleteSection(id: ObjectId): Promise<Section> {
    const section = await this.sectionModel.findByIdAndDelete(id);
    return section;
  }
}
