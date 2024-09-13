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
import { Roles } from '../auth/roles.decorator'; // Adjust path as needed
import { RolesGuard } from '../auth/roles.guard'; // Adjust path as needed

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
  @Roles('admin') // Only admin can access this endpoint
  @UseGuards(RolesGuard)
  findAll(@Request() req) {
    if (req.user.role === 'admin') {
      return this.booksService.findAll();
    }
    return this.booksService.findAll(req.user.userId); 
  }

  @Get(':id')
  @Roles('admin')
  @UseGuards(RolesGuard)
  findOne(@Param('id') id: string, @Request() req) {
    return this.booksService.findOne(+id, req.user.userId);
  }

  @Patch(':id')
  @ApiBody({ type: CreateBookDto })
  update(@Param('id') id: string, @Body() updateBookDto, @Request() req) {
    return this.booksService.update(+id, updateBookDto, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.booksService.remove(+id, req.user.userId);
  }
}
