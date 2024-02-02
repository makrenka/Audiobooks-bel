import { Controller, Get } from '@nestjs/common';

@Controller('/books')
export class BookController {
  create() {}

  @Get()
  getAll() {
    return 'WORK';
  }

  getOne() {}

  delete() {}
}
