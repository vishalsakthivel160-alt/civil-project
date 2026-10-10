import { getSupabaseClient } from '../config/supabase.js';
import { initialProjects, initialServices, initialSiteSettings } from './initialData.js';
import { Project, Service, ContactMessage, SiteSettings } from '../types/index.js';

// Resilient in-memory store if Supabase credentials are not provided or during development
class MemoryStore {
  projects: Project[] = [...initialProjects];
  services: Service[] = [...initialServices];
  contactMessages: ContactMessage[] = [];
  siteSettings: SiteSettings = { ...initialSiteSettings };
}

const memoryStore = new MemoryStore();

export class DbAdapter {
  // =========================================================================
  // PROJECTS
  // =========================================================================
  static async getProjects(filter?: { status?: string; category?: string }): Promise<Project[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        let query = supabase.from('projects').select('*').order('created_at', { ascending: false });
        if (filter?.status) {
          query = query.eq('status', filter.status);
        }
        if (filter?.category) {
          query = query.eq('category', filter.category);
        }
        const { data, error } = await query;
        if (error) throw error;
        if (data && data.length > 0) return data as Project[];
      } catch (err) {
        console.warn('[DbAdapter] Supabase getProjects query failed, falling back to local store:', err);
      }
    }

    let results = [...memoryStore.projects];
    if (filter?.status) {
      results = results.filter((p) => p.status.toLowerCase() === filter.status?.toLowerCase());
    }
    if (filter?.category) {
      results = results.filter((p) => p.category.toLowerCase() === filter.category?.toLowerCase());
    }
    return results;
  }

  static async getProjectById(id: string): Promise<Project | null> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
        if (error) throw error;
        if (data) return data as Project;
      } catch (err) {
        console.warn(`[DbAdapter] Supabase getProjectById failed for ${id}:`, err);
      }
    }

    const project = memoryStore.projects.find((p) => p.id === id);
    return project || null;
  }

  static async createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> {
    const supabase = getSupabaseClient();
    const newProject: Project = {
      ...project,
      id: `proj-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (supabase) {
      try {
        const { data, error } = await supabase.from('projects').insert([newProject]).select().single();
        if (error) throw error;
        if (data) return data as Project;
      } catch (err) {
        console.warn('[DbAdapter] Supabase createProject failed, storing locally:', err);
      }
    }

    memoryStore.projects.unshift(newProject);
    return newProject;
  }

  static async updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
    const supabase = getSupabaseClient();
    const updatedPayload = { ...updates, updated_at: new Date().toISOString() };

    if (supabase) {
      try {
        const { data, error } = await supabase.from('projects').update(updatedPayload).eq('id', id).select().single();
        if (error) throw error;
        if (data) return data as Project;
      } catch (err) {
        console.warn(`[DbAdapter] Supabase updateProject failed for ${id}:`, err);
      }
    }

    const index = memoryStore.projects.findIndex((p) => p.id === id);
    if (index === -1) return null;
    memoryStore.projects[index] = { ...memoryStore.projects[index], ...updatedPayload };
    return memoryStore.projects[index];
  }

  static async deleteProject(id: string): Promise<boolean> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (error) throw error;
        return true;
      } catch (err) {
        console.warn(`[DbAdapter] Supabase deleteProject failed for ${id}:`, err);
      }
    }

    const initialLength = memoryStore.projects.length;
    memoryStore.projects = memoryStore.projects.filter((p) => p.id !== id);
    return memoryStore.projects.length < initialLength;
  }

  // =========================================================================
  // SERVICES
  // =========================================================================
  static async getServices(): Promise<Service[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('services').select('*').order('display_order', { ascending: true });
        if (error) throw error;
        if (data && data.length > 0) return data as Service[];
      } catch (err) {
        console.warn('[DbAdapter] Supabase getServices failed:', err);
      }
    }

    return [...memoryStore.services].sort((a, b) => a.display_order - b.display_order);
  }

  static async getServiceById(id: string): Promise<Service | null> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('services').select('*').eq('id', id).single();
        if (error) throw error;
        if (data) return data as Service;
      } catch (err) {
        console.warn(`[DbAdapter] Supabase getServiceById failed for ${id}:`, err);
      }
    }

    return memoryStore.services.find((s) => s.id === id) || null;
  }

  static async createService(service: Omit<Service, 'id' | 'created_at' | 'updated_at'>): Promise<Service> {
    const supabase = getSupabaseClient();
    const newService: Service = {
      ...service,
      id: `serv-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (supabase) {
      try {
        const { data, error } = await supabase.from('services').insert([newService]).select().single();
        if (error) throw error;
        if (data) return data as Service;
      } catch (err) {
        console.warn('[DbAdapter] Supabase createService failed:', err);
      }
    }

    memoryStore.services.push(newService);
    return newService;
  }

  static async updateService(id: string, updates: Partial<Service>): Promise<Service | null> {
    const supabase = getSupabaseClient();
    const payload = { ...updates, updated_at: new Date().toISOString() };

    if (supabase) {
      try {
        const { data, error } = await supabase.from('services').update(payload).eq('id', id).select().single();
        if (error) throw error;
        if (data) return data as Service;
      } catch (err) {
        console.warn(`[DbAdapter] Supabase updateService failed for ${id}:`, err);
      }
    }

    const index = memoryStore.services.findIndex((s) => s.id === id);
    if (index === -1) return null;
    memoryStore.services[index] = { ...memoryStore.services[index], ...payload };
    return memoryStore.services[index];
  }

  static async deleteService(id: string): Promise<boolean> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { error } = await supabase.from('services').delete().eq('id', id);
        if (error) throw error;
        return true;
      } catch (err) {
        console.warn(`[DbAdapter] Supabase deleteService failed for ${id}:`, err);
      }
    }

    const prevLength = memoryStore.services.length;
    memoryStore.services = memoryStore.services.filter((s) => s.id !== id);
    return memoryStore.services.length < prevLength;
  }

  // =========================================================================
  // CONTACT MESSAGES
  // =========================================================================
  static async saveContactMessage(msg: {
    name: string;
    email: string;
    phone?: string;
    message: string;
  }): Promise<ContactMessage> {
    const supabase = getSupabaseClient();
    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: msg.name,
      email: msg.email,
      phone: msg.phone || '',
      message: msg.message,
      status: 'new',
      created_at: new Date().toISOString(),
    };

    if (supabase) {
      try {
        const { data, error } = await supabase.from('contact_messages').insert([newMessage]).select().single();
        if (error) throw error;
        if (data) return data as ContactMessage;
      } catch (err) {
        console.warn('[DbAdapter] Supabase saveContactMessage failed, saving to local store:', err);
      }
    }

    memoryStore.contactMessages.unshift(newMessage);
    return newMessage;
  }

  static async getContactMessages(): Promise<ContactMessage[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        if (data) return data as ContactMessage[];
      } catch (err) {
        console.warn('[DbAdapter] Supabase getContactMessages failed:', err);
      }
    }

    return [...memoryStore.contactMessages];
  }

  // =========================================================================
  // SITE SETTINGS
  // =========================================================================
  static async getSettings(): Promise<SiteSettings> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('site_settings').select('*').eq('id', 'default').single();
        if (error) throw error;
        if (data) return data as SiteSettings;
      } catch (err) {
        console.warn('[DbAdapter] Supabase getSettings failed:', err);
      }
    }

    return { ...memoryStore.siteSettings };
  }

  static async updateSettings(updates: Partial<SiteSettings>): Promise<SiteSettings> {
    const supabase = getSupabaseClient();
    const payload = { ...updates, id: 'default', updated_at: new Date().toISOString() };

    if (supabase) {
      try {
        const { data, error } = await supabase.from('site_settings').upsert([payload]).select().single();
        if (error) throw error;
        if (data) return data as SiteSettings;
      } catch (err) {
        console.warn('[DbAdapter] Supabase updateSettings failed:', err);
      }
    }

    memoryStore.siteSettings = { ...memoryStore.siteSettings, ...payload };
    return memoryStore.siteSettings;
  }
}
