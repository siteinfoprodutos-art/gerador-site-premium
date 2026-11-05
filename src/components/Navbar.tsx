import React from 'react';
import { 
  Plus, 
  Sparkles, 
  User, 
  Search, 
  ShieldCheck, 
  Globe, 
  Bell,
  Cpu
} from 'lucide-react';
import { UserProfile } from '../types/site';

interface NavbarProps {
  user: UserProfile;
  activeTab: string;
  onNavigate: (tab: string) => void;
  onCreateNewSite: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeTab,
  onNavigate,
  onCreateNewSite,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="h-16 bg-[#071A35] border-b border-slate-800/80 px-4 md:px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Brand & Logo */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => onNavigate('dashboard')} 
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1769AA] to-[#3689E6] p-0.5 shadow-lg shadow-[#1769AA]/20 group-hover:scale-105 transition duration-200 flex items-center justify-center">
            <div className="w-full h-full bg-[#071A35] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#3689E6] animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white font-['Manrope']">SITE<span className="text-[#3689E6]">IA</span></span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#1769AA]/20 text-[#3689E6] border border-[#1769AA]/30">PRO</span>
            </div>
          </div>
        </button>
      </div>

      {/* Global Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar projetos, templates ou leads..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#1769AA] focus:ring-1 focus:ring-[#1769AA] transition"
          />
        </div>
      </div>

      {/* Action Buttons & User Profile */}
      <div className="flex items-center gap-3">
        {/* Plan Tier Badge */}
        <button 
          onClick={() => onNavigate('conta')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition"
        >
          <Cpu className="w-3.5 h-3.5 text-[#3689E6]" />
          <span className="capitalize">{user.plan}</span>
        </button>

        {/* Admin Badge if admin */}
        {user.role === 'admin' && (
          <button 
            onClick={() => onNavigate('admin')}
            className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-[11px] font-bold text-amber-400 hover:bg-amber-500/20 transition"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Painel Admin</span>
          </button>
        )}

        {/* Notifications mock */}
        <button className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center relative hover:bg-slate-800 transition">
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-[#3689E6] absolute top-2 right-2 ring-2 ring-[#071A35]" />
        </button>

        {/* Primary "+ Criar novo site" CTA */}
        <button
          onClick={onCreateNewSite}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#1769AA] to-[#3689E6] text-white font-bold text-sm shadow-md shadow-[#1769AA]/30 hover:brightness-110 active:scale-95 transition"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span className="hidden sm:inline">Criar novo site</span>
        </button>

        {/* Profile Avatar */}
        <button 
          onClick={() => onNavigate('conta')}
          className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 hover:border-[#1769AA] transition"
          title="Minha Conta"
        >
          <User className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
