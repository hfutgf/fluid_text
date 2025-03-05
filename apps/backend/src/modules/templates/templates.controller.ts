import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { create } from 'domain';
import { SupabaseService } from 'src/modules/supabase/supabase.service';
import { CreateTemplateDto } from 'src/modules/templates/dto/create-template.dto';
import { UpdateTemplateDto } from 'src/modules/templates/dto/update-template.dto';
import { TemplatesService } from 'src/modules/templates/templates.service';

@ApiTags('Templates')
@Controller('templates')
export class TemplatesController {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly templateService: TemplatesService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Upload a document file (PDF/DOC/DOCX) and create a template',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Document file plus template fields',
    required: true,
    schema: {
      type: 'object',
      properties: {
        document: {
          type: 'string',
          format: 'binary',
        },
        title: { type: 'string' },
        describe: { type: 'string' },
        bgImage: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'File uploaded and template created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'No file provided / Invalid file type.',
  })
  @UseInterceptors(FileInterceptor('document'))
  async create(@UploadedFile() document: any, @Body() dto: CreateTemplateDto) {
    if (!document) {
      throw new BadRequestException('No file provided');
    }

    const filename = document.originalname;
    const bucketName = 'docs';
    const path = `templates/${Date.now()}-${filename}`;

    await this.supabaseService.uploadDocumentFile(
      bucketName,
      path,
      document.buffer,
      document.mimetype,
    );

    const publicUrl = await this.supabaseService.getPublicUrl(bucketName, path);

    return this.templateService.createTemplate({
      ...dto,
      file: publicUrl,
    });
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get all templates' })
  @ApiResponse({ status: 200, description: 'List of templates' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getAllTemplates() {
    try {
      return await this.templateService.getAllTemplates();
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error retrieving templates',
      );
    }
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get template by ID' })
  @ApiResponse({ status: 200, description: 'Template details' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Template not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getById(@Param('id') id: string) {
    try {
      const template = await this.templateService.getById(id);
      if (!template) {
        throw new NotFoundException(`Template with ID ${id} not found`);
      }
      return template;
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error retrieving template',
      );
    }
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Delete template by ID' })
  @ApiResponse({ status: 200, description: 'Template deleted successfully' })
  @ApiResponse({ status: 400, description: 'Invalid template ID' })
  @ApiResponse({ status: 404, description: 'Template not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async deleteTemplate(@Param('id') id: string): Promise<{ message: string }> {
    try {
      const deleted = await this.templateService.deleteTemplate(id);
      if (!deleted) {
        throw new NotFoundException(`Template with ID ${id} not found`);
      }

      const path = deleted.file.split('/').slice(-2).join('/');
      await this.supabaseService.removeFile('docs', path);

      return { message: 'Template deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error deleting template',
      );
    }
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update template by ID' })
  @ApiResponse({ status: 200, description: 'Template updated successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Template not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async updateTemplate(
    @Body() dto: UpdateTemplateDto,
    @Param('id') id: string,
  ) {
    try {
      const template = await this.templateService.updateTemplate(dto, id);
      if (!template) {
        throw new NotFoundException(`Template with ID ${id} not found`);
      }

      if (dto.file && template.file) {
        const path = template.file.split('/').slice(-2).join('/');
        await this.supabaseService.removeFile('docs', path);
      }

      return template;
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error updating template',
      );
    }
  }
}
