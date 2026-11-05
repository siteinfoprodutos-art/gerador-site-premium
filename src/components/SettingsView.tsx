import React, { useState } from 'react';
import { Settings, Key, ShieldCheck, Save, Sparkles, Check } from 'lucide-react';
import { UserProfile } from '../types/site';
import { StorageService } from '../data/storage';

interface SettingsViewProps {
  user: UserProfile;
  onUpdateUser: (profile: UserProfile) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ user, onUpdateUser }) => {
  const [customKey, setCustomKey] = useState(user.customGeminiApiKey || '');
  const [useCustomKeyOnly, setUseCustomKeyOnly] = useState(user.useCustomKeyOnly || false);
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSave = () => {
    const updated: UserProfile = {
      ...user,
      customGeminiApiKey: customKey,
      useCustomKeyOnly
    };
    StorageService.saveUserProfile(updated);
    onUpdateUser(updated);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-4xl mx-auto">
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2">
          <Settings className="w-6 h-6 text-[#3689E6]" />
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-['Manrope']">
            Configurações do Sistema SITEIA
          </h1>
        </div>
        <p className="text-slate-400 text-sm mt-1">
          Gerencie suas preferências de inteligência artificial e credenciais.
        </p>
      </div>

      <div className="bg-[#071A35] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <Key className="w-5 h-5 text-[#3689E6]" />
          <h3 className="font-bold text-white text-base">Chave de API Gemini Personalizada</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          O SITEIA já possui integração nativa com inteligência artificial no servidor backend. Caso você queira utilizar sua própria chave de API do Google AI Studio para evitar cotas compartilhadas, informe-a abaixo.
        </p>

        {savedMsg && (
          <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Configurações salvas com sucesso!</span>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Sua Gemini API Key (Opcional)
            </label>
            <input
              type="password"
              value={customKey}
              onChange={(e) => setCustomKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#3689E6]"
            />
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800">
            <input
              type="checkbox"
              id="useCustomOnly"
              checked={useCustomKeyOnly}
              onChange={(e) => setUseCustomKeyOnly(e.target.checked)}
              className="w-4 h-4 rounded text-[#3689E6] focus:ring-0 cursor-pointer"
            />
            <label htmlFor="useCustomOnly" className="text-xs font-semibold text-slate-300 cursor-pointer">
              Utilizar exclusivamente a minha chave própria para todas as gerações de IA
            </label>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#1769AA] to-[#3689E6] text-white font-bold text-xs shadow hover:brightness-110 transition"
        >
          <Save className="w-4 h-4" />
          <span>Salvar Configurações</span>
        </button>
      </div>
    </div>
  );
};
