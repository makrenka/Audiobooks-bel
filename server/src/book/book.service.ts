import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { Model, ObjectId } from 'mongoose';
import { Review } from './schemas/review.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { FileService, FileType } from 'src/file/file.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { Section } from './schemas/section.schema';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    @InjectModel(Review.name) private reviewModel: Model<Review>,
    @InjectModel(Section.name) private sectionModel: Model<Section>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    private fileService: FileService,
  ) {}

  async create(dto: CreateBookDto, cover, audio, coverBigSize): Promise<Book> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const coverPath = this.fileService.createFile(FileType.IMAGE, cover);
    const coverBigSizePath = this.fileService.createFile(
      FileType.IMAGE,
      coverBigSize,
    );
    const book = await this.bookModel.create({
      ...dto,
      listens: 0,
      audio: audioPath,
      cover: coverPath,
      coverBigSize: coverBigSizePath,
    });
    return book;
  }

  async getAll(count = 5, offset = 0): Promise<Book[]> {
    const books = await this.bookModel
      .find()
      .skip(Number(offset))
      .limit(Number(count))
      .populate('sections')
      .populate('categories');
    return books;
  }

  async search(query: string): Promise<Book[]> {
    const books = await this.bookModel.find({
      title: { $regex: new RegExp(query, 'i') },
    });
    return books;
  }

  async getOne(id: ObjectId): Promise<Book> {
    const book = (
      await (
        await (await this.bookModel.findById(id)).populate('reviews')
      ).populate('sections')
    ).populate('categories');
    return book;
  }

  async delete(id: ObjectId): Promise<Book> {
    const book = await this.bookModel.findByIdAndDelete(id);
    return book;
  }

  async addReview(dto: CreateReviewDto): Promise<Review> {
    const book = await this.bookModel.findById(dto.bookId);
    const review = await this.reviewModel.create({ ...dto });
    book.reviews.push(review);
    await book.save();
    return review;
  }

  async listen(id: ObjectId) {
    const book = await this.bookModel.findById(id);
    book.listens += 1;
    book.save();
  }

  async addSection(dto: CreateSectionDto): Promise<Section> {
    const book = await this.bookModel.findById(dto.bookId);
    const section = await this.sectionModel.create({ ...dto });
    book.sections.push(section);
    await book.save();
    return section;
  }

  async addCategory(dto: CreateCategoryDto): Promise<Category> {
    const book = await this.bookModel.findById(dto.bookId);
    const category = await this.categoryModel.create({ ...dto });
    book.categories.push(category);
    await book.save();
    return category;
  }
}
