import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SectionService } from './section.service';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateSectionDto } from './dto/create-section.dto';
import { ObjectId } from 'mongoose';

@Controller('/sections')
export class SectionController {
  constructor(private sectionService: SectionService) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  createSection(@Body() dto: CreateSectionDto) {
    return this.sectionService.createSection(dto);
  }

  @Get()
  getSections() {
    return this.sectionService.getSections();
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  deleteSection(@Param('id') id: ObjectId) {
    return this.sectionService.deleteSection(id);
  }
}
