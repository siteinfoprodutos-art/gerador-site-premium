import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  Star, 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Building, 
  MessageCircle,
  Menu,
  X,
  ShieldCheck,
  CheckCircle,
  Clock,
  Compass,
  Navigation,
  Globe
} from 'lucide-react';
import { SiteData, Section, SectionItem } from '../types/site';
import { StorageService } from '../data/storage';

interface SiteRendererProps {
  siteData: SiteData;
  interactive?: boolean;
  activeSectionId?: string;
  onSelectSection?: (sectionId: string) => void;
  onInlineEdit?: (sectionId: string, field: string, value: string) => void;
  onOpenImagePicker?: (sectionId: string) => void;
}

export const SiteRenderer: React.FC<SiteRendererProps> = ({
  siteData,
  interactive = false,
  activeSectionId,
  onSelectSection,
  onInlineEdit,
  onOpenImagePicker,
}) => {
  const {
    id: projectId,
    title,
    businessName,
    colors,
    theme,
    contactInfo,
    header,
    sections,
    footer,
    floatingWhatsapp,
    whatsappMessage
  } = siteData;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const isDark = theme === 'dark';

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    // Save real lead to SITEIA storage
    StorageService.addLead({
      projectId: projectId || 'demo',
      projectName: businessName || title,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject || 'Contato via Site',
      message: formData.message || 'Interesse em serviços.'
    });

    setFormSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <div 
      className={`min-h-screen font-['Inter',sans-serif] transition-colors duration-300 relative ${
        isDark ? 'bg-[#0B1220] text-slate-100' : 'bg-white text-slate-900'
      }`}
      style={{
        '--color-primary': colors?.primary || '#1769AA',
        '--color-secondary': colors?.secondary || '#071A35',
        '--color-accent': colors?.accent || '#3689E6',
      } as React.CSSProperties}
    >
      {/* 1. MOBILE FIRST SITE HEADER */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition ${
        isDark ? 'bg-[#071A35]/90 border-slate-800 text-white' : 'bg-white/90 border-slate-200 text-slate-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 font-extrabold text-lg sm:text-xl tracking-tight truncate max-w-[200px] sm:max-w-none">
            <span 
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-md shrink-0"
              style={{ backgroundColor: colors?.primary || '#1769AA' }}
            >
              ✦
            </span>
            <span className="truncate">{header?.logoText || businessName}</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            {(header?.navLinks || []).map((link) => (
              <a 
                key={link.id} 
                href={link.href}
                className="hover:opacity-80 transition"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={header?.ctaLink || '#contact'}
              className="hidden sm:inline-flex px-5 py-2.5 rounded-xl font-bold text-sm text-white shadow-lg transition hover:brightness-110"
              style={{ backgroundColor: colors?.primary || '#1769AA' }}
            >
              {header?.ctaText || 'Contato'}
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-800 text-white"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden p-6 border-b border-slate-800 bg-[#071A35] space-y-4">
            {(header?.navLinks || []).map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-bold text-white hover:text-[#3689E6]"
              >
                {link.label}
              </a>
            ))}
            <a
              href={header?.ctaLink || '#contact'}
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-3.5 rounded-xl font-bold text-white shadow-lg"
              style={{ backgroundColor: colors?.primary || '#1769AA' }}
            >
              {header?.ctaText || 'Contato'}
            </a>
          </div>
        )}
      </header>

      {/* 2. DYNAMIC SECTIONS */}
      <main className="space-y-0">
        {(sections || []).filter(sec => sec.visible).map((sec) => {
          const isSelected = interactive && activeSectionId === sec.id;

          return (
            <div
              key={sec.id}
              id={sec.id}
              onClick={() => interactive && onSelectSection?.(sec.id)}
              className={`relative transition duration-200 ${
                interactive ? 'cursor-pointer hover:ring-2 hover:ring-[#3689E6]' : ''
              } ${isSelected ? 'ring-4 ring-[#3689E6] shadow-2xl z-10' : ''}`}
            >
              {/* Interactive Label Overlay */}
              {interactive && isSelected && (
                <div className="absolute top-2 left-2 z-30 px-3 py-1 rounded-full bg-[#3689E6] text-white text-[11px] font-extrabold uppercase tracking-wider shadow flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>Em Edição: {sec.type.toUpperCase()}</span>
                </div>
              )}

              {/* RENDER BY SECTION TYPE */}

              {/* HERO SECTION */}
              {sec.type === 'hero' && (
                <section className={`py-12 sm:py-20 md:py-28 relative overflow-hidden min-h-[70vh] md:min-h-[80vh] flex items-center ${
                  isDark ? 'bg-gradient-to-b from-[#071A35] to-[#0B1220]' : 'bg-gradient-to-b from-slate-50 to-white'
                }`}>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
                    <div className="space-y-4 sm:space-y-6 text-left">
                      {sec.badge && (
                        <span 
                          className="inline-block px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase border shadow-sm"
                          style={{
                            backgroundColor: `${colors?.primary}20`,
                            color: colors?.primary || '#1769AA',
                            borderColor: `${colors?.primary}40`
                          }}
                        >
                          {sec.badge}
                        </span>
                      )}

                      <h1 className={`text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {sec.title}
                      </h1>

                      <p className={`text-base sm:text-lg md:text-xl leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {sec.subtitle || sec.description}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        {sec.ctaText && (
                          <a
                            href={sec.ctaLink || '#contact'}
                            className="w-full sm:w-auto text-center px-8 py-3.5 sm:py-4 rounded-2xl font-extrabold text-white text-base shadow-xl hover:brightness-110 transition duration-200"
                            style={{ backgroundColor: colors?.primary || '#1769AA' }}
                          >
                            {sec.ctaText}
                          </a>
                        )}

                        {sec.secondaryCtaText && (
                          <a
                            href={sec.secondaryCtaLink || '#about'}
                            className={`w-full sm:w-auto text-center px-8 py-3.5 sm:py-4 rounded-2xl font-bold text-base transition border ${
                              isDark ? 'bg-slate-900 border-slate-700 text-white hover:bg-slate-800' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100'
                            }`}
                          >
                            {sec.secondaryCtaText}
                          </a>
                        )}
                      </div>
                    </div>

                    {sec.image && (
                      <div className="relative mt-4 md:mt-0 group">
                        <img 
                          src={sec.image} 
                          alt={sec.title} 
                          className="rounded-3xl shadow-2xl object-cover w-full h-[300px] sm:h-[400px] md:h-[480px] border border-white/10"
                        />
                        {interactive && (
                          <button
                            onClick={(e) => { e.stopPropagation(); onOpenImagePicker?.(sec.id); }}
                            className="absolute bottom-4 right-4 px-3 py-1.5 rounded-xl bg-slate-900/90 text-white font-bold text-xs border border-slate-700 shadow-xl opacity-90 hover:opacity-100 transition"
                          >
                            🖼️ Alterar Imagem
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* FEATURES / SERVICES SECTION */}
              {(sec.type === 'features' || sec.type === 'services') && (
                <section className={`py-12 sm:py-20 ${isDark ? 'bg-[#071A35]/50 border-t border-slate-800' : 'bg-slate-50 border-t border-slate-200'}`}>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-16">
                    <div className="text-center max-w-3xl mx-auto space-y-3">
                      <h2 className={`text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {sec.title || 'Nossos Serviços'}
                      </h2>
                      {sec.subtitle && (
                        <p className={`text-sm sm:text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {sec.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {(sec.items || []).map((item) => (
                        <div 
                          key={item.id}
                          className={`p-6 sm:p-8 rounded-3xl border transition duration-300 space-y-4 flex flex-col justify-between ${
                            isDark 
                              ? 'bg-[#0B1220] border-slate-800 hover:border-[#1769AA]/50' 
                              : 'bg-white border-slate-200 hover:border-slate-400 shadow-md'
                          }`}
                        >
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div 
                                className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl shadow-md text-white"
                                style={{ backgroundColor: colors?.primary || '#1769AA' }}
                              >
                                ✦
                              </div>
                              {item.badge && (
                                <span className="px-3 py-1 rounded-full bg-[#3689E6]/20 text-[#3689E6] text-[10px] font-extrabold uppercase border border-[#3689E6]/30">
                                  {item.badge}
                                </span>
                              )}
                            </div>

                            <h3 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              {item.title}
                            </h3>
                            {item.subtitle && (
                              <p className="text-xs font-semibold text-[#3689E6]">{item.subtitle}</p>
                            )}
                            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                              {item.description}
                            </p>
                          </div>

                          {item.price && (
                            <div className="text-base sm:text-lg font-extrabold pt-4 border-t border-slate-800/60 text-emerald-400">
                              {item.price}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* MAP & LOCATION SECTION */}
              {sec.type === 'map' && (
                <section className={`py-12 sm:py-20 ${isDark ? 'bg-[#071A35] border-t border-slate-800' : 'bg-slate-100 border-t border-slate-200'}`}>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
                    <div className="text-center max-w-3xl mx-auto space-y-3">
                      <h2 className={`text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {sec.title || 'Nossa Localização & Atendimento'}
                      </h2>
                      {sec.subtitle && (
                        <p className={`text-sm sm:text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {sec.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 items-center">
                      {/* Map Info Card (1 col) */}
                      <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 shadow-xl ${
                        isDark ? 'bg-[#0B1220] border-slate-800' : 'bg-white border-slate-200'
                      }`}>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-[#3689E6] shrink-0 mt-1" />
                            <div>
                              <span className="font-bold text-white block text-sm">Endereço Principal</span>
                              <span className="text-xs text-slate-300 leading-relaxed block">{sec.address || contactInfo.address}</span>
                              <span className="text-xs text-slate-400 block mt-0.5">{sec.cityState || contactInfo.cityState}</span>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 pt-4 border-t border-slate-800/80">
                            <Clock className="w-5 h-5 text-[#3689E6] shrink-0 mt-1" />
                            <div>
                              <span className="font-bold text-white block text-sm">Horário de Funcionamento</span>
                              <span className="text-xs text-slate-300 leading-relaxed block">{sec.businessHours || 'Segunda a Sexta: 08h30 às 18h00'}</span>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 pt-4 border-t border-slate-800/80">
                            <Phone className="w-5 h-5 text-[#3689E6] shrink-0 mt-1" />
                            <div>
                              <span className="font-bold text-white block text-sm">Central de Atendimento</span>
                              <span className="text-xs text-slate-300 block">{contactInfo.phone}</span>
                              <span className="text-xs text-[#3689E6] font-bold block mt-0.5">WhatsApp: {contactInfo.whatsapp}</span>
                            </div>
                          </div>
                        </div>

                        <a
                          href={sec.googleMapsLink || `https://maps.google.com/?q=${encodeURIComponent(sec.address || contactInfo.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-extrabold text-white text-xs shadow-lg hover:brightness-110 transition"
                          style={{ backgroundColor: colors?.primary || '#1769AA' }}
                        >
                          <Navigation className="w-4 h-4" />
                          <span>Como Chegar (Google Maps / Waze)</span>
                        </a>
                      </div>

                      {/* Map Embed Frame (2 cols) */}
                      <div className="lg:col-span-2 h-[350px] sm:h-[420px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative">
                        <iframe
                          title="Mapa de Localização"
                          src={sec.mapEmbedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.789123456!2d-46.689000!3d-23.578000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce570000000000%3A0x0!2zQXYuIEJyaWdhZGVpcm8gRmFyaWEgTGltYSwgMTgwMA!5e0!3m2!1spt-BR!2sbr!4v1600000000000'}
                          className="w-full h-full border-0 filter grayscale brightness-90 contrast-125"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* PROPERTIES / PORTFOLIO / GALLERY / MENU SECTION */}
              {(sec.type === 'properties' || sec.type === 'portfolio' || sec.type === 'gallery' || sec.type === 'menu') && (
                <section className="py-12 sm:py-20">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-16">
                    <div className="text-center max-w-3xl mx-auto space-y-3">
                      <h2 className={`text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {sec.title}
                      </h2>
                      {sec.subtitle && (
                        <p className={`text-sm sm:text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {sec.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {(sec.items || []).map((item) => (
                        <div 
                          key={item.id}
                          className={`rounded-3xl overflow-hidden border transition duration-300 flex flex-col justify-between group ${
                            isDark ? 'bg-[#071A35] border-slate-800' : 'bg-white border-slate-200 shadow-lg'
                          }`}
                        >
                          {item.image && (
                            <div className="h-48 sm:h-56 overflow-hidden relative">
                              <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                              />
                              {item.badge && (
                                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-xs font-bold">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                          )}

                          <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                            <div className="space-y-2">
                              <h3 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {item.title}
                              </h3>
                              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                                {item.subtitle || item.description}
                              </p>
                            </div>

                            <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
                              {item.price && (
                                <span className="text-xl sm:text-2xl font-black text-emerald-400">
                                  {item.price}
                                </span>
                              )}
                              <a 
                                href="#contact"
                                className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow"
                                style={{ backgroundColor: colors?.primary || '#1769AA' }}
                              >
                                {item.linkText || 'Solicitar'}
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* ABOUT SECTION */}
              {sec.type === 'about' && (
                <section className={`py-12 sm:py-20 ${isDark ? 'bg-[#071A35]/30 border-y border-slate-800' : 'bg-slate-50 border-y border-slate-200'}`}>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {sec.image && (
                      <img 
                        src={sec.image} 
                        alt={sec.title} 
                        className="rounded-3xl shadow-2xl w-full h-[300px] sm:h-[400px] object-cover border border-white/10" 
                      />
                    )}
                    <div className="space-y-4 sm:space-y-6">
                      <h2 className={`text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {sec.title}
                      </h2>
                      <p className={`text-base sm:text-lg font-medium leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {sec.subtitle}
                      </p>
                      <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {sec.description}
                      </p>
                      <a
                        href="#contact"
                        className="inline-block w-full sm:w-auto text-center px-8 py-3.5 rounded-2xl font-extrabold text-white shadow-xl hover:brightness-110 transition"
                        style={{ backgroundColor: colors?.primary || '#1769AA' }}
                      >
                        Saiba Mais sobre Nós
                      </a>
                    </div>
                  </div>
                </section>
              )}

              {/* PRICING SECTION */}
              {sec.type === 'pricing' && (
                <section className="py-12 sm:py-20">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-16">
                    <div className="text-center max-w-3xl mx-auto space-y-3">
                      <h2 className={`text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {sec.title}
                      </h2>
                      {sec.subtitle && (
                        <p className={`text-sm sm:text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {sec.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                      {(sec.items || []).map((item) => (
                        <div 
                          key={item.id}
                          className={`p-6 sm:p-8 rounded-3xl border relative space-y-6 ${
                            item.badge 
                              ? 'bg-gradient-to-b from-[#1769AA]/20 to-[#071A35] border-[#3689E6] ring-2 ring-[#3689E6]/50' 
                              : isDark ? 'bg-[#071A35] border-slate-800' : 'bg-white border-slate-200 shadow-xl'
                          }`}
                        >
                          {item.badge && (
                            <span className="absolute -top-3 right-6 bg-[#3689E6] text-white text-[10px] sm:text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                              {item.badge}
                            </span>
                          )}

                          <div>
                            <h3 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              {item.title}
                            </h3>
                            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                              {item.description}
                            </p>
                          </div>

                          <div>
                            <span className={`text-3xl sm:text-4xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              {item.price}
                            </span>
                            <span className="text-xs text-slate-400 font-medium ml-1">
                              {item.period || '/mês'}
                            </span>
                          </div>

                          <ul className="space-y-3 text-xs text-slate-300">
                            {(item.features || []).map((feat, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>

                          <a
                            href="#contact"
                            className="block text-center w-full py-3.5 sm:py-4 rounded-2xl font-extrabold text-white text-sm hover:brightness-110 transition shadow-lg"
                            style={{ backgroundColor: colors?.primary || '#1769AA' }}
                          >
                            Contratar Plano
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* LEAD FORM / CONTACT SECTION */}
              {(sec.type === 'lead_form' || sec.type === 'contact') && (
                <section id="contact" className={`py-12 sm:py-20 ${isDark ? 'bg-[#071A35] border-t border-slate-800' : 'bg-slate-100 border-t border-slate-200'}`}>
                  <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
                    <div className="text-center space-y-2 sm:space-y-3">
                      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {sec.title || 'Fale Conosco'}
                      </h2>
                      <p className={`text-xs sm:text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {sec.subtitle || 'Preencha os dados e entraremos em contato rapidamente.'}
                      </p>
                    </div>

                    <form 
                      onSubmit={handleFormSubmit}
                      className={`p-6 sm:p-8 rounded-3xl border space-y-4 sm:space-y-6 shadow-2xl ${
                        isDark ? 'bg-[#0B1220] border-slate-800' : 'bg-white border-slate-200'
                      }`}
                    >
                      {formSubmitted && (
                        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                          <span>Mensagem enviada com sucesso! Nossa equipe retornará em breve.</span>
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className={`block text-xs font-bold uppercase mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            Nome Completo *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Seu nome"
                            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none ${
                              isDark ? 'bg-slate-900 border-slate-800 text-white focus:border-[#3689E6]' : 'bg-slate-50 border-slate-300 text-slate-900'
                            }`}
                          />
                        </div>

                        <div>
                          <label className={`block text-xs font-bold uppercase mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            E-mail *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="seu@email.com"
                            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none ${
                              isDark ? 'bg-slate-900 border-slate-800 text-white focus:border-[#3689E6]' : 'bg-slate-50 border-slate-300 text-slate-900'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className={`block text-xs font-bold uppercase mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            Telefone / WhatsApp *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="(11) 99999-9999"
                            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none ${
                              isDark ? 'bg-slate-900 border-slate-800 text-white focus:border-[#3689E6]' : 'bg-slate-50 border-slate-300 text-slate-900'
                            }`}
                          />
                        </div>

                        <div>
                          <label className={`block text-xs font-bold uppercase mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            Assunto
                          </label>
                          <input
                            type="text"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            placeholder="Assunto da mensagem"
                            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none ${
                              isDark ? 'bg-slate-900 border-slate-800 text-white focus:border-[#3689E6]' : 'bg-slate-50 border-slate-300 text-slate-900'
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={`block text-xs font-bold uppercase mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          Mensagem
                        </label>
                        <textarea
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Como podemos ajudar?"
                          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none ${
                            isDark ? 'bg-slate-900 border-slate-800 text-white focus:border-[#3689E6]' : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 rounded-2xl font-extrabold text-white text-base shadow-xl hover:brightness-110 transition flex items-center justify-center gap-2"
                        style={{ backgroundColor: colors?.primary || '#1769AA' }}
                      >
                        <Send className="w-5 h-5" />
                        <span>Enviar Solicitação</span>
                      </button>
                    </form>
                  </div>
                </section>
              )}
            </div>
          );
        })}
      </main>

      {/* 3. SITE FOOTER */}
      <footer className={`py-12 border-t transition ${
        isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-900 border-slate-800 text-slate-300'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="text-xl font-extrabold text-white">{businessName}</h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {footer?.description || 'Transformando ideias em resultados digitais de alta performance.'}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Navegação</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {(header?.navLinks || []).map((link) => (
                <li key={link.id}>
                  <a href={link.href} className="hover:text-white transition">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Atendimento</h4>
            <p className="flex items-center gap-2 text-slate-400">
              <Phone className="w-4 h-4 text-[#3689E6]" />
              <span>{contactInfo?.phone}</span>
            </p>
            <p className="flex items-center gap-2 text-slate-400">
              <Mail className="w-4 h-4 text-[#3689E6]" />
              <span>{contactInfo?.email}</span>
            </p>
            <p className="flex items-center gap-2 text-slate-400">
              <MapPin className="w-4 h-4 text-[#3689E6]" />
              <span>{contactInfo?.address} — {contactInfo?.cityState}</span>
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 pt-8 border-t border-slate-800/60 text-center text-xs text-slate-500">
          {footer?.copyright || `© ${new Date().getFullYear()} ${businessName}. Todos os direitos reservados.`}
        </div>
      </footer>

      {/* 4. FLOATING WHATSAPP BUTTON */}
      {floatingWhatsapp && (
        <a
          href={`https://wa.me/${contactInfo?.whatsapp}?text=${encodeURIComponent(whatsappMessage || 'Olá!')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition duration-200"
          title="Falar pelo WhatsApp"
        >
          <MessageCircle className="w-8 h-8 fill-current" />
        </a>
      )}
    </div>
  );
};
