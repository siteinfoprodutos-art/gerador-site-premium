import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Tablet, 
  Monitor, 
  ExternalLink, 
  Edit3, 
  Download, 
  Share2, 
  Copy, 
  Check, 
  QrCode, 
  RotateCw,
  Sparkles,
  Globe
} from 'lucide-react';
import { SiteData } from '../types/site';
import { SiteRenderer } from './SiteRenderer';

interface SiteViewerModalProps {
  site: SiteData;
  onClose: () => void;
  onEdit?: (site: SiteData) => void;
  onExport?: (site: SiteData) => void;
}

export const SiteViewerModal: React.FC<SiteViewerModalProps> = ({
  site,
  onClose,
  onEdit,
  onExport,
}) => {
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

  const previewUrl = `https://${site.subdomain || 'site'}.siteia.app`;

  const copyShareLink = () => {
    navigator.clipboard.writeText(previewUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col font-['Inter',sans-serif]">
      {/* Top Controls Toolbar */}
      <div className="h-16 bg-[#071A35] border-b border-slate-800 px-4 md:px-6 flex items-center justify-between shrink-0">
        {/* Left: Site Info & Status */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#1769AA] to-[#3689E6] text-white font-bold flex items-center justify-center shrink-0">
            ✦
          </div>
          <div className="truncate">
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-white text-sm md:text-base truncate">{site.businessName || site.title}</h3>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                site.published ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}>
                {site.published ? 'Online' : 'Modo Prévia'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate hidden sm:block">{previewUrl}</p>
          </div>
        </div>

        {/* Center: Device Viewport Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setDevice('mobile')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              device === 'mobile' ? 'bg-gradient-to-r from-[#1769AA] to-[#3689E6] text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
            title="Visualização Smartphone (Mobile First 375px)"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">Mobile</span>
          </button>

          <button
            onClick={() => setDevice('tablet')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              device === 'tablet' ? 'bg-gradient-to-r from-[#1769AA] to-[#3689E6] text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
            title="Visualização Tablet (768px)"
          >
            <Tablet className="w-4 h-4" />
            <span className="hidden sm:inline">Tablet</span>
          </button>

          <button
            onClick={() => setDevice('desktop')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              device === 'desktop' ? 'bg-gradient-to-r from-[#1769AA] to-[#3689E6] text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
            title="Visualização Desktop (100%)"
          >
            <Monitor className="w-4 h-4" />
            <span className="hidden sm:inline">Desktop</span>
          </button>

          {device !== 'desktop' && (
            <button
              onClick={() => setOrientation(orientation === 'portrait' ? 'landscape' : 'portrait')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white border border-slate-800 transition"
              title="Girar Tela"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={copyShareLink}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition"
            title="Copiar Link de Compartilhamento"
          >
            <Share2 className="w-3.5 h-3.5 text-[#3689E6]" />
            <span>{copiedLink ? 'Link Copiado!' : 'Compartilhar'}</span>
          </button>

          {onEdit && (
            <button
              onClick={() => {
                onClose();
                onEdit(site);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#1769AA] text-white font-bold text-xs hover:bg-[#3689E6] transition shadow"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Editar Site</span>
            </button>
          )}

          {onExport && (
            <button
              onClick={() => {
                onClose();
                onExport(site);
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-900 text-slate-400 hover:text-white flex items-center justify-center border border-slate-800 transition"
            title="Fechar Visualização"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="flex-1 bg-slate-950 p-2 sm:p-6 overflow-y-auto flex items-start justify-center relative">
        <div 
          className={`transition-all duration-300 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-[#071A35] my-auto ${
            device === 'mobile'
              ? orientation === 'portrait' ? 'w-[375px] min-h-[720px] ring-8 ring-slate-900' : 'w-[720px] h-[375px] ring-8 ring-slate-900'
              : device === 'tablet'
              ? orientation === 'portrait' ? 'w-[768px] min-h-[960px] ring-8 ring-slate-900' : 'w-[960px] h-[768px] ring-8 ring-slate-900'
              : 'w-full max-w-6xl min-h-full'
          }`}
        >
          {/* Mobile Screen Notch Bar for realism */}
          {device === 'mobile' && orientation === 'portrait' && (
            <div className="h-6 bg-slate-950 flex items-center justify-between px-6 text-[10px] text-slate-400 font-bold border-b border-slate-900">
              <span>9:41</span>
              <div className="w-16 h-3 bg-slate-900 rounded-full" />
              <span>100% 🔋</span>
            </div>
          )}

          {/* Render Site */}
          <SiteRenderer siteData={site} interactive={false} />
        </div>
      </div>
    </div>
  );
};
