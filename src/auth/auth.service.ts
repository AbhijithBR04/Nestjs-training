import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AuthService {
  private readonly publicKey: string;

  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {
    this.publicKey = fs.readFileSync(path.join('./public.key'), 'utf8');
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, pass: string) {
    const user = await this.validateUser(email, pass);
    if (user) {
      const payload = { email: user.email, sub: user.id, role: user.role};
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async register(email: string, pass: string, firstName: string, lastName: string, role: 'admin' | 'user') {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(pass, salt);

    const user = await this.prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
        role,
      },
    });

    const { password, ...result } = user;
    return result;
  }
  async verifyToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        publicKey: this.publicKey,
        algorithms: ['RS256'],
      });
      return payload;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
