export type ProjectType = 
  | 'institucional' 
  | 'landing_page' 
  | 'vendas' 
  | 'servicos' 
  | 'portfolio' 
  | 'negocio_local' 
  | 'captura_leads';

export type VisualStyle = 
  | 'premium' 
  | 'minimalista' 
  | 'corporativo' 
  | 'moderno' 
  | 'elegante' 
  | 'criativo' 
  | 'tecnologico';

export type SectionType = 
  | 'hero' 
  | 'features' 
  | 'about' 
  | 'services' 
  | 'portfolio' 
  | 'gallery' 
  | 'menu' 
  | 'properties' 
  | 'pricing' 
  | 'testimonials' 
  | 'team' 
  | 'faq' 
  | 'contact' 
  | 'lead_form' 
  | 'map' 
  | 'custom_html';

export interface SectionItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  image?: string;
  badge?: string;
  price?: string;
  period?: string;
  features?: string[];
  linkText?: string;
  linkUrl?: string;
  rating?: number;
  authorName?: string;
  authorRole?: string;
  authorAvatar?: string;
  category?: string;
}

export interface Section {
  id: string;
  type: SectionType;
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  image?: string;
  bgStyle?: 'solid' | 'subtle' | 'gradient' | 'dark';
  items?: SectionItem[];
  customContent?: string;
  // Map specific properties
  mapEmbedUrl?: string;
  address?: string;
  cityState?: string;
  businessHours?: string;
  googleMapsLink?: string;
  visible: boolean;
}

export interface SiteColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  cardBg: string;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  cityState: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
}

export interface SeoConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage?: string;
}

export interface HeaderConfig {
  logoText: string;
  logoUrl?: string;
  ctaText: string;
  ctaLink: string;
  navLinks: Array<{ id: string; label: string; href: string }>;
}

export interface FooterConfig {
  copyright: string;
  description: string;
  quickLinks: Array<{ id: string; label: string; href: string }>;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
    linkedin?: string;
  };
}

export interface SiteData {
  id: string;
  title: string;
  businessName: string;
  niche: string;
  nicheLabel?: string;
  projectType: ProjectType;
  style: VisualStyle;
  theme: 'light' | 'dark';
  colors: SiteColors;
  fontFamily: 'Inter' | 'Manrope' | 'Poppins' | 'Roboto' | 'Playfair Display';
  contactInfo: ContactInfo;
  seo: SeoConfig;
  header: HeaderConfig;
  sections: Section[];
  footer: FooterConfig;
  floatingWhatsapp: boolean;
  whatsappMessage: string;
  customDomain?: string;
  subdomain?: string;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  description: string;
  features: string[];
  previewImage: string;
  badge?: string;
  siteData: Partial<SiteData>;
}

export interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Lead {
  id: string;
  projectId: string;
  projectName: string;
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  status: 'novo' | 'em_atendimento' | 'convertido' | 'arquivado';
  createdAt: string;
}

export interface Client {
  id: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  projectIds: string[];
  status: 'ativo' | 'inativo' | 'prospect';
  createdAt: string;
}

export interface PlanTier {
  id: 'starter' | 'pro' | 'agency';
  name: string;
  price: string;
  description: string;
  maxProjects: number;
  hasAiAssistant: boolean;
  hasAdvancedExport: boolean;
  hasCustomDomain: boolean;
  hasAgencyFeatures: boolean;
  templatesAccess: 'essential' | 'full' | 'vip';
  features: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  plan: 'starter' | 'pro' | 'agency';
  customGeminiApiKey?: string;
  useCustomKeyOnly: boolean;
  createdAt: string;
}

export interface AIGenerationLog {
  id: string;
  projectId?: string;
  prompt: string;
  type: 'wizard_generation' | 'ai_editor' | 'reference_analyzer';
  tokensUsed?: number;
  timestamp: string;
  status: 'sucesso' | 'erro';
}
