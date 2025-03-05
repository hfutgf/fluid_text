import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTemplateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  describe: string;

  @IsNotEmpty()
  @IsString()
  bgImage: string;

  @IsOptional()
  @IsString()
  file?: string;
}
