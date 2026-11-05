import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { ProjectWizard } from './components/ProjectWizard';
import { TemplateLibraryView } from './components/TemplateLibraryView';
import { VisualEditorView } from './components/VisualEditorView';
import { LeadsView } from './components/LeadsView';
import { MediaLibraryView } from './components/MediaLibraryView';
import { SettingsView } from './components/SettingsView';
import { AccountPlansView } from './components/AccountPlansView';
import { AdminView } from './components/AdminView';
import { ExportPublishModal } from './components/ExportPublishModal';
import { SiteViewerModal } from './components/SiteViewerModal';

import { SiteData, Template, UserProfile, Lead } from './types/site';
import { StorageService } from './data/storage';
import { ALL_TEMPLATES } from './data/templates';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [projects, setProjects] = useState<SiteData[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [user, setUser] = useState<UserProfile>(StorageService.getUserProfile());

  const [activeProject, setActiveProject] = useState<SiteData | null>(null);
  const [exportModalProject, setExportModalProject] = useState<SiteData | null>(null);
  const [viewingSiteModalProject, setViewingSiteModalProject] = useState<SiteData | null>(null);
  const [globalSearch, setGlobalSearch] = useState<string>('');

  const reloadData = () => {
    setProjects(StorageService.getProjects());
    setLeads(StorageService.getLeads());
    setUser(StorageService.getUserProfile());
  };

  useEffect(() => {
    reloadData();
  }, []);

  const handleOpenProjectInEditor = (project: SiteData) => {
    setActiveProject(project);
    setActiveTab('editor');
  };

  const handleCreateNewSite = () => {
    setActiveTab('wizard');
  };

  const handleSelectTemplate = (template: Template) => {
    const newSiteData: SiteData = {
      ...JSON.parse(JSON.stringify(template.siteData)),
      id: 'proj-' + Date.now(),
      title: `${template.siteData.title || template.name}`,
      businessName: template.siteData.businessName || template.name,
      published: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    StorageService.saveProject(newSiteData);
    reloadData();
    setActiveProject(newSiteData);
    setActiveTab('editor');
  };

  const handleWizardComplete = (siteData: SiteData) => {
    StorageService.saveProject(siteData);
    reloadData();
    setActiveProject(siteData);
    setActiveTab('editor');
  };

  const handleDuplicateProject = (id: string) => {
    StorageService.duplicateProject(id);
    reloadData();
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este projeto?')) {
      StorageService.deleteProject(id);
      reloadData();
      if (activeProject?.id === id) {
        setActiveProject(null);
        setActiveTab('dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#071A35] text-slate-100 flex flex-col font-['Inter',sans-serif]">
      {/* Top Navbar */}
      <Navbar
        user={user}
        activeTab={activeTab}
        onNavigate={(tab) => setActiveTab(tab)}
        onCreateNewSite={handleCreateNewSite}
        searchQuery={globalSearch}
        onSearchChange={(q) => setGlobalSearch(q)}
      />

      {/* App Body with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar menu (hidden when in Editor view for maximum editing canvas space) */}
        {activeTab !== 'editor' && (
          <Sidebar
            activeTab={activeTab}
            onNavigate={(tab) => setActiveTab(tab)}
            projectsCount={projects.length}
            leadsCount={leads.length}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#0B1220]">
          {activeTab === 'dashboard' && (
            <DashboardView
              projects={projects}
              templates={ALL_TEMPLATES}
              onOpenProject={handleOpenProjectInEditor}
              onViewSite={(p) => setViewingSiteModalProject(p)}
              onCreateNewSite={handleCreateNewSite}
              onSelectTemplate={handleSelectTemplate}
              onDuplicateProject={handleDuplicateProject}
              onDeleteProject={handleDeleteProject}
              onExportProject={(p) => setExportModalProject(p)}
              onNavigateTab={(t) => setActiveTab(t)}
            />
          )}

          {activeTab === 'projetos' && (
            <DashboardView
              projects={projects}
              templates={ALL_TEMPLATES}
              onOpenProject={handleOpenProjectInEditor}
              onViewSite={(p) => setViewingSiteModalProject(p)}
              onCreateNewSite={handleCreateNewSite}
              onSelectTemplate={handleSelectTemplate}
              onDuplicateProject={handleDuplicateProject}
              onDeleteProject={handleDeleteProject}
              onExportProject={(p) => setExportModalProject(p)}
              onNavigateTab={(t) => setActiveTab(t)}
            />
          )}

          {activeTab === 'wizard' && (
            <ProjectWizard
              onComplete={handleWizardComplete}
              onCancel={() => setActiveTab('dashboard')}
              userCustomKey={user.customGeminiApiKey}
            />
          )}

          {activeTab === 'templates' && (
            <TemplateLibraryView
              templates={ALL_TEMPLATES}
              onSelectTemplate={handleSelectTemplate}
            />
          )}

          {activeTab === 'editor' && activeProject && (
            <VisualEditorView
              siteData={activeProject}
              onSave={(updated) => {
                StorageService.saveProject(updated);
                setActiveProject(updated);
                reloadData();
              }}
              onExport={(p) => setExportModalProject(p)}
              onViewSite={(p) => setViewingSiteModalProject(p)}
              onBack={() => setActiveTab('dashboard')}
              userCustomApiKey={user.customGeminiApiKey}
            />
          )}

          {activeTab === 'editor' && !activeProject && (
            <div className="p-12 text-center space-y-4">
              <h2 className="text-xl font-bold text-white">Nenhum projeto selecionado no editor</h2>
              <button
                onClick={handleCreateNewSite}
                className="px-6 py-3 rounded-xl bg-[#1769AA] text-white font-bold text-xs"
              >
                Criar Novo Site com IA
              </button>
            </div>
          )}

          {activeTab === 'leads' && (
            <LeadsView leads={leads} onRefresh={reloadData} />
          )}

          {activeTab === 'midia' && (
            <MediaLibraryView />
          )}

          {activeTab === 'configuracoes' && (
            <SettingsView user={user} onUpdateUser={(u) => setUser(u)} />
          )}

          {activeTab === 'conta' && (
            <AccountPlansView user={user} onUpdateUser={(u) => setUser(u)} />
          )}

          {activeTab === 'admin' && (
            <AdminView />
          )}
        </main>
      </div>

      {/* Live Site Viewer Modal */}
      {viewingSiteModalProject && (
        <SiteViewerModal
          site={viewingSiteModalProject}
          onClose={() => setViewingSiteModalProject(null)}
          onEdit={(p) => handleOpenProjectInEditor(p)}
          onExport={(p) => setExportModalProject(p)}
        />
      )}

      {/* Export / Publish Modal */}
      {exportModalProject && (
        <ExportPublishModal
          site={exportModalProject}
          onClose={() => setExportModalProject(null)}
          onUpdateSite={(updated) => {
            StorageService.saveProject(updated);
            reloadData();
            if (activeProject?.id === updated.id) setActiveProject(updated);
          }}
        />
      )}
    </div>
  );
}
