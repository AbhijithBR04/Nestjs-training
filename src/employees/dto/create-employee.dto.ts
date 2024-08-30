import { IsEmail, IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail({},{ message: 'Please enter correct email' })
  email: string;

  @IsEnum(['qa', 'dev', 'sw', 'pm'], {
    message: 'Role should be either qa,dev,sw,pm',
  })
  role: Role
}
