import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateStatisticDto {
  @ApiProperty({
    example: 'Proyectos abordados',
  })
  @IsNotEmpty()
  register: string;
  @ApiProperty({
    example: 5,
  })
  @IsNotEmpty()
  value: number;
}
