import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Matches } from 'class-validator';

export class CreateStatisticDto {
  @ApiProperty({
    example: 'Proyectos abordados',
  })
  @IsNotEmpty()
  @Matches(/^[a-zA-Z]+$/)
  register: string;
  @ApiProperty({
    example: 5,
  })
  @IsNotEmpty()
  @IsNumber()
  value: number;
}
