import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { SupabaseService } from 'src/modules/supabase/supabase.service';

@Module({
  controllers: [TemplatesController],
  providers: [TemplatesService, PrismaService, SupabaseService],
})
export class TemplatesModule {}
