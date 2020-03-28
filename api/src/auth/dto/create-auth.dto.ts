import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({
    example: '123456789012345',
    description: 'The idP user ID',
  })
  @IsString()
  readonly userID: string;

  @ApiProperty({
    example: 'TOKEN_FOO',
    description: 'The idP access token',
  })
  @IsString()
  readonly accessToken: string;

  @ApiProperty({
    enum: ['facebook'],
    example: 'facebook',
    description: 'The idP name',
  })
  @IsString()
  readonly idP: string;
}