import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTemplateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  describe: string;

  @IsOptional()
  @IsString()
  bgImage?: string;

  @IsOptional()
  @IsString()
  file?: string;
}
