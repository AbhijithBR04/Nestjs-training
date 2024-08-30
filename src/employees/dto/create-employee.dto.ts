import { IsEmail, IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "Abhijith BR",
    required: true
  })
  name: string;

  @ApiProperty({
    example: "abhijith@2gmail.com",
    required: true
  })
  @IsEmail({},{ message: 'Please enter correct email' })
  email: string;


  @ApiProperty({
    example: "qa",
    required: true
  })
  @IsEnum(['qa', 'dev', 'sw', 'pm'], {
    message: 'Role should be either qa,dev,sw,pm',
  })
  role: Role
}
