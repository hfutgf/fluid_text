import { Injectable, BadRequestException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials not provided');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async uploadDocumentFile(
    bucketName: string,
    path: string,
    fileBuffer: Buffer,
    mimeType: string,
  ) {
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!allowedMimeTypes.includes(mimeType)) {
      throw new BadRequestException(
        'Invalid file type. Only PDF and Word documents are allowed.',
      );
    }

    const { data, error } = await this.supabase.storage
      .from(bucketName)
      .upload(path, fileBuffer, {
        contentType: mimeType,
        upsert: false,
      });

    if (error) {
      throw new BadRequestException(`Error uploading file: ${error.message}`);
    }

    return data?.path;
  }

  async uploadImageFile(
    bucketName: string,
    path: string,
    fileBuffer: Buffer,
    mimeType: string,
  ) {
    if (!mimeType.startsWith('image/')) {
      throw new BadRequestException('Invalid file type. Only images allowed.');
    }

    const { data, error } = await this.supabase.storage
      .from(bucketName)
      .upload(path, fileBuffer, {
        contentType: mimeType,
        upsert: false,
      });

    if (error) {
      throw new BadRequestException(`Error uploading file: ${error.message}`);
    }

    return data?.path;
  }

  async removeFile(bucketName: string, path: string): Promise<any> {
    const { data, error } = await this.supabase.storage
      .from(bucketName)
      .remove([path]);

    if (error) {
      throw new BadRequestException(`Error removing file: ${error.message}`);
    }

    return data;
  }

  async getPublicUrl(bucketName: string, path: string) {
    const { data } = this.supabase.storage.from(bucketName).getPublicUrl(path);
    return data?.publicUrl;
  }

  async getSignedUrl(bucketName: string, path: string, expiresIn = 60) {
    const { data, error } = await this.supabase.storage
      .from(bucketName)
      .createSignedUrl(path, expiresIn);
    if (error) {
      throw new BadRequestException(
        `Error generating signed URL: ${error.message}`,
      );
    }
    return data?.signedUrl;
  }
}
