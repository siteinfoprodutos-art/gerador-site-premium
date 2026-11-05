import React, { useState } from 'react';
import { Users, Search, Download, Trash2, CheckCircle2, MessageSquare, Phone, Mail, Filter } from 'lucide-react';
import { Lead } from '../types/site';
import { StorageService } from '../data/storage';

interface LeadsViewProps {
  leads: Lead[];
  onRefresh: () => void;
}

export const LeadsView: React.FC<LeadsViewProps> = ({ leads, onRefresh }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = leads.filter(l => {
    const matchesStatus = statusFilter === 'todos' || l.status === statusFilter;
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleUpdateStatus = (id: string, status: Lead['status']) => {
    StorageService.updateLeadStatus(id, status);
    onRefresh();
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Deseja excluir este lead?')) {
      StorageService.deleteLead(id);
      onRefresh();
      if (selectedLead?.id === id) setSelectedLead(null);
    }
  };

  const exportLeadsCsv = () => {
    const headers = 'ID,Projeto,Nome,Email,Telefone,Assunto,Status,Data\n';
    const rows = leads.map(l => 
      `"${l.id}","${l.projectName}","${l.name}","${l.email}","${l.phone}","${l.subject || ''}","${l.status}","${new Date(l.createdAt).toLocaleDateString('pt-BR')}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `siteia-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-[#3689E6]" />
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-['Manrope']">
              Gestão de Clientes & Leads
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Contatos e formulários recebidos através de todos os seus sites publicados.
          </p>
        </div>

        <button
          onClick={exportLeadsCsv}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white text-xs font-bold transition shadow"
        >
          <Download className="w-4 h-4 text-[#3689E6]" />
          <span>Exportar Leads (CSV)</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#071A35] p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome, email ou site..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#3689E6]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 overflow-x-auto w-full md:w-auto">
          <span className="shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#3689E6]" />
            <span>Status:</span>
          </span>
          {['todos', 'novo', 'em_atendimento', 'convertido', 'arquivado'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg capitalize shrink-0 transition ${
                statusFilter === st ? 'bg-[#1769AA] text-white' : 'bg-slate-900 hover:text-white'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-[#071A35] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        {filteredLeads.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-2">
            <Users className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="font-bold text-white text-sm">Nenhum lead encontrado.</p>
            <p className="text-xs">Os dados capturados nos formulários dos seus sites aparecerão aqui.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 border-b border-slate-800 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Cliente / Nome</th>
                  <th className="p-4">Site / Origem</th>
                  <th className="p-4">Contato</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Data</th>
                  <th className="p-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-900/50 transition">
                    <td className="p-4 font-bold text-white">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-[#1769AA]/20 text-[#3689E6] font-bold flex items-center justify-center">
                          {lead.name.charAt(0)}
                        </span>
                        <div>
                          <div className="font-bold">{lead.name}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{lead.subject || 'Mensagem Geral'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-slate-300">{lead.projectName}</td>
                    <td className="p-4 space-y-0.5 text-slate-400">
                      <div>{lead.email}</div>
                      <div className="text-[10px] text-[#3689E6]">{lead.phone}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold capitalize ${
                        lead.status === 'novo' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        lead.status === 'em_atendimento' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        lead.status === 'convertido' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {lead.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400">{new Date(lead.createdAt).toLocaleDateString('pt-BR')}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-[#3689E6] font-bold"
                      >
                        Ver Detalhes
                      </button>
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* LEAD DETAILS MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#071A35] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-extrabold text-white text-lg">Detalhes do Lead</h3>
              <button onClick={() => setSelectedLead(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Nome do Cliente</span>
                <span className="text-base font-bold text-white">{selectedLead.name}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 block mb-0.5">E-mail</span>
                  <span className="font-semibold text-white">{selectedLead.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Telefone / WhatsApp</span>
                  <a href={`https://wa.me/${selectedLead.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="font-bold text-[#3689E6] hover:underline">
                    {selectedLead.phone}
                  </a>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block mb-0.5">Mensagem Completa</span>
                <p className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 leading-relaxed">
                  {selectedLead.message}
                </p>
              </div>

              <div className="pt-2">
                <span className="text-slate-400 block mb-2 font-bold">Alterar Status do CRM:</span>
                <div className="flex gap-2">
                  {(['novo', 'em_atendimento', 'convertido', 'arquivado'] as Lead['status'][]).map(st => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedLead.id, st)}
                      className={`flex-1 py-2 rounded-xl capitalize font-bold text-[11px] ${
                        selectedLead.status === st ? 'bg-[#1769AA] text-white' : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
