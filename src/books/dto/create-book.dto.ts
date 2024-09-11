import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    description: 'The title of the book',
    example: 'The Great Gatsby',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The author of the book',
    example: 'F. Scott Fitzgerald',
  })


  @ApiProperty({
    description: 'A brief description of the book',
    example: 'A novel about the American dream',
    required: false, // Marked as optional
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'A link related to the book',
    example: 'http://example.com/book',
  })
  @IsString()
  link: string;

  @ApiProperty({
    description: 'The ID of the user who owns the book',
    example: 1,
  })
  @IsNumber()
  userId: number;
}
