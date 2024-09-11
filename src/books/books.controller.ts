import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
@ApiTags('Books')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiBody({ type: CreateBookDto })
  create(@Body() createBookDto, @Request() req) {
    return this.booksService.create({
      ...createBookDto,
      userId: req.user.userId,
    });
  }

  @Get()
  findAll(@Request() req) {
    return this.booksService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.booksService.findOne(+id, req.user.userId);
  }

  @Patch(':id')
  @ApiBody({type: CreateBookDto})
  update(@Param('id') id: string, @Body() updateBookDto, @Request() req) {
    return this.booksService.update(+id, updateBookDto, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.booksService.remove(+id, req.user.userId);
  }
}
