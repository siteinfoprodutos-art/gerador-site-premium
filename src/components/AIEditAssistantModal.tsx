import React, { useState } from 'react';
import { Sparkles, Wand2, X, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { SiteData } from '../types/site';

interface AIEditAssistantModalProps {
  currentSite: SiteData;
  onApplyChanges: (updatedSite: SiteData) => void;
  onClose: () => void;
  userCustomApiKey?: string;
}

export const AIEditAssistantModal: React.FC<AIEditAssistantModalProps> = ({
  currentSite,
  onApplyChanges,
  onClose,
  userCustomApiKey,
}) => {
  const [instruction, setInstruction] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const samplePrompts = [
    'Deixe meu site com visual mais sofisticado e elegante',
    'Altere as cores principais para azul escuro e dourado',
    'Crie uma seção de depoimentos de clientes satisfeitos',
    'Reescreva o título principal da Hero para algo mais persuasivo e comercial',
    'Adicione uma tabela de preços com 2 planos empresariais',
    'Crie uma seção de perguntas frequentes (FAQ)'
  ];

  const handleApply = async (cmd: string) => {
    if (!cmd.trim()) return;
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/gemini/edit-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentSite,
          instruction: cmd,
          customKey: userCustomApiKey
        })
      });

      const data = await response.json();
      if (!data.success || !data.siteData) {
        throw new Error(data.error || 'Erro ao aplicar alterações com IA.');
      }

      setIsLoading(false);
      onApplyChanges(data.siteData);
    } catch (err: any) {
      console.error(err);
      setIsLoading(false);
      setErrorMsg(err.message || 'Falha ao processar comando da IA.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#071A35] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#3689E6]" />
            <h3 className="text-xl font-extrabold text-white tracking-tight font-['Manrope']">
              Assistente de Edição com IA
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Descreva como deseja modificar seu site em linguagem natural. A IA atualizará apenas os elementos solicitados.
          </p>
        </div>

        {/* Prompt Input */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            Como deseja modificar seu site?
          </label>
          <textarea
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            rows={3}
            disabled={isLoading}
            placeholder="Ex: Deixe o tom mais comercial, adicione depoimentos e mude as cores para azul e branco..."
            className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#3689E6] disabled:opacity-50"
          />
        </div>

        {/* Sample Prompts */}
        <div className="space-y-2">
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Exemplos de Comandos Rápidos:
          </label>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => {
                  setInstruction(prompt);
                  handleApply(prompt);
                }}
                disabled={isLoading}
                className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 hover:text-white hover:border-[#3689E6] transition text-left"
              >
                ✦ {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-800 transition"
          >
            Cancelar
          </button>

          <button
            onClick={() => handleApply(instruction)}
            disabled={isLoading || !instruction.trim()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-[#1769AA] text-white font-extrabold text-xs shadow-lg hover:brightness-110 disabled:opacity-40 transition"
          >
            <Wand2 className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Processando Alterações...' : 'Aplicar Modificações'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
