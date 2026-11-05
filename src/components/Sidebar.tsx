import React from 'react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  PlusCircle, 
  LayoutTemplate, 
  Edit3, 
  Users, 
  Image as ImageIcon, 
  Settings, 
  UserCheck, 
  ShieldAlert,
  Sparkles,
  ChevronRight,
  Eye
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  projectsCount: number;
  leadsCount: number;
  onOpenMobileMenu?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onNavigate,
  projectsCount,
  leadsCount,
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'projetos', label: 'Meus Projetos', icon: FolderKanban, badge: projectsCount > 0 ? projectsCount : undefined },
    { id: 'wizard', label: 'Criar Novo Site', icon: PlusCircle, isHighlight: true },
    { id: 'templates', label: 'Biblioteca de Templates', icon: LayoutTemplate },
    { id: 'editor', label: 'Editor Visual', icon: Edit3 },
    { id: 'leads', label: 'Clientes & Leads', icon: Users, badge: leadsCount > 0 ? leadsCount : undefined },
    { id: 'midia', label: 'Mídia e Imagens', icon: ImageIcon },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
    { id: 'conta', label: 'Minha Conta', icon: UserCheck },
    { id: 'admin', label: 'Painel Admin', icon: ShieldAlert },
  ];

  const mobileBottomItems = [
    { id: 'dashboard', label: 'Início', icon: LayoutDashboard },
    { id: 'projetos', label: 'Projetos', icon: FolderKanban, badge: projectsCount },
    { id: 'wizard', label: '+ Criar', icon: PlusCircle, isPrimary: true },
    { id: 'templates', label: 'Templates', icon: LayoutTemplate },
    { id: 'leads', label: 'Leads', icon: Users, badge: leadsCount },
  ];

  return (
    <>
      {/* Desktop Sidebar (lg:flex) */}
      <aside className="w-64 bg-[#071A35] border-r border-slate-800/80 flex-col justify-between shrink-0 hidden lg:flex">
        {/* Navigation Links */}
        <div className="p-4 space-y-1 overflow-y-auto">
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Navegação Principal
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            if (item.isHighlight) {
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-bold text-sm transition my-2 shadow-lg ${
                    isActive
                      ? 'bg-gradient-to-r from-[#1769AA] to-[#3689E6] text-white ring-2 ring-[#3689E6]/50'
                      : 'bg-[#1769AA]/20 text-[#3689E6] hover:bg-[#1769AA]/30 border border-[#1769AA]/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition ${
                  isActive
                    ? 'bg-slate-800 text-white font-semibold border-l-4 border-[#3689E6]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#3689E6]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    isActive ? 'bg-[#1769AA] text-white' : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Banner Inside Sidebar */}
        <div className="p-4 border-t border-slate-800/80">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#0B1220] to-slate-900 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center gap-2 text-white font-bold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>SITEIA AI Engine v2.5</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Gere copys persuasivas e layouts responsivos automaticamente.
            </p>
            <button 
              onClick={() => onNavigate('wizard')}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:text-white font-semibold hover:bg-slate-700 transition text-[11px]"
            >
              <span>Iniciar com IA</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar (lg:hidden) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#071A35]/95 backdrop-blur-md border-t border-slate-800 lg:hidden px-2 py-2 flex items-center justify-around shadow-2xl">
        {mobileBottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (item.isPrimary) {
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="flex flex-col items-center justify-center -mt-5"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#1769AA] to-[#3689E6] text-white flex items-center justify-center shadow-lg ring-4 ring-[#071A35] active:scale-95 transition">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold text-[#3689E6] mt-1">{item.label}</span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl relative transition ${
                isActive ? 'text-[#3689E6]' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-bold mt-1">{item.label}</span>

              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-1 right-2 w-4 h-4 rounded-full bg-[#1769AA] text-white text-[9px] font-extrabold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};
