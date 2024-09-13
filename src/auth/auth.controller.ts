import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiTags,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateEmployeeDto } from './dto/create-user.dto';
import { LoginUsermployeeDto } from './dto/login-user.dto';


@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiBody({
    description: 'Login credentials',
    type: LoginUsermployeeDto,
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been authenticated',
    schema: {
      example: {
        access_token: 'string',
      },
    },
  })
  async login(@Body() req: { email: string; password: string }) {
    return this.authService.login(req.email, req.password);
  }

  @Post('register')
  @ApiResponse({ status: 201, description: 'The user has been registered',type: CreateEmployeeDto, })
  async register(@Body() req: CreateEmployeeDto) {
    return this.authService.register(
      req.email,
      req.password,
      req.firstName,
      req.lastName,
      req.role,
    );
  }
}
