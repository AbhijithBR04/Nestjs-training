import { IsEmail, IsString, IsEnum, IsNotEmpty } from 'class-validator';

export class createUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['qa', 'dev', 'sw', 'pm'], {
    message: 'Role should be either qa,dev,sw,pm',
  })
  role: 'qa' | 'dev' | 'sw' | 'pm';
}
