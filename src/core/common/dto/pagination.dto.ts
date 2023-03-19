import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({ example: 1, description: 'Current page' })
  page: number;

  @ApiProperty({ example: 10, description: 'Elements on page' })
  limit: number;
}
