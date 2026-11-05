import React from 'react';
import { UserCheck, Check, Sparkles, Cpu, Shield, Zap } from 'lucide-react';
import { UserProfile, PlanTier } from '../types/site';
import { StorageService } from '../data/storage';

interface AccountPlansViewProps {
  user: UserProfile;
  onUpdateUser: (profile: UserProfile) => void;
}

export const AccountPlansView: React.FC<AccountPlansViewProps> = ({ user, onUpdateUser }) => {
  const plans: PlanTier[] = [
    {
      id: 'starter',
      name: 'STARTER',
      price: 'R$ 97',
      description: 'Ideal para profissionais autônomos criando seu primeiro site.',
      maxProjects: 3,
      hasAiAssistant: true,
      hasAdvancedExport: false,
      hasCustomDomain: false,
      hasAgencyFeatures: false,
      templatesAccess: 'essential',
      features: [
        'Até 3 Projetos Ativos',
        'Geração de Sites com IA (Gemini 3.8)',
        '10 Templates Essenciais',
        'Editor Visual Básico',
        'Exportação em Código HTML/CSS',
        'Captura de Leads Integrada'
      ]
    },
    {
      id: 'pro',
      name: 'PRO',
      price: 'R$ 197',
      description: 'Para empreendedores e pequenas agências que buscam escala.',
      maxProjects: 15,
      hasAiAssistant: true,
      hasAdvancedExport: true,
      hasCustomDomain: true,
      hasAgencyFeatures: false,
      templatesAccess: 'full',
      features: [
        'Até 15 Projetos Ativos',
        'Geração e Edição Ilimitada com IA',
        'Biblioteca Completa de 20+ Templates',
        'Editor Visual Avançado (3 Painéis)',
        'Exportação ZIP Completa (JSZip)',
        'Domínio Próprio & Subdomínio SITEIA',
        'Assistente Co-piloto de Redação IA'
      ]
    },
    {
      id: 'agency',
      name: 'AGENCY',
      price: 'R$ 397',
      description: 'Para agências digitais, freelancers seniores e software houses.',
      maxProjects: 100,
      hasAiAssistant: true,
      hasAdvancedExport: true,
      hasCustomDomain: true,
      hasAgencyFeatures: true,
      templatesAccess: 'vip',
      features: [
        'Até 100 Projetos por Cliente',
        'Módulo de Gestão de Clientes B2B',
        'White-Label & Remoção de Marca',
        'Exportação de Código React/Vite',
        'Suporte Prioritário VIP',
        'Recursos Avançados de SEO & Analytics'
      ]
    }
  ];

  const handleSwitchPlan = (planId: 'starter' | 'pro' | 'agency') => {
    const updated = { ...user, plan: planId };
    StorageService.saveUserProfile(updated);
    onUpdateUser(updated);
    alert(`Seu plano foi alterado para ${planId.toUpperCase()}! Todos os recursos foram liberados.`);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1769AA]/20 text-[#3689E6] text-xs font-bold border border-[#1769AA]/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Planos & Licenciamento Comercial</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight font-['Manrope']">
          Escolha o Plano Ideal para o Seu Negócio
        </h1>
        <p className="text-slate-400 text-sm">
          Alterne entre os planos para testar recursos do SITEIA.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const isCurrent = user.plan === plan.id;
          const isPro = plan.id === 'pro';

          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-8 border flex flex-col justify-between relative transition duration-300 ${
                isPro
                  ? 'bg-gradient-to-b from-[#1769AA]/30 to-[#071A35] border-[#3689E6] ring-2 ring-[#3689E6]/50 shadow-2xl scale-105'
                  : 'bg-[#071A35] border-slate-800'
              }`}
            >
              {isPro && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#1769AA] to-[#3689E6] text-white text-xs font-extrabold uppercase tracking-wider shadow">
                  Recomendado para Agências
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-extrabold text-white">{plan.name}</h3>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">{plan.description}</p>
                </div>

                <div>
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-xs text-slate-400 font-medium ml-1">/mês ou licença</span>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#3689E6] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => handleSwitchPlan(plan.id)}
                  disabled={isCurrent}
                  className={`w-full py-4 rounded-2xl font-extrabold text-sm transition shadow-lg ${
                    isCurrent
                      ? 'bg-slate-800 text-slate-400 cursor-default border border-slate-700'
                      : isPro
                      ? 'bg-gradient-to-r from-[#1769AA] to-[#3689E6] text-white hover:brightness-110'
                      : 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-700'
                  }`}
                >
                  {isCurrent ? '✦ PLANO ATUAL' : `Alternar para ${plan.name}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
