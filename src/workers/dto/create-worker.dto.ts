/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateWorkerDto {
  @ApiProperty({
  example: 'Rigoberto'
  })
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    example: 'Cajero'
  })
  @IsNotEmpty()
  role: string;
  @ApiProperty({ type: 'image', format: 'png' })
  image: Buffer;
}