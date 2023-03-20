import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ required: true })
  readonly username: string;

  @ApiProperty({ required: true })
  password: string;
}
