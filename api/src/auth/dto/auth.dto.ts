import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    example: 'TOKEN_FOO',
    description: 'The JWT Token',
  })
  @IsString()
  jwt_token: string;
}