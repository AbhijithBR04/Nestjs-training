import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma, Role } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { ApiTags, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@SkipThrottle()
@Controller('employees')
@ApiTags('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}


  //create a new employee
  @Post() 
  @ApiResponse({
    status: 201,
    description: 'The employee has been successfully created.',
    type: CreateEmployeeDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    console.log(createEmployeeDto);
    return this.employeesService.create(createEmployeeDto);
  }


   // get all employees
  @SkipThrottle({ default: false })
  @Get()
  @ApiQuery({ name: 'role', required: false, enum: Role })
  @ApiResponse({
    status: 200,
    description: 'List of employees.',
    type: [CreateEmployeeDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  findAll(@Query('role') role?: Role) {
    return this.employeesService.findAll(role);
  }

  // get a single employee by id
  @Throttle({ short: { ttl: 1000, limit: 1 } })
  @Get(':id')
  @ApiParam({ name: 'id', type: 'string', description: 'The employee ID' })
  @ApiResponse({
    status: 200,
    description: 'The employee details.',
    type: CreateEmployeeDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Employee not found.',
  })
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }


  // update an existing employee by id
  @Patch(':id')
  @ApiParam({ name: 'id', type: 'string', description: 'The employee ID' })
  @ApiResponse({
    status: 200,
    description: 'The employee has been successfully updated.',
    type: CreateEmployeeDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @ApiResponse({
    status: 404,
    description: 'Employee not found.',
  })
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }


  //delete employee
  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string', description: 'The employee ID' })
  @ApiResponse({
    status: 200,
    description: 'The employee has been successfully removed.',
  })
  @ApiResponse({
    status: 404,
    description: 'Employee not found.',
  })
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
