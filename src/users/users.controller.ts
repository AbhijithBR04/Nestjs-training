import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UsersController {

constructor(private readonly usersService: UsersService){}

  @Get()
  findAll(@Query('role') role?: 'sw' | 'qa' | 'dev' | 'pm') {
    return this.usersService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id' , ParseIntPipe ) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body(ValidationPipe) createuserdto: createUserDto) {
    return this.usersService.create(createuserdto);
  }

  @Patch(':id')
  update(@Param('id' , ParseIntPipe) id: number, @Body(ValidationPipe) updateuserdto: UpdateUserDto) {
    return this.usersService.update(id, updateuserdto)
  }
  @Delete(':id')
  delete(@Param('id',ParseIntPipe) id: number) {
    return this.usersService.delete(id)
  }
}
