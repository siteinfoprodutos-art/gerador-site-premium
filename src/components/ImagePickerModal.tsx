import React, { useState } from 'react';
import { Image as ImageIcon, Upload, Link as LinkIcon, Check, X, Sparkles } from 'lucide-react';

interface ImagePickerModalProps {
  onSelectImage: (imageUrl: string) => void;
  onClose: () => void;
}

export const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
  onSelectImage,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'url' | 'upload'>('presets');
  const [customUrl, setCustomUrl] = useState('');

  const stockPresets = [
    { title: 'Correspondente Bancário / Finanças', url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop' },
    { title: 'Atendimento ao Cliente / Consultor', url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop' },
    { title: 'Imobiliária / Arquitetura', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop' },
    { title: 'Saúde / Medicina', url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop' },
    { title: 'Gastronomia / Restaurante', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop' },
    { title: 'Tecnologia / Dashboard', url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          onSelectImage(reader.result.toString());
          onClose();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#071A35] border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <div>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#3689E6]" />
            <span>Anexar / Alterar Imagem</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">Escolha uma imagem do acervo, informe uma URL ou faça upload.</p>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs font-bold text-slate-400">
          <button
            onClick={() => setActiveTab('presets')}
            className={`px-3.5 py-2 rounded-xl transition ${activeTab === 'presets' ? 'bg-[#1769AA] text-white' : 'hover:text-white'}`}
          >
            Acervo de Fotos
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={`px-3.5 py-2 rounded-xl transition ${activeTab === 'url' ? 'bg-[#1769AA] text-white' : 'hover:text-white'}`}
          >
            URL da Imagem
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-3.5 py-2 rounded-xl transition ${activeTab === 'upload' ? 'bg-[#1769AA] text-white' : 'hover:text-white'}`}
          >
            Upload do Computador
          </button>
        </div>

        {/* Tab 1: Presets */}
        {activeTab === 'presets' && (
          <div className="grid grid-cols-2 gap-3 max-h-72 overflow-y-auto">
            {stockPresets.map((img, i) => (
              <div
                key={i}
                onClick={() => {
                  onSelectImage(img.url);
                  onClose();
                }}
                className="rounded-2xl border border-slate-800 overflow-hidden cursor-pointer hover:border-[#3689E6] transition group"
              >
                <img src={img.url} alt={img.title} className="w-full h-28 object-cover group-hover:scale-105 transition" />
                <p className="p-2 text-[11px] font-bold text-slate-300 truncate bg-slate-900">{img.title}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: URL */}
        {activeTab === 'url' && (
          <div className="space-y-4">
            <input
              type="url"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#3689E6]"
            />
            <button
              onClick={() => {
                if (customUrl) {
                  onSelectImage(customUrl);
                  onClose();
                }
              }}
              className="w-full py-3 rounded-xl bg-[#1769AA] text-white font-bold text-xs hover:bg-[#3689E6] transition"
            >
              Aplicar esta URL
            </button>
          </div>
        )}

        {/* Tab 3: Upload */}
        {activeTab === 'upload' && (
          <div className="p-8 border-2 border-dashed border-slate-800 rounded-2xl text-center space-y-3">
            <Upload className="w-10 h-10 text-[#3689E6] mx-auto" />
            <p className="text-xs font-bold text-white">Escolha um arquivo de imagem do seu dispositivo</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#1769AA] file:text-white hover:file:bg-[#3689E6]"
            />
          </div>
        )}
      </div>
    </div>
  );
};
