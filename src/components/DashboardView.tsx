import React from 'react';
import { 
  Plus, 
  Globe, 
  Clock, 
  LayoutTemplate, 
  Sparkles, 
  ArrowUpRight, 
  Edit3, 
  Copy, 
  Trash2, 
  CheckCircle2, 
  Zap, 
  ExternalLink,
  Download,
  Users,
  Eye,
  Smartphone
} from 'lucide-react';
import { SiteData, Template } from '../types/site';

interface DashboardViewProps {
  projects: SiteData[];
  templates: Template[];
  onOpenProject: (project: SiteData) => void;
  onViewSite: (project: SiteData) => void;
  onCreateNewSite: () => void;
  onSelectTemplate: (template: Template) => void;
  onDuplicateProject: (id: string) => void;
  onDeleteProject: (id: string) => void;
  onExportProject: (project: SiteData) => void;
  onNavigateTab: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  projects,
  templates,
  onOpenProject,
  onViewSite,
  onCreateNewSite,
  onSelectTemplate,
  onDuplicateProject,
  onDeleteProject,
  onExportProject,
  onNavigateTab,
}) => {
  const publishedCount = projects.filter(p => p.published).length;
  const draftCount = projects.filter(p => !p.published).length;
  const totalCount = projects.length;
  const templateCount = templates.length;

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 max-w-7xl mx-auto pb-24 lg:pb-8">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#071A35] via-[#1769AA]/40 to-[#0B1220] border border-[#1769AA]/30 p-6 sm:p-8 md:p-10 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1769AA]/20 border border-[#3689E6]/30 text-xs font-bold text-[#3689E6]">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>Motor Mobile-First & IA Ativo</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-tight font-['Manrope']">
            Bem-vindo ao SITEIA.
          </h1>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
            Transforme suas ideias em experiências digitais profissionais. Crie, visualize em tempo real e edite com inteligência artificial.
          </p>

          <div className="pt-2 flex flex-wrap gap-3 sm:gap-4">
            <button
              onClick={onCreateNewSite}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#1769AA] to-[#3689E6] text-white font-bold text-sm shadow-xl shadow-[#1769AA]/40 hover:brightness-110 active:scale-95 transition"
            >
              <Plus className="w-5 h-5 stroke-[3]" />
              <span>+ Criar novo site</span>
            </button>

            <button
              onClick={() => onNavigateTab('templates')}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition"
            >
              <LayoutTemplate className="w-4 h-4 text-[#3689E6]" />
              <span>20+ Templates</span>
            </button>
          </div>
        </div>

        {/* Decorative Grid Graphic */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#3689E6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none hidden md:block" />
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <div className="p-4 sm:p-5 rounded-2xl bg-[#071A35] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Total Projetos</span>
            <Globe className="w-4 h-4 text-[#3689E6]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">{totalCount}</div>
          <p className="text-[10px] sm:text-[11px] text-slate-400">Locais & Publicados</p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#071A35] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Sites Online</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">{publishedCount}</div>
          <p className="text-[10px] sm:text-[11px] text-emerald-400 font-medium">Online com link ativo</p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#071A35] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Em Edição</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">{draftCount}</div>
          <p className="text-[10px] sm:text-[11px] text-amber-400/80 font-medium">Rascunhos salvos</p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#071A35] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Templates</span>
            <LayoutTemplate className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">{templateCount}</div>
          <p className="text-[10px] sm:text-[11px] text-purple-300 font-medium">20 Categorias</p>
        </div>
      </div>

      {/* Main Grid: Recent Projects + Recommended Templates */}
      <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
        {/* Recent Projects Column (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">Projetos Recentes</h2>
              <p className="text-slate-400 text-xs">Visualize, edite ou exporte seus sites criados.</p>
            </div>
            <button
              onClick={() => onNavigateTab('projetos')}
              className="text-xs font-bold text-[#3689E6] hover:underline flex items-center gap-1"
            >
              <span>Ver todos ({totalCount})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {projects.length === 0 ? (
            <div className="p-8 sm:p-12 text-center rounded-2xl bg-[#071A35] border border-slate-800 space-y-4">
              <Globe className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base sm:text-lg font-bold text-white">Nenhum site criado ainda</h3>
              <p className="text-slate-400 text-xs max-w-sm mx-auto">
                Utilize o criador inteligente de sites com IA ou escolha um dos nossos 20 templates.
              </p>
              <button
                onClick={onCreateNewSite}
                className="px-5 py-2.5 rounded-xl bg-[#1769AA] text-white font-bold text-xs hover:bg-[#3689E6] transition"
              >
                Criar Meu Primeiro Site
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {projects.slice(0, 4).map((project) => {
                const heroSec = project.sections.find(s => s.type === 'hero');
                const bgImg = heroSec?.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop';

                return (
                  <div 
                    key={project.id}
                    className="group rounded-2xl bg-[#071A35] border border-slate-800 overflow-hidden hover:border-[#1769AA]/60 transition duration-200 flex flex-col justify-between"
                  >
                    {/* Card Preview Image Header */}
                    <div className="relative h-44 overflow-hidden bg-slate-900 cursor-pointer" onClick={() => onViewSite(project)}>
                      <img 
                        src={bgImg} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071A35] via-transparent to-black/40" />
                      
                      {/* Status Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        {project.published ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                            Online
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-amber-500/90 text-white text-[10px] font-extrabold uppercase tracking-wider shadow">
                            Rascunho
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-md bg-slate-900/80 text-slate-300 text-[10px] font-medium border border-slate-700">
                          {project.niche || 'Geral'}
                        </span>
                      </div>

                      {/* Hover Overlay Button to View Site */}
                      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition duration-200 flex items-center justify-center">
                        <button
                          onClick={(e) => { e.stopPropagation(); onViewSite(project); }}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#1769AA] to-[#3689E6] text-white font-bold text-xs shadow-xl flex items-center gap-1.5"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Visualizar Site</span>
                        </button>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-white text-base group-hover:text-[#3689E6] transition line-clamp-1">
                          {project.businessName || project.title}
                        </h3>
                        <p className="text-slate-400 text-xs line-clamp-1 mt-0.5">
                          {project.title}
                        </p>
                      </div>

                      <div className="text-[11px] text-slate-500 flex items-center justify-between pt-2 border-t border-slate-800/80">
                        <span>Atualizado {new Date(project.updatedAt).toLocaleDateString('pt-BR')}</span>
                        <span>{project.sections.length} seções</span>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="pt-2 flex items-center gap-2">
                        <button
                          onClick={() => onViewSite(project)}
                          className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 border border-slate-700"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#3689E6]" />
                          <span>Visualizar</span>
                        </button>

                        <button
                          onClick={() => onOpenProject(project)}
                          className="flex-1 py-2 px-3 rounded-xl bg-[#1769AA] text-white font-bold text-xs hover:bg-[#3689E6] transition flex items-center justify-center gap-1.5"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Editar</span>
                        </button>

                        <button
                          onClick={() => onExportProject(project)}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                          title="Exportar ZIP / Código"
                        >
                          <Download className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onDuplicateProject(project.id)}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                          title="Duplicar"
                        >
                          <Copy className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onDeleteProject(project.id)}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recommended Templates Column (1 col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">Templates em Destaque</h2>
              <p className="text-slate-400 text-xs">Comece com layouts testados e validados.</p>
            </div>
          </div>

          <div className="space-y-3">
            {templates.slice(0, 3).map((tpl) => (
              <div 
                key={tpl.id}
                className="p-3.5 rounded-2xl bg-[#071A35] border border-slate-800 hover:border-slate-700 transition flex items-center gap-3 group"
              >
                <img 
                  src={tpl.previewImage} 
                  alt={tpl.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-700" 
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white truncate group-hover:text-[#3689E6] transition">{tpl.name}</span>
                    {tpl.badge && (
                      <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-extrabold uppercase shrink-0">
                        {tpl.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{tpl.category}</p>
                  
                  <button
                    onClick={() => onSelectTemplate(tpl)}
                    className="mt-2 text-xs font-bold text-[#3689E6] hover:underline flex items-center gap-1"
                  >
                    <span>Usar este template</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Shortcuts Box */}
          <div className="p-5 rounded-2xl bg-[#0B1220] border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Atalhos Rápidos de Criação</span>
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <button 
                onClick={onCreateNewSite}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-left transition"
              >
                🏢 Imobiliária
              </button>
              <button 
                onClick={onCreateNewSite}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-left transition"
              >
                🏥 Clínica Médica
              </button>
              <button 
                onClick={onCreateNewSite}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-left transition"
              >
                🍽️ Restaurante
              </button>
              <button 
                onClick={onCreateNewSite}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-left transition"
              >
                ⚖️ Escritório Advocacia
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
