import { getSupabaseClient } from '../config/supabase.js';

export const BUCKET_NAME = 'project-assets';

export class StorageService {
  /**
   * Uploads an image buffer or file to Supabase Storage and returns the public URL.
   */
  static async uploadImage(fileBuffer: Buffer, fileName: string, mimeType: string): Promise<string> {
    const supabase = getSupabaseClient();

    if (!supabase) {
      console.warn('[Storage] Supabase client not initialized. Returning data URI or placeholder.');
      return `data:${mimeType};base64,${fileBuffer.toString('base64')}`;
    }

    try {
      const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}-${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(uniqueFileName, fileBuffer, {
          contentType: mimeType,
          upsert: true,
        });

      if (error) {
        throw error;
      }

      const { data: publicData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(data.path);

      return publicData.publicUrl;
    } catch (err) {
      console.error('[Storage] Error uploading to Supabase Storage:', err);
      throw new Error('Failed to upload image to storage');
    }
  }

  /**
   * Helper to ensure an image URL is well-formed and valid
   */
  static sanitizeImageUrl(url: string): string {
    if (!url) return '';
    return url.trim();
  }
}
