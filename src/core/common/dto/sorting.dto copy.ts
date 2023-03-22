import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { OrderValuesType, SortValues, SortValuesType } from '../enum/sort.enum';

export class SortingDto {
  @IsEnum(SortValues, {
    message: 'Invalid sort option',
  })
  @ApiProperty({ example: 'createdAt', description: 'Sort by create date' })
  sort: SortValuesType;

  @IsEnum(SortValues, {
    message: 'Invalid order option',
  })
  @ApiProperty({ example: 'ASC', description: 'Sort in ascend order' })
  order: OrderValuesType;
}
