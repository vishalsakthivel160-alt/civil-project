export interface Project {
  id: string;
  title: string;
  location: string;
  category: string;
  description: string;
  status: 'Completed' | 'Ongoing';
  year: string;
  cover_image: string;
  gallery_images: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'read' | 'archived';
  created_at: string;
}

export interface SiteSettings {
  id: string;
  business_name: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  about_text: string;
  updated_at?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
