import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    example: 'Tarapaca',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example:
      'Nuestro trabajo se ha centrado en entender y diagnosticar las necesidades de diferentes segmentos de nuestra población para poder integrar variables y encontrar soluciones creativas uniendo el ámbito público con el privado',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: 'file', format: 'png' })
  @IsNotEmpty()
  image: Buffer;
}
