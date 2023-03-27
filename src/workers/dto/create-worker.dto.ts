/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkerDto {
  @ApiProperty({
  example: 'Rigoberto'
  })
  name: string;
  @ApiProperty({
    example: 'Cajero'
  })
  role: string;
  @ApiProperty({ type: 'image', format: 'png' })
  image: Buffer;
}