import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Pepito',
  })
  username: string;

  @ApiProperty({
    example: '',
  })
  password: string;
}
