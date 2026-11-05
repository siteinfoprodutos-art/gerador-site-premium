import React, { useState } from 'react';
import { 
  Download, 
  Code, 
  Globe, 
  Check, 
  Copy, 
  X, 
  FileText, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  Share2
} from 'lucide-react';
import { SiteData } from '../types/site';
import { generateSiteZip } from '../utils/exportZip';
import { StorageService } from '../data/storage';

interface ExportPublishModalProps {
  site: SiteData;
  onClose: () => void;
  onUpdateSite: (site: SiteData) => void;
}

export const ExportPublishModal: React.FC<ExportPublishModalProps> = ({
  site,
  onClose,
  onUpdateSite,
}) => {
  const [activeTab, setActiveTab] = useState<'zip' | 'code' | 'domain' | 'publish'>('zip');
  const [isExportingZip, setIsExportingZip] = useState(false);

  const [subdomain, setSubdomain] = useState(
    site.subdomain || site.businessName.toLowerCase().replace(/[^a-z0-0]/g, '') || 'meusite'
  );
  const [customDomain, setCustomDomain] = useState(site.customDomain || '');
  const [isPublished, setIsPublished] = useState(site.published || false);

  const [copiedCode, setCopiedCode] = useState(false);

  const handleDownloadZip = async () => {
    setIsExportingZip(true);
    try {
      const blob = await generateSiteZip(site);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${site.businessName.toLowerCase().replace(/\s+/g, '-')}-siteia.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert('Erro ao gerar arquivo ZIP.');
    } finally {
      setIsExportingZip(false);
    }
  };

  const handleSaveDomain = () => {
    const updated = {
      ...site,
      subdomain,
      customDomain,
      published: isPublished,
      publishedAt: isPublished ? new Date().toISOString() : site.publishedAt
    };
    StorageService.saveProject(updated);
    onUpdateSite(updated);
    alert('Configurações de domínio e publicação salvas!');
  };

  const rawHtmlSample = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>${site.seo?.metaTitle || site.title}</title>
  <meta name="description" content="${site.seo?.metaDescription || ''}" />
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[${site.colors?.background}] text-[${site.colors?.text}]">
  <!-- SITEIA Generated Code for ${site.businessName} -->
  <h1>${site.businessName}</h1>
</body>
</html>`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#071A35] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <h3 className="text-xl font-extrabold text-white tracking-tight font-['Manrope']">
            Exportação & Publicação do Site
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Exporte os arquivos HTML/CSS/JS completos ou configure o seu domínio de publicação.
          </p>
        </div>

        {/* Modal Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs font-bold text-slate-400">
          <button
            onClick={() => setActiveTab('zip')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
              activeTab === 'zip' ? 'bg-[#1769AA] text-white' : 'hover:text-white'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Baixar Pacote ZIP</span>
          </button>

          <button
            onClick={() => setActiveTab('domain')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
              activeTab === 'domain' ? 'bg-[#1769AA] text-white' : 'hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Domínio & Hospedagem</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
              activeTab === 'code' ? 'bg-[#1769AA] text-white' : 'hover:text-white'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Código Raw</span>
          </button>
        </div>

        {/* TAB 1: ZIP DOWNLOAD */}
        {activeTab === 'zip' && (
          <div className="space-y-6 py-2 overflow-y-auto">
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#1769AA]/20 text-[#3689E6] flex items-center justify-center font-bold">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Pacote de Produção Completo (.zip)</h4>
                  <p className="text-xs text-slate-400">Pronto para subir na Vercel, Netlify, Hostinger ou cPanel.</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span><code>index.html</code> — Código HTML5 responsivo e autônomo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span><code>styles.css</code> — Variáveis de cores e estilizção</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span><code>script.js</code> — Script de captura de leads e menu mobile</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span><code>site-schema.json</code> — Backup editável no SITEIA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span><code>README.txt</code> — Instruções passo a passo de publicação</span>
                </div>
              </div>

              <button
                onClick={handleDownloadZip}
                disabled={isExportingZip}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#1769AA] to-[#3689E6] text-white font-extrabold text-sm shadow-xl hover:brightness-110 disabled:opacity-50 transition flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                <span>{isExportingZip ? 'Gerando Pacote ZIP...' : 'BAIXAR ARQUIVO .ZIP AGORA'}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: DOMAIN & PUBLISH */}
        {activeTab === 'domain' && (
          <div className="space-y-6 py-2 overflow-y-auto text-xs">
            {/* Subdomain */}
            <div className="space-y-2">
              <label className="block font-bold text-slate-300 uppercase tracking-wider">
                Subdomínio Gratuito SITEIA
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#3689E6]"
                />
                <span className="text-slate-400 font-bold text-sm">.siteia.app</span>
              </div>
            </div>

            {/* Custom Domain */}
            <div className="space-y-2">
              <label className="block font-bold text-slate-300 uppercase tracking-wider">
                Domínio Próprio (Opcional)
              </label>
              <input
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="Ex: www.meusite.com.br"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#3689E6]"
              />
            </div>

            {/* Publication Toggle */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <h5 className="font-bold text-white text-sm">Status da Publicação</h5>
                <p className="text-slate-400 text-xs">Deixar o site acessível via link público.</p>
              </div>
              <button
                onClick={() => setIsPublished(!isPublished)}
                className={`px-4 py-2 rounded-xl font-bold text-xs transition ${
                  isPublished ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isPublished ? '✦ ONLINE' : 'RASCUNHO'}
              </button>
            </div>

            <button
              onClick={handleSaveDomain}
              className="w-full py-3.5 rounded-xl bg-[#1769AA] text-white font-bold text-xs hover:bg-[#3689E6] transition"
            >
              Salvar Configurações de Domínio
            </button>
          </div>
        )}

        {/* TAB 3: CODE VIEWER */}
        {activeTab === 'code' && (
          <div className="space-y-4 py-2 overflow-y-auto">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Preview do HTML Autônomo</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(rawHtmlSample);
                  setCopiedCode(true);
                  setTimeout(() => setCopiedCode(false), 2000);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedCode ? 'Copiado!' : 'Copiar Código'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-60 leading-relaxed">
              {rawHtmlSample}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
