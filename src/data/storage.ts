import { SiteData, Lead, UserProfile, Client, AIGenerationLog } from '../types/site';
import { ALL_TEMPLATES } from './templates';

const PROJECTS_KEY = 'siteia_projects_v2';
const LEADS_KEY = 'siteia_leads_v2';
const USER_KEY = 'siteia_user_v2';
const CLIENTS_KEY = 'siteia_clients_v2';
const LOGS_KEY = 'siteia_logs_v2';

// Seed demo projects if empty
function initializeDefaultData() {
  if (typeof window === 'undefined') return;

  const existingProjects = localStorage.getItem(PROJECTS_KEY);
  if (!existingProjects || JSON.parse(existingProjects).length === 0) {
    const demo1: SiteData = {
      ...ALL_TEMPLATES[0].siteData as SiteData,
      id: 'proj-demo-1',
      title: 'Habitat Prime — Imóveis Exclusivos',
      businessName: 'Habitat Prime Imóveis',
      subdomain: 'habitatprime',
      published: true,
      publishedAt: '2026-10-15T14:30:00.000Z',
      createdAt: '2026-10-15T10:00:00.000Z',
      updatedAt: '2026-11-01T16:20:00.000Z'
    };

    const demo2: SiteData = {
      ...ALL_TEMPLATES[1].siteData as SiteData,
      id: 'proj-demo-2',
      title: 'Clínica Vitae Integrativa',
      businessName: 'Clínica Vitae Medicina',
      subdomain: 'clinicavitae',
      published: true,
      publishedAt: '2026-10-20T09:15:00.000Z',
      createdAt: '2026-10-20T08:00:00.000Z',
      updatedAt: '2026-11-03T11:10:00.000Z'
    };

    const demo3: SiteData = {
      ...ALL_TEMPLATES[2].siteData as SiteData,
      id: 'proj-demo-3',
      title: 'Bistrô Bella Italia',
      businessName: 'Bistrô Bella Italia',
      subdomain: 'bellaitalia',
      published: false,
      createdAt: '2026-11-02T18:00:00.000Z',
      updatedAt: '2026-11-04T19:45:00.000Z'
    };

    localStorage.setItem(PROJECTS_KEY, JSON.stringify([demo1, demo2, demo3]));
  }

  const existingLeads = localStorage.getItem(LEADS_KEY);
  if (!existingLeads || JSON.parse(existingLeads).length === 0) {
    const sampleLeads: Lead[] = [
      {
        id: 'lead-1',
        projectId: 'proj-demo-1',
        projectName: 'Habitat Prime Imóveis',
        name: 'Roberto Camargo',
        email: 'roberto.camargo@email.com',
        phone: '(11) 99876-5432',
        subject: 'Interesse na Penthouse Faria Lima',
        message: 'Gostaria de agendar uma visita privativa nesta quinta-feira às 15h.',
        status: 'novo',
        createdAt: '2026-11-04T14:22:00.000Z'
      },
      {
        id: 'lead-2',
        projectId: 'proj-demo-1',
        projectName: 'Habitat Prime Imóveis',
        name: 'Carolina Mendes',
        email: 'carolina.m@empresa.com.br',
        phone: '(11) 98112-3344',
        subject: 'Simulação de Financiamento',
        message: 'Tenho interesse na Villa Jardins Contemporânea, gostaria de simular valores de entrada.',
        status: 'em_atendimento',
        createdAt: '2026-11-03T09:10:00.000Z'
      },
      {
        id: 'lead-3',
        projectId: 'proj-demo-2',
        projectName: 'Clínica Vitae Medicina',
        name: 'Juliana Paes',
        email: 'juliana.paes@gmail.com',
        phone: '(11) 97766-5544',
        subject: 'Agendamento Dermatologia',
        message: 'Qual a disponibilidade para consulta com a dra. Mariana na próxima semana?',
        status: 'convertido',
        createdAt: '2026-11-02T16:05:00.000Z'
      }
    ];
    localStorage.setItem(LEADS_KEY, JSON.stringify(sampleLeads));
  }

  const existingUser = localStorage.getItem(USER_KEY);
  if (!existingUser) {
    const defaultUser: UserProfile = {
      id: 'usr-1',
      name: 'Agência Digital Pro',
      email: 'siteinfoprodutos@gmail.com',
      role: 'admin',
      plan: 'pro',
      useCustomKeyOnly: false,
      createdAt: '2026-10-01T00:00:00.000Z'
    };
    localStorage.setItem(USER_KEY, JSON.stringify(defaultUser));
  }

  const existingClients = localStorage.getItem(CLIENTS_KEY);
  if (!existingClients) {
    const sampleClients: Client[] = [
      { id: 'cli-1', name: 'Dr. Fernando Silva', companyName: 'Clínica Vitae', email: 'fernando@clinicavitae.com.br', phone: '(11) 98888-7777', projectIds: ['proj-demo-2'], status: 'ativo', createdAt: '2026-10-20T08:00:00.000Z' },
      { id: 'cli-2', name: 'Guilherme Habitat', companyName: 'Habitat Prime', email: 'guilherme@habitatprime.com.br', phone: '(11) 99999-0001', projectIds: ['proj-demo-1'], status: 'ativo', createdAt: '2026-10-15T10:00:00.000Z' }
    ];
    localStorage.setItem(CLIENTS_KEY, JSON.stringify(sampleClients));
  }
}

// Call init on module load
initializeDefaultData();

export const StorageService = {
  // Projects
  getProjects(): SiteData[] {
    try {
      const data = localStorage.getItem(PROJECTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  getProjectById(id: string): SiteData | null {
    const projects = this.getProjects();
    return projects.find(p => p.id === id) || null;
  },

  saveProject(project: SiteData): SiteData {
    const projects = this.getProjects();
    const index = projects.findIndex(p => p.id === project.id);
    const updated = {
      ...project,
      updatedAt: new Date().toISOString()
    };

    if (index >= 0) {
      projects[index] = updated;
    } else {
      projects.unshift(updated);
    }

    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    return updated;
  },

  deleteProject(id: string): void {
    const projects = this.getProjects().filter(p => p.id !== id);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  },

  duplicateProject(id: string): SiteData | null {
    const original = this.getProjectById(id);
    if (!original) return null;

    const copy: SiteData = {
      ...JSON.parse(JSON.stringify(original)),
      id: 'proj-' + Date.now(),
      title: `${original.title} (Cópia)`,
      published: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.saveProject(copy);
    return copy;
  },

  // Leads
  getLeads(): Lead[] {
    try {
      const data = localStorage.getItem(LEADS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>): Lead {
    const leads = this.getLeads();
    const newLead: Lead = {
      ...leadData,
      id: 'lead-' + Date.now(),
      status: 'novo',
      createdAt: new Date().toISOString()
    };
    leads.unshift(newLead);
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
    return newLead;
  },

  updateLeadStatus(id: string, status: Lead['status']): void {
    const leads = this.getLeads();
    const lead = leads.find(l => l.id === id);
    if (lead) {
      lead.status = status;
      localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
    }
  },

  deleteLead(id: string): void {
    const leads = this.getLeads().filter(l => l.id !== id);
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  },

  // Clients
  getClients(): Client[] {
    try {
      const data = localStorage.getItem(CLIENTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveClient(client: Client): void {
    const clients = this.getClients();
    const idx = clients.findIndex(c => c.id === client.id);
    if (idx >= 0) clients[idx] = client;
    else clients.unshift(client);
    localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
  },

  // User & Settings
  getUserProfile(): UserProfile {
    try {
      const data = localStorage.getItem(USER_KEY);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return {
      id: 'usr-1',
      name: 'Agência Digital Pro',
      email: 'siteinfoprodutos@gmail.com',
      role: 'admin',
      plan: 'pro',
      useCustomKeyOnly: false,
      createdAt: new Date().toISOString()
    };
  },

  saveUserProfile(profile: UserProfile): void {
    localStorage.setItem(USER_KEY, JSON.stringify(profile));
  },

  // AI Logs
  getLogs(): AIGenerationLog[] {
    try {
      const data = localStorage.getItem(LOGS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addLog(log: Omit<AIGenerationLog, 'id' | 'timestamp'>): void {
    const logs = this.getLogs();
    logs.unshift({
      ...log,
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString()
    });
    // Keep last 50 logs
    localStorage.setItem(LOGS_KEY, JSON.stringify(logs.slice(0, 50)));
  }
};
