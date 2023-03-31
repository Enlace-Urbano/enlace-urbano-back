import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
  // @ApiProperty({ required: true })
  // @IsNotEmpty()
  // @Matches(/^[a-zA-Z]+$/)
  readonly username: string;

  // @ApiProperty({ required: true })
  // @IsNotEmpty()
  // @Matches(/^[a-zA-Z]+$/)
  password: string;
}
