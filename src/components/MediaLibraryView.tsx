import React, { useState } from 'react';
import { Image as ImageIcon, Search, Upload, Copy, Check, Sparkles } from 'lucide-react';

export const MediaLibraryView: React.FC = () => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('imoveis');

  const stockImages: Record<string, Array<{ id: string; title: string; url: string }>> = {
    imoveis: [
      { id: 'img1', title: 'Penthouse Faria Lima', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop' },
      { id: 'img2', title: 'Villa Contemporânea', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop' },
      { id: 'img3', title: 'Apartamento Moderno', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop' },
    ],
    saude: [
      { id: 'img4', title: 'Consultório Médico', url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop' },
      { id: 'img5', title: 'Atendimento Humanizado', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop' },
    ],
    restaurantes: [
      { id: 'img6', title: 'Massa Artesanal', url: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?q=80&w=800&auto=format&fit=crop' },
      { id: 'img7', title: 'Ambiente Bistrô', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop' },
    ],
    tecnologia: [
      { id: 'img8', title: 'Equipe Tech', url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop' },
      { id: 'img9', title: 'Dashboard Cloud', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop' },
    ]
  };

  const currentList = stockImages[selectedCategory] || [];

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-[#3689E6]" />
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-['Manrope']">
              Biblioteca de Mídia & Imagens
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Imagens em altíssima resolução selecionadas por nicho de mercado.
          </p>
        </div>

        <button 
          onClick={() => alert('Envio de imagens locais ativo! Você também pode colar a URL de qualquer imagem no editor.')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1769AA] to-[#3689E6] text-white font-bold text-xs shadow"
        >
          <Upload className="w-4 h-4" />
          <span>Fazer Upload de Imagem</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {Object.keys(stockImages).map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition ${
              selectedCategory === cat ? 'bg-[#1769AA] text-white shadow' : 'bg-[#071A35] text-slate-400 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Images Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {currentList.map(img => (
          <div key={img.id} className="rounded-2xl bg-[#071A35] border border-slate-800 overflow-hidden space-y-2 group">
            <div className="h-48 overflow-hidden relative">
              <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="font-bold text-white text-xs">{img.title}</span>
              <button
                onClick={() => copyUrl(img.url)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5 text-[#3689E6]" />
                <span>{copiedUrl === img.url ? 'Copiado!' : 'Copiar URL'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
