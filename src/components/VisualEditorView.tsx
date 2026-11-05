import React, { useState } from 'react';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Undo2, 
  Redo2, 
  Wand2, 
  Eye, 
  Download, 
  Save, 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Copy, 
  Layers, 
  Settings, 
  Palette, 
  Type, 
  Image as ImageIcon, 
  Share2, 
  Check, 
  Sparkles,
  HelpCircle,
  Globe,
  Sliders,
  X,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';
import { SiteData, Section, SectionItem, VisualStyle } from '../types/site';
import { SiteRenderer } from './SiteRenderer';
import { AIEditAssistantModal } from './AIEditAssistantModal';
import { ImagePickerModal } from './ImagePickerModal';

interface VisualEditorViewProps {
  siteData: SiteData;
  onSave: (updatedSite: SiteData) => void;
  onExport: (site: SiteData) => void;
  onViewSite: (site: SiteData) => void;
  onBack: () => void;
  userCustomApiKey?: string;
}

export const VisualEditorView: React.FC<VisualEditorViewProps> = ({
  siteData,
  onSave,
  onExport,
  onViewSite,
  onBack,
  userCustomApiKey,
}) => {
  const [site, setSite] = useState<SiteData>(siteData);
  const [history, setHistory] = useState<SiteData[]>([siteData]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Default to mobile device preview if viewport is small (Mobile First principle)
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>(
    typeof window !== 'undefined' && window.innerWidth < 768 ? 'mobile' : 'desktop'
  );

  const [activeTabLeft, setActiveTabLeft] = useState<'sections' | 'add' | 'seo' | 'colors'>('sections');
  const [selectedSectionId, setSelectedSectionId] = useState<string>(
    siteData.sections.length > 0 ? siteData.sections[0].id : ''
  );

  const [aiAssistantOpen, setAiAssistantOpen] = useState<boolean>(false);
  const [imagePickerSectionId, setImagePickerSectionId] = useState<string | null>(null);
  const [autoSavedMsg, setAutoSavedMsg] = useState<boolean>(false);
  const [mobilePanelsOpen, setMobilePanelsOpen] = useState<'none' | 'layers' | 'props'>('none');

  // Helper to push history
  const updateSiteState = (newSite: SiteData) => {
    const updated = { ...newSite, updatedAt: new Date().toISOString() };
    setSite(updated);

    const newHist = history.slice(0, historyIndex + 1);
    newHist.push(updated);
    setHistory(newHist);
    setHistoryIndex(newHist.length - 1);

    setAutoSavedMsg(true);
    setTimeout(() => setAutoSavedMsg(false), 2000);
    onSave(updated);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setSite(prev);
      onSave(prev);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setSite(next);
      onSave(next);
    }
  };

  // Section Reordering
  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...site.sections];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newSections.length) return;

    const temp = newSections[index];
    newSections[index] = newSections[targetIdx];
    newSections[targetIdx] = temp;

    updateSiteState({ ...site, sections: newSections });
  };

  const duplicateSection = (secId: string) => {
    const sec = site.sections.find(s => s.id === secId);
    if (!sec) return;
    const copy: Section = {
      ...JSON.parse(JSON.stringify(sec)),
      id: 'sec-' + Date.now(),
      title: `${sec.title} (Cópia)`
    };
    const idx = site.sections.findIndex(s => s.id === secId);
    const newSections = [...site.sections];
    newSections.splice(idx + 1, 0, copy);
    updateSiteState({ ...site, sections: newSections });
    setSelectedSectionId(copy.id);
  };

  const deleteSection = (secId: string) => {
    if (site.sections.length <= 1) {
      alert('O site precisa ter pelo menos 1 seção.');
      return;
    }
    const newSections = site.sections.filter(s => s.id !== secId);
    updateSiteState({ ...site, sections: newSections });
    if (selectedSectionId === secId && newSections.length > 0) {
      setSelectedSectionId(newSections[0].id);
    }
  };

  const addSectionBlock = (type: Section['type']) => {
    const newSec: Section = {
      id: 'sec-' + Date.now(),
      type,
      title: type === 'services' ? 'Nossos Serviços de Crédito' : type === 'map' ? 'Nossa Localização' : 'Nova Seção',
      subtitle: 'Descrição personalizada da seção',
      visible: true,
      items: [
        { id: 'i1', title: 'Item em Destaque 1', description: 'Descrição detalhada do primeiro item.' },
        { id: 'i2', title: 'Item em Destaque 2', description: 'Descrição detalhada do segundo item.' }
      ]
    };
    updateSiteState({ ...site, sections: [...site.sections, newSec] });
    setSelectedSectionId(newSec.id);
  };

  const selectedSection = site.sections.find(s => s.id === selectedSectionId);
  const selectedSectionIdx = site.sections.findIndex(s => s.id === selectedSectionId);

  const updateSelectedSection = (patch: Partial<Section>) => {
    if (!selectedSectionId) return;
    const newSections = site.sections.map(s => 
      s.id === selectedSectionId ? { ...s, ...patch } : s
    );
    updateSiteState({ ...site, sections: newSections });
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#0B1220] text-slate-100 overflow-hidden">
      {/* EDITOR TOP BAR */}
      <div className="h-14 bg-[#071A35] border-b border-slate-800 px-3 md:px-4 flex items-center justify-between shrink-0 z-20">
        {/* Left: Back & Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onBack}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold transition flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Voltar</span>
          </button>
          <div className="hidden md:block">
            <h2 className="font-bold text-white text-xs sm:text-sm truncate max-w-xs">{site.businessName || site.title}</h2>
            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <span className="capitalize">{site.niche}</span>
              {autoSavedMsg && <span className="text-emerald-400 font-bold">✓ Salvo</span>}
            </div>
          </div>
        </div>

        {/* Center: Device Switcher & History */}
        <div className="flex items-center gap-1 sm:gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setDevice('mobile')}
            className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
              device === 'mobile' ? 'bg-[#1769AA] text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
            title="Visualização Mobile First (375px)"
          >
            <Smartphone className="w-4 h-4" />
          </button>

          <button
            onClick={() => setDevice('tablet')}
            className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
              device === 'tablet' ? 'bg-[#1769AA] text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
            title="Visualização Tablet (768px)"
          >
            <Tablet className="w-4 h-4" />
          </button>

          <button
            onClick={() => setDevice('desktop')}
            className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
              device === 'desktop' ? 'bg-[#1769AA] text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
            title="Visualização Desktop (100%)"
          >
            <Monitor className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-slate-800 mx-0.5" />

          <button
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30"
            title="Desfazer"
          >
            <Undo2 className="w-4 h-4" />
          </button>

          <button
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30"
            title="Refazer"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        {/* Right: View Site, AI Assistant & Export */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Prominent Visualizar Site Button */}
          <button
            onClick={() => onViewSite(site)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs shadow-md hover:brightness-110 transition"
            title="Visualizar Site em Tela Cheia Interativa"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">Visualizar Site</span>
          </button>

          <button
            onClick={() => setAiAssistantOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-[#1769AA] text-white font-bold text-xs shadow-md hover:brightness-110 transition"
          >
            <Wand2 className="w-4 h-4 animate-spin" />
            <span className="hidden md:inline">IA Assistant</span>
          </button>

          <button
            onClick={() => onExport(site)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1769AA] text-white font-bold text-xs shadow-md hover:bg-[#3689E6] transition"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Exportar</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Bar for Left/Right panels */}
      <div className="lg:hidden h-10 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between text-xs font-bold text-slate-300">
        <button
          onClick={() => setMobilePanelsOpen(mobilePanelsOpen === 'layers' ? 'none' : 'layers')}
          className={`px-3 py-1 rounded-lg border ${
            mobilePanelsOpen === 'layers' ? 'bg-[#1769AA] text-white border-[#3689E6]' : 'bg-slate-800 border-slate-700'
          }`}
        >
          📂 Seções ({site.sections.length})
        </button>

        <button
          onClick={() => setMobilePanelsOpen(mobilePanelsOpen === 'props' ? 'none' : 'props')}
          className={`px-3 py-1 rounded-lg border ${
            mobilePanelsOpen === 'props' ? 'bg-[#1769AA] text-white border-[#3689E6]' : 'bg-slate-800 border-slate-700'
          }`}
        >
          ⚙️ Editar Textos/Fotos
        </button>
      </div>

      {/* 3-PANEL BODY */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* PANEL 1: LEFT SIDEBAR (SECTIONS & STRUCTURE) */}
        <div className={`w-72 bg-[#071A35] border-r border-slate-800 flex-col shrink-0 ${
          mobilePanelsOpen === 'layers' ? 'flex absolute inset-y-0 left-0 z-30 shadow-2xl w-full sm:w-80' : 'hidden lg:flex'
        }`}>
          {/* Sub-tabs */}
          <div className="flex items-center border-b border-slate-800 text-xs font-bold text-slate-400 bg-slate-900/60">
            <button
              onClick={() => setActiveTabLeft('sections')}
              className={`flex-1 py-3 border-b-2 text-center transition ${
                activeTabLeft === 'sections' ? 'border-[#3689E6] text-white bg-[#071A35]' : 'border-transparent hover:text-slate-200'
              }`}
            >
              Estrutura
            </button>
            <button
              onClick={() => setActiveTabLeft('add')}
              className={`flex-1 py-3 border-b-2 text-center transition ${
                activeTabLeft === 'add' ? 'border-[#3689E6] text-white bg-[#071A35]' : 'border-transparent hover:text-slate-200'
              }`}
            >
              + Adicionar
            </button>
            <button
              onClick={() => setActiveTabLeft('colors')}
              className={`flex-1 py-3 border-b-2 text-center transition ${
                activeTabLeft === 'colors' ? 'border-[#3689E6] text-white bg-[#071A35]' : 'border-transparent hover:text-slate-200'
              }`}
            >
              Cores
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* SECTIONS LIST */}
            {activeTabLeft === 'sections' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  <span>Seções do Site ({site.sections.length})</span>
                  <span>Ações</span>
                </div>

                {site.sections.map((sec, index) => {
                  const isSel = selectedSectionId === sec.id;

                  return (
                    <div
                      key={sec.id}
                      onClick={() => {
                        setSelectedSectionId(sec.id);
                        if (mobilePanelsOpen === 'layers') setMobilePanelsOpen('none');
                      }}
                      className={`p-3 rounded-xl border text-xs transition cursor-pointer flex items-center justify-between group ${
                        isSel 
                          ? 'bg-[#1769AA]/30 border-[#3689E6] text-white ring-1 ring-[#3689E6]' 
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-2 h-2 rounded-full bg-[#3689E6]" />
                        <div className="truncate">
                          <span className="font-bold block truncate">{sec.title}</span>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">{sec.type}</span>
                        </div>
                      </div>

                      {/* Reorder & Action Controls */}
                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                        <button
                          onClick={(e) => { e.stopPropagation(); moveSection(index, 'up'); }}
                          disabled={index === 0}
                          className="p-1 hover:text-white disabled:opacity-20"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); moveSection(index, 'down'); }}
                          disabled={index === site.sections.length - 1}
                          className="p-1 hover:text-white disabled:opacity-20"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); duplicateSection(sec.id); }}
                          className="p-1 hover:text-white"
                          title="Duplicar"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteSection(sec.id); }}
                          className="p-1 hover:text-red-400"
                          title="Excluir"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ADD NEW SECTION BLOCKS */}
            {activeTabLeft === 'add' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Clique para adicionar uma nova seção ao seu site:</p>

                {[
                  { type: 'hero', label: 'Destaque Principal (Hero)', desc: 'Título, botões e imagem de impacto' },
                  { type: 'services', label: 'Nossos Serviços', desc: 'Cards de serviços de crédito e produtos' },
                  { type: 'map', label: 'Mapa & Localização', desc: 'Google Maps interativo e endereço' },
                  { type: 'about', label: 'Sobre a Empresa', desc: 'História, imagem e valores' },
                  { type: 'pricing', label: 'Tabela de Preços / Planos', desc: 'Planos com lista de recursos' },
                  { type: 'lead_form', label: 'Formulário de Contato / Simulação', desc: 'Captura de leads com integração' },
                ].map((block) => (
                  <button
                    key={block.type}
                    onClick={() => {
                      addSectionBlock(block.type as any);
                      if (mobilePanelsOpen === 'layers') setMobilePanelsOpen('none');
                    }}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#3689E6] text-left text-xs space-y-1 transition group"
                  >
                    <div className="font-bold text-white group-hover:text-[#3689E6] flex items-center justify-between">
                      <span>+ {block.label}</span>
                      <Plus className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-[11px] text-slate-400">{block.desc}</p>
                  </button>
                ))}
              </div>
            )}

            {/* COLOR PALETTE */}
            {activeTabLeft === 'colors' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-2">Cor Primária da Marca</label>
                  <input
                    type="color"
                    value={site.colors.primary}
                    onChange={(e) => updateSiteState({ ...site, colors: { ...site.colors, primary: e.target.value } })}
                    className="w-full h-10 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-2">Tema de Fundo</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => updateSiteState({ ...site, theme: 'dark', colors: { ...site.colors, background: '#0B1220', text: '#F4F6FA' } })}
                      className={`p-3 rounded-xl border font-bold text-xs ${site.theme === 'dark' ? 'bg-slate-950 border-[#3689E6] text-white' : 'bg-slate-900 border-slate-800'}`}
                    >
                      🌙 Escuro
                    </button>
                    <button
                      onClick={() => updateSiteState({ ...site, theme: 'light', colors: { ...site.colors, background: '#FFFFFF', text: '#1E293B' } })}
                      className={`p-3 rounded-xl border font-bold text-xs ${site.theme === 'light' ? 'bg-slate-100 border-[#3689E6] text-slate-900' : 'bg-slate-900 border-slate-800'}`}
                    >
                      ☀️ Claro
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PANEL 2: CENTER CANVAS PREVIEW WITH FLOATING WIX-STYLE SECTION TOOLBAR */}
        <div className="flex-1 bg-slate-950 p-2 sm:p-4 md:p-6 overflow-y-auto flex flex-col items-center justify-start relative">
          
          {/* Floating WIX-style Action Toolbar over active section */}
          {selectedSection && (
            <div className="sticky top-2 z-30 mb-3 px-4 py-2 rounded-2xl bg-[#071A35]/95 border border-[#3689E6] text-white text-xs font-bold shadow-2xl flex items-center gap-3 backdrop-blur-md animate-in fade-in">
              <span className="text-[#3689E6] uppercase tracking-wider text-[11px] hidden sm:inline">
                ✦ Seção Ativa: {selectedSection.title}
              </span>

              <div className="h-4 w-px bg-slate-800 hidden sm:block" />

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => moveSection(selectedSectionIdx, 'up')}
                  disabled={selectedSectionIdx <= 0}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 flex items-center gap-1 disabled:opacity-30"
                  title="Subir Seção"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Subir</span>
                </button>

                <button
                  onClick={() => moveSection(selectedSectionIdx, 'down')}
                  disabled={selectedSectionIdx >= site.sections.length - 1}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 flex items-center gap-1 disabled:opacity-30"
                  title="Descer Seção"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Descer</span>
                </button>

                <button
                  onClick={() => setImagePickerSectionId(selectedSection.id)}
                  className="px-2.5 py-1 rounded-lg bg-[#1769AA] hover:bg-[#3689E6] text-white flex items-center gap-1 shadow"
                  title="Anexar / Alterar Imagem"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Anexar Imagem</span>
                </button>

                <button
                  onClick={() => duplicateSection(selectedSection.id)}
                  className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800"
                  title="Duplicar"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => deleteSection(selectedSection.id)}
                  className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-red-500/20 text-red-400 border border-slate-800"
                  title="Excluir"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Canvas Viewport Frame */}
          <div 
            className={`transition-all duration-300 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 ${
              device === 'desktop' ? 'w-full max-w-6xl min-h-full' :
              device === 'tablet' ? 'w-[768px] min-h-[900px]' : 'w-[375px] min-h-[720px]'
            }`}
          >
            <SiteRenderer
              siteData={site}
              interactive={true}
              activeSectionId={selectedSectionId}
              onSelectSection={(id) => setSelectedSectionId(id)}
              onOpenImagePicker={(id) => setImagePickerSectionId(id)}
            />
          </div>
        </div>

        {/* PANEL 3: RIGHT PROPERTIES INSPECTOR */}
        <div className={`w-80 bg-[#071A35] border-l border-slate-800 flex-col shrink-0 ${
          mobilePanelsOpen === 'props' ? 'flex absolute inset-y-0 right-0 z-30 shadow-2xl w-full sm:w-80' : 'hidden lg:flex'
        }`}>
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#3689E6]" />
              <span>Editar Textos & Fotos</span>
            </h3>
            {selectedSection && (
              <span className="px-2 py-0.5 rounded bg-[#1769AA]/20 text-[#3689E6] text-[10px] font-bold uppercase">
                {selectedSection.type}
              </span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6 text-xs">
            {selectedSection ? (
              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Título da Seção</label>
                  <input
                    type="text"
                    value={selectedSection.title || ''}
                    onChange={(e) => updateSelectedSection({ title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#3689E6]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Subtítulo / Descrição</label>
                  <textarea
                    rows={3}
                    value={selectedSection.subtitle || selectedSection.description || ''}
                    onChange={(e) => updateSelectedSection({ subtitle: e.target.value, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#3689E6]"
                  />
                </div>

                {selectedSection.badge !== undefined && (
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Selo / Badge (Top)</label>
                    <input
                      type="text"
                      value={selectedSection.badge || ''}
                      onChange={(e) => updateSelectedSection({ badge: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                    />
                  </div>
                )}

                {/* Attachment image button */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="block font-bold text-white">Imagem da Seção</span>
                  <button
                    onClick={() => setImagePickerSectionId(selectedSection.id)}
                    className="w-full py-2 rounded-lg bg-[#1769AA] text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#3689E6] transition"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Anexar / Alterar Foto</span>
                  </button>
                </div>

                {/* Map properties if section type is map */}
                {selectedSection.type === 'map' && (
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <span className="block font-bold text-white text-xs">Propriedades do Mapa</span>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Endereço Exibido</label>
                      <input
                        type="text"
                        value={selectedSection.address || ''}
                        onChange={(e) => updateSelectedSection({ address: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Horário de Funcionamento</label>
                      <input
                        type="text"
                        value={selectedSection.businessHours || ''}
                        onChange={(e) => updateSelectedSection({ businessHours: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* Section Items Inspector */}
                {selectedSection.items && selectedSection.items.length > 0 && (
                  <div className="pt-4 border-t border-slate-800/80 space-y-3">
                    <div className="flex items-center justify-between font-bold text-slate-300">
                      <span>Itens do Grid ({selectedSection.items.length})</span>
                      <button
                        onClick={() => {
                          const newItems = [...(selectedSection.items || [])];
                          newItems.push({
                            id: 'item-' + Date.now(),
                            title: 'Novo Serviço / Item',
                            description: 'Descrição do novo serviço oferecido.'
                          });
                          updateSelectedSection({ items: newItems });
                        }}
                        className="text-[11px] text-[#3689E6] hover:underline font-bold"
                      >
                        + Adicionar Item
                      </button>
                    </div>

                    {selectedSection.items.map((item, i) => (
                      <div key={item.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-[11px]">Item {i + 1}</span>
                          <button
                            onClick={() => {
                              const newItems = selectedSection.items?.filter(it => it.id !== item.id);
                              updateSelectedSection({ items: newItems });
                            }}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const newItems = selectedSection.items?.map(it => it.id === item.id ? { ...it, title: e.target.value } : it);
                            updateSelectedSection({ items: newItems });
                          }}
                          placeholder="Título do item"
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                        />
                        <textarea
                          rows={2}
                          value={item.description || item.subtitle || ''}
                          onChange={(e) => {
                            const newItems = selectedSection.items?.map(it => it.id === item.id ? { ...it, description: e.target.value } : it);
                            updateSelectedSection({ items: newItems });
                          }}
                          placeholder="Descrição do item"
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500">
                Selecione uma seção para editar suas propriedades.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI EDIT ASSISTANT MODAL */}
      {aiAssistantOpen && (
        <AIEditAssistantModal
          currentSite={site}
          onApplyChanges={(updatedSite) => {
            updateSiteState(updatedSite);
            setAiAssistantOpen(false);
          }}
          onClose={() => setAiAssistantOpen(false)}
          userCustomApiKey={userCustomApiKey}
        />
      )}

      {/* IMAGE PICKER MODAL */}
      {imagePickerSectionId && (
        <ImagePickerModal
          onSelectImage={(newImgUrl) => {
            const newSections = site.sections.map(s => 
              s.id === imagePickerSectionId ? { ...s, image: newImgUrl } : s
            );
            updateSiteState({ ...site, sections: newSections });
            setImagePickerSectionId(null);
          }}
          onClose={() => setImagePickerSectionId(null)}
        />
      )}
    </div>
  );
};
