import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GoogleRegisterDto {
  @ApiProperty({ example: 'cristiano@example.com' })
  @IsOptional()
  @IsString({ message: 'Email must be a string' })
  email?: string;

  @ApiProperty({ example: '12345678901234567890' })
  @IsOptional()
  @IsString({ message: 'Google ID must be a string' })
  googleId?: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Cristiano',
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Ronaldo',
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    description: 'URL of the user avatar',
    required: false,
    example: 'https://example.com/avatar.jpg',
  })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({
    description: 'User birthday in ISO format',
    required: false,
    example: '1985-02-05',
  })
  @IsOptional()
  dateOfBirth?: Date;
}
