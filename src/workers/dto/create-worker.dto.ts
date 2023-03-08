/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkerDto {
  @ApiProperty({
    example: 'Chander',
  })
  name: string;

  @ApiProperty({
    example: 'Repartidor KFC',
  })
  role: string;
}
