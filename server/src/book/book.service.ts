import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { Model, ObjectId } from 'mongoose';
import { Review } from './schemas/review.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { FileService, FileType } from 'src/file/file.service';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    @InjectModel(Review.name) private reviewModel: Model<Review>,
    private fileService: FileService,
  ) {}

  async create(dto: CreateBookDto, cover, audio): Promise<Book> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const coverPath = this.fileService.createFile(FileType.IMAGE, cover);
    const book = await this.bookModel.create({
      ...dto,
      listens: 0,
      audio: audioPath,
      cover: coverPath,
    });
    return book;
  }

  async getAll(): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }

  async getOne(id: ObjectId): Promise<Book> {
    const book = (await this.bookModel.findById(id)).populate('reviews');
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
}
