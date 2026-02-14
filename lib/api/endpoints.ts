import api from './client';

// Types
export interface Service {
  id: number;
  slug: string;
  title: string;
  shortDesc: string;
  description?: string;
  icon: string;
  features: string[];
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: number;
  slug: string;
  name: string;
  capacity: string;
  client: string;
  role: string;
  description?: string;
  scope: string[];
  status: 'ongoing' | 'completed' | 'upcoming';
  isFeatured: boolean;
  featuredImage?: string;
  images: string[];
  location?: string;
  startDate?: string;
  completionDate?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  images: string[];
  category: string;
  tags: string[];
  author: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  viewCount: number;
  isFeatured: boolean;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  department?: string;
  email: string;
  phone?: string;
  bio?: string;
  image?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  type: 'partner' | 'consult' | 'general' | 'career';
  status: 'new' | 'read' | 'replied' | 'archived';
  notes?: string;
  createdAt: string;
}

export interface SiteConfig {
  id?: number;
  key: string;
  value: string;
  group?: string;
  isPublic?: boolean;
}

// ============ SERVICES API ============
export const servicesApi = {
  // Get all services (public)
  getAll: async (params?: { active?: boolean }) => {
    const { data } = await api.get('/services', { params: { ...params, active: params?.active ? 'true' : undefined } });
    return data.services as Service[];
  },

  // Get single service
  getById: async (id: number) => {
    const { data } = await api.get(`/services/${id}`);
    return data.service as Service;
  },

  // Get by slug
  getBySlug: async (slug: string) => {
    const { data } = await api.get(`/services/slug/${slug}`);
    return data.service as Service;
  },

  // Create service (admin)
  create: async (serviceData: Partial<Service>) => {
    const { data } = await api.post('/services', serviceData);
    return data.service as Service;
  },

  // Update service (admin)
  update: async (id: number, serviceData: Partial<Service>) => {
    const { data } = await api.put(`/services/${id}`, serviceData);
    return data.service as Service;
  },

  // Delete service (admin)
  delete: async (id: number) => {
    const { data } = await api.delete(`/services/${id}`);
    return data;
  },
};

// ============ PROJECTS API ============
export const projectsApi = {
  // Get all projects (public)
  getAll: async (params?: { status?: string; featured?: boolean; active?: boolean; page?: number; limit?: number }) => {
    const { data } = await api.get('/projects', { 
      params: { 
        ...params,
        featured: params?.featured ? 'true' : undefined,
        active: params?.active ? 'true' : undefined
      } 
    });
    return { projects: data.projects as Project[], pagination: data.pagination };
  },

  // Get featured projects
  getFeatured: async (limit = 4) => {
    const { data } = await api.get('/projects/featured', { params: { limit } });
    return data.projects as Project[];
  },

  // Get single project
  getById: async (id: number) => {
    const { data } = await api.get(`/projects/${id}`);
    return data.project as Project;
  },

  // Get by slug
  getBySlug: async (slug: string) => {
    const { data } = await api.get(`/projects/slug/${slug}`);
    return data.project as Project;
  },

  // Create project (admin)
  create: async (projectData: Partial<Project>) => {
    const { data } = await api.post('/projects', projectData);
    return data.project as Project;
  },

  // Update project (admin)
  update: async (id: number, projectData: Partial<Project>) => {
    const { data } = await api.put(`/projects/${id}`, projectData);
    return data.project as Project;
  },

  // Delete project (admin)
  delete: async (id: number) => {
    const { data } = await api.delete(`/projects/${id}`);
    return data;
  },
};

// ============ BLOGS API ============
export const blogsApi = {
  // Get all blogs (admin)
  getAll: async (params?: { status?: string; category?: string; search?: string; page?: number; limit?: number }) => {
    const { data } = await api.get('/blogs', { params });
    return { blogs: data.blogs as Blog[], pagination: data.pagination };
  },

  // Get published blogs (public)
  getPublished: async (params?: { category?: string; page?: number; limit?: number }) => {
    const { data } = await api.get('/blogs/published', { params });
    return { blogs: data.blogs as Blog[], pagination: data.pagination };
  },

  // Get recent blogs
  getRecent: async (limit = 3) => {
    const { data } = await api.get('/blogs/published', { params: { limit, sort: '-publishedAt' } });
    return data.blogs as Blog[];
  },

  // Get blog by ID
  getById: async (id: number) => {
    const { data } = await api.get(`/blogs/${id}`);
    return data.blog as Blog;
  },

  // Get blog by slug (public)
  getBySlug: async (slug: string) => {
    const { data } = await api.get(`/blogs/slug/${slug}`);
    return data.blog as Blog;
  },

  // Get categories
  getCategories: async () => {
    const { data } = await api.get('/blogs/categories');
    return data.categories as string[];
  },

  // Create blog (admin)
  create: async (blogData: Partial<Blog>) => {
    const { data } = await api.post('/blogs', blogData);
    return data.blog as Blog;
  },

  // Update blog (admin)
  update: async (id: number, blogData: Partial<Blog>) => {
    const { data } = await api.put(`/blogs/${id}`, blogData);
    return data.blog as Blog;
  },

  // Delete blog (admin)
  delete: async (id: number) => {
    const { data } = await api.delete(`/blogs/${id}`);
    return data;
  },
};

// ============ TEAM API ============
export const teamApi = {
  // Get all team members (public)
  getAll: async (params?: { active?: boolean; department?: string }) => {
    const { data } = await api.get('/team', { 
      params: { 
        active: params?.active ? 'true' : undefined,
        department: params?.department
      } 
    });
    return data.members as TeamMember[];
  },

  // Get single member
  getById: async (id: number) => {
    const { data } = await api.get(`/team/${id}`);
    return data.member as TeamMember;
  },

  // Create team member (admin)
  create: async (memberData: Partial<TeamMember>) => {
    const { data } = await api.post('/team', memberData);
    return data.member as TeamMember;
  },

  // Update team member (admin)
  update: async (id: number, memberData: Partial<TeamMember>) => {
    const { data } = await api.put(`/team/${id}`, memberData);
    return data.member as TeamMember;
  },

  // Delete team member (admin)
  delete: async (id: number) => {
    const { data } = await api.delete(`/team/${id}`);
    return data;
  },
};

// ============ SITE CONFIG API ============
export const siteConfigApi = {
  // Get all configs
  getAll: async () => {
    const { data } = await api.get('/config');
    return data.configs as SiteConfig[];
  },

  // Get public configs
  getPublic: async () => {
    const { data } = await api.get('/config/public');
    return data.configs as SiteConfig[];
  },

  // Get single config by key
  getByKey: async (key: string) => {
    const { data } = await api.get(`/config/${key}`);
    return data.config as SiteConfig;
  },

  // Get configs by group
  getByGroup: async (group: string) => {
    const { data } = await api.get('/config', { params: { group } });
    return data.configs as SiteConfig[];
  },
};

// Legacy alias for backwards compatibility
export const configApi = siteConfigApi;

// ============ CONTACT API ============
export const contactApi = {
  // Submit contact form (public)
  submit: async (formData: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    type?: 'partner' | 'consult' | 'general' | 'career';
  }) => {
    const { data } = await api.post('/contact', formData);
    return data;
  },

  // Create contact submission (alias for submit)
  create: async (formData: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    subject: string;
    message: string;
  }) => {
    const { data } = await api.post('/contact', formData);
    return data;
  },

  // Mark as read (admin)
  markAsRead: async (id: number) => {
    const { data } = await api.put(`/contact/${id}/read`);
    return data;
  },

  // Respond to submission (admin)
  respond: async (id: number, response: string) => {
    const { data } = await api.put(`/contact/${id}/respond`, { response });
    return data;
  },

  // Delete submission (admin)
  delete: async (id: number) => {
    const { data } = await api.delete(`/contact/${id}`);
    return data;
  },
};

// ============ AUTH API (for admin) ============
export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const { data } = await api.post('/auth/login', credentials);
    return data;
  },

  register: async (userData: { name: string; email: string; password: string; role?: string }) => {
    const { data } = await api.post('/auth/register', userData);
    return data;
  },

  me: async () => {
    const { data } = await api.get('/auth/me');
    return data;
  },

  getCurrentUser: async () => {
    const { data } = await api.get('/auth/me');
    return data.user;
  },

  updateProfile: async (userData: Partial<{ name: string; email: string }>) => {
    const { data } = await api.put('/auth/profile', userData);
    return data;
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    const { data } = await api.put('/auth/change-password', { currentPassword, newPassword });
    return data;
  },
};

// ============ UPLOAD API ============
export const uploadApi = {
  // Upload single file
  uploadFile: async (formData: FormData) => {
    const { data } = await api.post('/upload/single', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  // Upload multiple files
  uploadFiles: async (formData: FormData) => {
    const { data } = await api.post('/upload/multiple', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  // Delete file
  deleteFile: async (filename: string) => {
    const { data } = await api.delete('/upload', { 
      params: { filename } 
    });
    return data;
  },
};
