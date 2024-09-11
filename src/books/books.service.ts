import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Book } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(data: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>): Promise<Book> {
    return this.prisma.book.create({ data });
  }


  async findAll(userId: number): Promise<Book[]> {
    return this.prisma.book.findMany({ where: { userId } });
  }

  async findOne(id: number, userId: number): Promise<Book> {
    return this.prisma.book.findFirst({ where: { id, userId } });
  }

  async update(id: number, data: Partial<Book>, userId: number): Promise<Book> {
    return this.prisma.book.updateMany({
      where: { id, userId },
      data,
    }).then((result) => result.count ? this.prisma.book.findUnique({ where: { id } }) : null);
  }

  async remove(id: number, userId: number): Promise<Book> {
    return this.prisma.book.deleteMany({
      where: { id, userId },
    }).then((result) => result.count ? this.prisma.book.findUnique({ where: { id } }) : null);
  }
}