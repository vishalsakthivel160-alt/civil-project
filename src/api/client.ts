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

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function parseResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const text = await res.text();
    console.error('API Error: Expected JSON, got:', text.substring(0, 100));
    throw new Error('API request failed: Server returned an invalid or non-JSON response.');
  }
  return res.json();
}

export async function fetchProjects(filter?: { status?: string; category?: string }): Promise<Project[]> {
  const params = new URLSearchParams();
  if (filter?.status) params.append('status', filter.status);
  if (filter?.category) params.append('category', filter.category);

  const url = `${API_BASE}/projects${params.toString() ? `?${params.toString()}` : ''}`;
  const res = await fetch(url);
  const data: ApiResponse<Project[]> = await parseResponse(res);
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to fetch projects');
  }
  return data.data;
}

export async function fetchProjectById(id: string): Promise<Project> {
  const res = await fetch(`${API_BASE}/projects/${id}`);
  const data: ApiResponse<Project> = await parseResponse(res);
  if (!res.ok || !data.success) {
    throw new Error(data.error || `Failed to fetch project ${id}`);
  }
  return data.data;
}

export async function fetchServices(): Promise<Service[]> {
  const res = await fetch(`${API_BASE}/services`);
  const data: ApiResponse<Service[]> = await parseResponse(res);
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to fetch services');
  }
  return data.data;
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  const res = await fetch(`${API_BASE}/settings`);
  const data: ApiResponse<SiteSettings> = await parseResponse(res);
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to fetch site settings');
  }
  return data.data;
}

export async function submitContact(form: ContactSubmission): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });

  const data: ApiResponse<any> = await parseResponse(res);
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to submit contact message');
  }
  return { success: true, message: data.message || 'Message submitted successfully' };
}
