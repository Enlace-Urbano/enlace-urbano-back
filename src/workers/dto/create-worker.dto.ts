/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class CreateWorkerDto {
  @ApiProperty({
    example: 'Rigoberto',
  })
  @IsNotEmpty()
  @Matches(/^[a-zA-Z]+$/)
  name: string;

  @ApiProperty({
    example: 'Cajero',
  })
  @IsNotEmpty()
  @Matches(/^[a-zA-Z]+$/)
  role: string;

  @ApiProperty({
    example: 'Cajero',
  })
  @IsNotEmpty()
  @Matches(/^[a-zA-Z]+$/)
  profession: string;

  @ApiProperty({ type: 'file', format: 'png' })
  image: Buffer;
}
