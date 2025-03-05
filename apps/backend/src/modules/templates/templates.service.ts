import { Injectable, NotFoundException } from '@nestjs/common';
import { Template } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateTemplateDto } from 'src/modules/templates/dto/create-template.dto';
import { UpdateTemplateDto } from 'src/modules/templates/dto/update-template.dto';

@Injectable()
export class TemplatesService {
  constructor(private prisma: PrismaService) {}

  async createTemplate(dto: CreateTemplateDto): Promise<Template> {
    return this.prisma.template.create({
      data: dto,
    });
  }

  async updateTemplate(dto: UpdateTemplateDto, id: string): Promise<Template> {
    return this.prisma.template.update({
      where: { id },
      data: dto,
    });
  }

  async getAllTemplates(): Promise<Template[]> {
    return this.prisma.template.findMany();
  }

  async getById(id: string): Promise<Template> {
    return this.prisma.template.findFirst({
      where: { id },
    });
  }

  async deleteTemplate(id: string): Promise<Template> {
    return this.prisma.template.delete({
      where: { id },
    });
  }
}
