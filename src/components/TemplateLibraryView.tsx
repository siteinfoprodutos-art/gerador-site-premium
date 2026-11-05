import React, { useState } from 'react';
import { 
  LayoutTemplate, 
  Search, 
  Eye, 
  Check, 
  ArrowRight, 
  Sparkles,
  X,
  Building,
  Activity,
  Utensils,
  Scale,
  Calculator,
  TrendingUp,
  Hammer,
  Compass,
  Scissors,
  Dumbbell,
  Target,
  Cpu,
  GraduationCap,
  Heart,
  Briefcase,
  Camera,
  Wrench,
  ShoppingBag,
  UserCheck
} from 'lucide-react';
import { Template } from '../types/site';
import { TEMPLATE_CATEGORIES } from '../data/templates';
import { SiteRenderer } from './SiteRenderer';

interface TemplateLibraryViewProps {
  templates: Template[];
  onSelectTemplate: (template: Template) => void;
}

export const TemplateLibraryView: React.FC<TemplateLibraryViewProps> = ({
  templates,
  onSelectTemplate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const filteredTemplates = templates.filter((tpl) => {
    const matchesCat = selectedCategory === 'all' || tpl.categoryId === selectedCategory;
    const matchesSearch = tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tpl.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tpl.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <LayoutTemplate className="w-6 h-6 text-[#3689E6]" />
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-['Manrope']">
              Biblioteca Profissional de Templates
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            20 categorias profissionais com estruturas modernas e prontas para uso.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nicho ou estilo..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#071A35] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#3689E6]"
          />
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition ${
            selectedCategory === 'all'
              ? 'bg-[#1769AA] text-white shadow-lg'
              : 'bg-[#071A35] text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Todas as 20 Categorias
        </button>

        {TEMPLATE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition flex items-center gap-1.5 ${
              selectedCategory === cat.id
                ? 'bg-[#1769AA] text-white shadow-lg'
                : 'bg-[#071A35] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="group rounded-3xl bg-[#071A35] border border-slate-800 overflow-hidden hover:border-[#1769AA]/60 transition duration-300 flex flex-col justify-between shadow-xl"
          >
            {/* Template Preview Image */}
            <div className="relative h-52 overflow-hidden bg-slate-950">
              <img
                src={template.previewImage}
                alt={template.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A35] via-transparent to-black/30" />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold border border-white/10">
                  {template.category}
                </span>
                {template.badge && (
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/90 text-white text-[10px] font-extrabold uppercase shadow">
                    {template.badge}
                  </span>
                )}
              </div>

              {/* Hover Actions */}
              <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition duration-200 flex items-center justify-center gap-3">
                <button
                  onClick={() => setPreviewTemplate(template)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900/90 text-white font-bold text-xs hover:bg-slate-800 flex items-center gap-1.5 border border-slate-700 shadow-xl"
                >
                  <Eye className="w-4 h-4 text-[#3689E6]" />
                  <span>Visualizar Prévia</span>
                </button>
                <button
                  onClick={() => onSelectTemplate(template)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1769AA] to-[#3689E6] text-white font-bold text-xs hover:brightness-110 flex items-center gap-1.5 shadow-xl"
                >
                  <Check className="w-4 h-4" />
                  <span>Usar Template</span>
                </button>
              </div>
            </div>

            {/* Template Details */}
            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-white text-lg group-hover:text-[#3689E6] transition">
                  {template.name}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mt-1 line-clamp-2">
                  {template.description}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                {template.features.slice(0, 3).map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px] text-slate-300">
                    <span className="text-[#3689E6] font-bold">✓</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Card Footer Actions */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => setPreviewTemplate(template)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-bold text-xs transition flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Ver Prévia</span>
                </button>

                <button
                  onClick={() => onSelectTemplate(template)}
                  className="flex-1 py-2.5 rounded-xl bg-[#1769AA] text-white font-bold text-xs hover:bg-[#3689E6] transition flex items-center justify-center gap-1.5"
                >
                  <span>Selecionar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LIVE PREVIEW MODAL */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col">
          {/* Modal Header */}
          <div className="h-16 bg-[#071A35] border-b border-slate-800 px-6 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#1769AA]/20 text-[#3689E6] text-xs font-bold border border-[#1769AA]/30">
                {previewTemplate.category}
              </span>
              <h3 className="font-bold text-white text-base">{previewTemplate.name}</h3>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const tpl = previewTemplate;
                  setPreviewTemplate(null);
                  onSelectTemplate(tpl);
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#1769AA] to-[#3689E6] text-white font-bold text-xs hover:brightness-110 shadow-lg flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Usar este Template</span>
              </button>

              <button
                onClick={() => setPreviewTemplate(null)}
                className="w-9 h-9 rounded-xl bg-slate-900 text-slate-400 hover:text-white flex items-center justify-center border border-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Content Frame */}
          <div className="flex-1 overflow-y-auto bg-slate-950 p-4 md:p-8">
            <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-[#071A35]">
              <SiteRenderer 
                siteData={previewTemplate.siteData as any} 
                interactive={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
