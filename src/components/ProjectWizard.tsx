import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Layers, 
  Palette, 
  LayoutTemplate, 
  Bot, 
  Link as LinkIcon,
  Upload,
  Check,
  AlertCircle,
  HelpCircle,
  Wand2
} from 'lucide-react';
import { ProjectType, VisualStyle, SiteData, Template } from '../types/site';
import { ALL_TEMPLATES, TEMPLATE_CATEGORIES } from '../data/templates';

interface ProjectWizardProps {
  onComplete: (siteData: SiteData) => void;
  onCancel: () => void;
  userCustomKey?: string;
}

export const ProjectWizard: React.FC<ProjectWizardProps> = ({
  onComplete,
  onCancel,
  userCustomKey,
}) => {
  const [step, setStep] = useState<number>(1);
  const [creationMode, setCreationMode] = useState<'wizard' | 'reference'>('wizard');

  // Step 1: Business Info
  const [businessName, setBusinessName] = useState('');
  const [niche, setNiche] = useState('Imobiliária de Alto Padrão');
  const [description, setDescription] = useState('');
  const [services, setServices] = useState('');
  const [differentials, setDifferentials] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [phone, setPhone] = useState('(11) 98765-4321');
  const [whatsapp, setWhatsapp] = useState('5511987654321');
  const [email, setEmail] = useState('contato@empresa.com.br');
  const [address, setAddress] = useState('Av. Brigadeiro Faria Lima, 2000');
  const [cityState, setCityState] = useState('São Paulo - SP');
  const [instagram, setInstagram] = useState('@suaempresa');

  // Step 2: Project Type
  const [projectType, setProjectType] = useState<ProjectType>('institucional');

  // Step 3: Visual Identity
  const [style, setStyle] = useState<VisualStyle>('premium');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [primaryColor, setPrimaryColor] = useState('#1769AA');

  // Step 4: Template Choice
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  // Step 4 (Reference Mode):
  const [referenceUrl, setReferenceUrl] = useState('');
  const [referenceDescription, setReferenceDescription] = useState('');

  // Step 5: AI Generation Progress
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStepMsg, setGenerationStepMsg] = useState('Iniciando análise do seu negócio...');
  const [progressPercent, setProgressPercent] = useState(0);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const projectTypesList: Array<{ id: ProjectType; label: string; desc: string; icon: string }> = [
    { id: 'institucional', label: 'Site Institucional', desc: 'Apresentação completa de serviços, história e contato da empresa.', icon: '🏢' },
    { id: 'landing_page', label: 'Landing Page de Alta Conversão', desc: 'Focada em um único objetivo comercial ou produto.', icon: '⚡' },
    { id: 'vendas', label: 'Página de Vendas', desc: 'Estrutura com oferta, vídeo, benefícios e chamada de pagamento.', icon: '🛒' },
    { id: 'servicos', label: 'Página de Serviços', desc: 'Catálogo detalhado de soluções e orçamentos.', icon: '🛠️' },
    { id: 'portfolio', label: 'Portfólio Profissional', desc: 'Exibição de trabalhos, obras e projetos realizados.', icon: '🎨' },
    { id: 'negocio_local', label: 'Site para Negócio Local', desc: 'Com mapa, horários, localização Waze e WhatsApp direto.', icon: '📍' },
    { id: 'captura_leads', label: 'Página de Captura de Leads', desc: 'Formulário direto para atração de prospectos.', icon: '🎯' },
  ];

  const stylesList: Array<{ id: VisualStyle; label: string; color: string }> = [
    { id: 'premium', label: 'Premium & Sofisticado', color: 'from-blue-600 to-indigo-900' },
    { id: 'minimalista', label: 'Minimalista & Limpo', color: 'from-slate-700 to-slate-900' },
    { id: 'corporativo', label: 'Corporativo & Sólido', color: 'from-blue-900 to-[#071A35]' },
    { id: 'moderno', label: 'Moderno & Dinâmico', color: 'from-cyan-600 to-blue-600' },
    { id: 'elegante', label: 'Elegante & Refinado', color: 'from-amber-600 to-stone-900' },
    { id: 'criativo', label: 'Criativo & Vibrante', color: 'from-purple-600 to-pink-600' },
    { id: 'tecnologico', label: 'Tecnológico & Futuristic', color: 'from-blue-500 to-emerald-500' },
  ];

  const filteredTemplates = ALL_TEMPLATES.filter(t => 
    t.category.toLowerCase().includes(niche.toLowerCase()) || 
    niche.toLowerCase().includes(t.category.toLowerCase()) ||
    t.siteData.projectType === projectType
  );

  const displayedTemplates = filteredTemplates.length > 0 ? filteredTemplates : ALL_TEMPLATES.slice(0, 6);

  const handleStartGeneration = async () => {
    setIsGenerating(true);
    setGenerationError(null);
    setProgressPercent(10);
    setGenerationStepMsg('Analisando informações do seu negócio...');

    try {
      // Simulate real progress steps while calling API
      setTimeout(() => { setProgressPercent(25); setGenerationStepMsg('Definindo a estrutura de páginas e seções...'); }, 800);
      setTimeout(() => { setProgressPercent(45); setGenerationStepMsg('Criando identidade visual e sintonia de cores...'); }, 1800);
      setTimeout(() => { setProgressPercent(70); setGenerationStepMsg('Personalizando copywriting e textos comerciais...'); }, 3000);
      setTimeout(() => { setProgressPercent(85); setGenerationStepMsg('Montando os componentes interativos do site...'); }, 4200);

      let payload: any = {};

      if (creationMode === 'reference') {
        const response = await fetch('/api/gemini/analyze-reference', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ referenceUrl, referenceDescription, customKey: userCustomKey })
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.error || 'Falha ao analisar referência.');
        payload = data.siteData;
      } else {
        const response = await fetch('/api/gemini/generate-site', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            businessName: businessName || 'Minha Empresa',
            niche,
            description,
            services,
            differentials,
            targetAudience,
            phone,
            whatsapp,
            email,
            address,
            cityState,
            projectType,
            style,
            customKey: userCustomKey
          })
        });
        const data = await response.json();

        if (data.success && data.siteData) {
          payload = data.siteData;
        } else {
          // If API key issue or offline fallback, build robust structured site from template
          const baseTemplate = ALL_TEMPLATES.find(t => t.id === selectedTemplateId) || ALL_TEMPLATES[0];
          payload = JSON.parse(JSON.stringify(baseTemplate.siteData));
          payload.businessName = businessName || 'Minha Empresa';
          payload.title = `${payload.businessName} — Site Oficial`;
          payload.contactInfo = { phone, whatsapp, email, address, cityState };
        }
      }

      setProgressPercent(100);
      setGenerationStepMsg('Preparando a visualização no editor...');

      setTimeout(() => {
        const finalSiteData: SiteData = {
          id: 'proj-' + Date.now(),
          title: payload.title || `${businessName || 'Minha Empresa'} — Site Profissional`,
          businessName: payload.businessName || businessName || 'Minha Empresa',
          niche: payload.niche || niche,
          projectType: payload.projectType || projectType,
          style: payload.style || style,
          theme: payload.theme || theme,
          colors: payload.colors || {
            primary: primaryColor,
            secondary: '#071A35',
            accent: '#3689E6',
            background: theme === 'dark' ? '#0B1220' : '#FFFFFF',
            text: theme === 'dark' ? '#F4F6FA' : '#1E293B',
            cardBg: theme === 'dark' ? '#131F37' : '#F8FAFC'
          },
          fontFamily: payload.fontFamily || 'Inter',
          contactInfo: payload.contactInfo || { phone, whatsapp, email, address, cityState, instagram },
          seo: payload.seo || {
            metaTitle: `${businessName} — Soluções em ${niche}`,
            metaDescription: description || `Conheça os serviços profissionais oferecidos por ${businessName}.`,
            keywords: [niche, businessName, 'serviços', cityState]
          },
          header: payload.header || {
            logoText: (businessName || 'SITE').toUpperCase(),
            ctaText: 'Contato',
            ctaLink: '#contact',
            navLinks: [
              { id: 'n1', label: 'Início', href: '#sec-hero' },
              { id: 'n2', label: 'Serviços', href: '#services' },
              { id: 'n3', label: 'Sobre', href: '#about' },
              { id: 'n4', label: 'Contato', href: '#contact' }
            ]
          },
          sections: payload.sections || [],
          footer: payload.footer || {
            copyright: `© ${new Date().getFullYear()} ${businessName || 'Empresa'}. Todos os direitos reservados.`,
            description: description || 'Serviços de excelência.',
            quickLinks: [
              { id: 'fl1', label: 'Serviços', href: '#services' },
              { id: 'fl2', label: 'Contato', href: '#contact' }
            ],
            socialLinks: { whatsapp }
          },
          floatingWhatsapp: true,
          whatsappMessage: `Olá! Gostaria de falar sobre os serviços da ${businessName}.`,
          published: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        setIsGenerating(false);
        onComplete(finalSiteData);
      }, 1000);

    } catch (err: any) {
      console.error(err);
      setIsGenerating(false);
      setGenerationError(err.message || 'Ocorreu um erro ao gerar o site. Tente novamente.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
      {/* Wizard Header Stepper */}
      <div className="bg-[#071A35] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#3689E6]" />
              <h2 className="text-2xl font-extrabold text-white tracking-tight font-['Manrope']">
                Criador Inteligente de Sites
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Etapa {step} de 4 — {
                step === 1 ? 'Informações da Empresa' :
                step === 2 ? 'Tipo de Projeto' :
                step === 3 ? 'Identidade Visual' : 'Escolha do Template & IA'
              }
            </p>
          </div>

          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold transition"
          >
            Cancelar
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div 
              key={s} 
              className={`h-2 rounded-full transition-all duration-300 ${
                s <= step ? 'bg-gradient-to-r from-[#1769AA] to-[#3689E6]' : 'bg-slate-800'
              }`} 
            />
          ))}
        </div>
      </div>

      {/* STEP 1: BUSINESS INFO */}
      {step === 1 && (
        <div className="bg-[#071A35] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="border-b border-slate-800/80 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#3689E6]" />
              <span>ETAPA 1 — Informações da Empresa</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Insira os dados do negócio para que a IA gere conteúdos personalizados.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Nome da Empresa *
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Ex: Habitat Prime Imóveis"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#3689E6] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Nicho de Atuação *
              </label>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#3689E6] transition"
              >
                {TEMPLATE_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Descrição do Negócio / História
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Ex: Somos uma empresa especializada em atendimento de alto padrão com mais de 10 anos no mercado..."
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#3689E6] transition"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Serviços Oferecidos
              </label>
              <input
                type="text"
                value={services}
                onChange={(e) => setServices(e.target.value)}
                placeholder="Ex: Venda, locação, avaliação imobiliária"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#3689E6] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Diferenciais do Negócio
              </label>
              <input
                type="text"
                value={differentials}
                onChange={(e) => setDifferentials(e.target.value)}
                placeholder="Ex: Atendimento 24h, garantia jurídica, fotos 3D"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#3689E6] transition"
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="pt-4 border-t border-slate-800/80">
            <h4 className="text-xs font-bold text-[#3689E6] uppercase tracking-wider mb-4">
              Informações de Contato & Localização
            </h4>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Telefone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">WhatsApp</label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Cidade e UF</label>
                <input
                  type="text"
                  value={cityState}
                  onChange={(e) => setCityState(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => {
                if (!businessName) {
                  alert('Por favor, informe o nome da empresa.');
                  return;
                }
                setStep(2);
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#1769AA] to-[#3689E6] text-white font-bold text-sm shadow-lg hover:brightness-110 transition"
            >
              <span>Avançar para Tipo de Projeto</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: PROJECT TYPE */}
      {step === 2 && (
        <div className="bg-[#071A35] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="border-b border-slate-800/80 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#3689E6]" />
              <span>ETAPA 2 — Tipo de Projeto</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Escolha o formato de site ideal para o objetivo da sua empresa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {projectTypesList.map((pt) => {
              const isSelected = projectType === pt.id;
              return (
                <button
                  key={pt.id}
                  onClick={() => setProjectType(pt.id)}
                  className={`p-5 rounded-2xl text-left border transition flex items-start gap-4 ${
                    isSelected 
                      ? 'bg-[#1769AA]/20 border-[#3689E6] ring-2 ring-[#3689E6]/40' 
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-2xl p-2 rounded-xl bg-slate-800 shrink-0">{pt.icon}</span>
                  <div>
                    <h4 className="font-bold text-white text-sm">{pt.label}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">{pt.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-800 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>

            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#1769AA] to-[#3689E6] text-white font-bold text-sm shadow-lg hover:brightness-110 transition"
            >
              <span>Avançar para Identidade Visual</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: VISUAL IDENTITY */}
      {step === 3 && (
        <div className="bg-[#071A35] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="border-b border-slate-800/80 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Palette className="w-5 h-5 text-[#3689E6]" />
              <span>ETAPA 3 — Identidade Visual & Tema</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Personalize o estilo estético e as cores principais da sua marca.
            </p>
          </div>

          {/* Visual Styles */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Estilo Visual Predominante
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {stylesList.map((st) => (
                <button
                  key={st.id}
                  onClick={() => setStyle(st.id)}
                  className={`p-3.5 rounded-xl border text-left text-xs font-bold transition flex items-center justify-between ${
                    style === st.id
                      ? 'bg-[#1769AA]/30 border-[#3689E6] text-white ring-1 ring-[#3689E6]'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span>{st.label}</span>
                  {style === st.id && <Check className="w-4 h-4 text-[#3689E6]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Selector */}
          <div className="grid md:grid-cols-2 gap-6 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Modo de Fundo
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex-1 p-3.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 ${
                    theme === 'dark'
                      ? 'bg-slate-950 border-[#3689E6] text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <span>🌙 Fundo Escuro (Dark)</span>
                </button>
                <button
                  onClick={() => setTheme('light')}
                  className={`flex-1 p-3.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 ${
                    theme === 'light'
                      ? 'bg-slate-100 border-[#3689E6] text-slate-900'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <span>☀️ Fundo Claro (Light)</span>
                </button>
              </div>
            </div>

            {/* Primary Accent Color */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Cor Principal da Marca
              </label>
              <div className="flex items-center gap-3">
                {['#1769AA', '#0D9488', '#C2410C', '#7C3AED', '#DC2626', '#059669', '#D97706'].map(color => (
                  <button
                    key={color}
                    onClick={() => setPrimaryColor(color)}
                    style={{ backgroundColor: color }}
                    className={`w-9 h-9 rounded-full border-2 transition ${
                      primaryColor === color ? 'border-white scale-110 shadow-lg' : 'border-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-800 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>

            <button
              onClick={() => setStep(4)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#1769AA] to-[#3689E6] text-white font-bold text-sm shadow-lg hover:brightness-110 transition"
            >
              <span>Avançar para Seleção de Template / IA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: TEMPLATE / REFERENCE / IA SELECTION */}
      {step === 4 && !isGenerating && (
        <div className="bg-[#071A35] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="border-b border-slate-800/80 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <LayoutTemplate className="w-5 h-5 text-[#3689E6]" />
                <span>ETAPA 4 — Escolha a Estrutura de Geração</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Escolha se prefere um template pré-formatado do seu nicho ou criação a partir de referência.
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
              <button
                onClick={() => setCreationMode('wizard')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  creationMode === 'wizard' ? 'bg-[#1769AA] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Templates Recomendados
              </button>
              <button
                onClick={() => setCreationMode('reference')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  creationMode === 'reference' ? 'bg-[#1769AA] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Inspirado em Referência
              </button>
            </div>
          </div>

          {creationMode === 'wizard' ? (
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                {/* 100% Custom AI option card */}
                <div 
                  onClick={() => setSelectedTemplateId(null)}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                    selectedTemplateId === null 
                      ? 'bg-gradient-to-b from-[#1769AA]/30 to-slate-900 border-[#3689E6] ring-2 ring-[#3689E6]' 
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1769AA] to-[#3689E6] text-white flex items-center justify-center font-bold">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-white text-sm">Geração 100% IA Livre</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      A IA cria uma estrutura totalmente inédita baseada nos dados fornecidos na Etapa 1.
                    </p>
                  </div>
                  <span className="mt-4 text-[11px] font-bold text-[#3689E6] uppercase tracking-wider">
                    {selectedTemplateId === null ? '✓ Selecionado' : 'Selecionar'}
                  </span>
                </div>

                {/* Templates list */}
                {displayedTemplates.map((tpl) => {
                  const isSel = selectedTemplateId === tpl.id;
                  return (
                    <div
                      key={tpl.id}
                      onClick={() => setSelectedTemplateId(tpl.id)}
                      className={`rounded-2xl border overflow-hidden cursor-pointer transition flex flex-col justify-between ${
                        isSel 
                          ? 'bg-[#1769AA]/20 border-[#3689E6] ring-2 ring-[#3689E6]' 
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="h-28 overflow-hidden relative">
                        <img src={tpl.previewImage} alt={tpl.name} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-slate-950/80 text-white text-[10px] font-bold">
                          {tpl.category}
                        </div>
                      </div>
                      <div className="p-3.5 space-y-1">
                        <h4 className="font-bold text-white text-xs truncate">{tpl.name}</h4>
                        <p className="text-[11px] text-slate-400 line-clamp-2">{tpl.description}</p>
                      </div>
                      <div className="px-3.5 pb-3 text-[11px] font-bold text-[#3689E6]">
                        {isSel ? '✓ Template Selecionado' : 'Selecionar Template'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-4 bg-slate-900/90 p-6 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <LinkIcon className="w-4 h-4 text-[#3689E6]" />
                <span>Informar URL de Referência</span>
              </div>
              <p className="text-xs text-slate-400">
                O SITEIA analisará o padrão visual, estrutura de seções e estilo comercial para criar um site original inspirado.
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  URL do Site de Referência
                </label>
                <input
                  type="url"
                  value={referenceUrl}
                  onChange={(e) => setReferenceUrl(e.target.value)}
                  placeholder="https://exemplo.com.br"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#3689E6]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Observações / Seções que Gostou no Site
                </label>
                <textarea
                  value={referenceDescription}
                  onChange={(e) => setReferenceDescription(e.target.value)}
                  rows={3}
                  placeholder="Ex: Gostei da hero com busca rápida e do layout escuro de serviços..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#3689E6]"
                />
              </div>
            </div>
          )}

          {/* Error Message */}
          {generationError && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-3">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{generationError}</span>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex justify-between pt-4 border-t border-slate-800/80">
            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-800 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>

            <button
              onClick={handleStartGeneration}
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#1769AA] to-[#3689E6] text-white font-extrabold text-sm shadow-xl shadow-[#1769AA]/40 hover:brightness-110 active:scale-95 transition"
            >
              <Wand2 className="w-5 h-5 animate-pulse" />
              <span>GERAR MEU SITE COM IA</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: AI GENERATION IN PROGRESS MODAL */}
      {isGenerating && (
        <div className="bg-[#071A35] border border-slate-800 rounded-3xl p-10 text-center space-y-8 shadow-2xl">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#1769AA] to-[#3689E6] mx-auto p-1 shadow-2xl shadow-[#1769AA]/50 flex items-center justify-center animate-bounce">
            <div className="w-full h-full bg-[#071A35] rounded-[22px] flex items-center justify-center">
              <Bot className="w-10 h-10 text-[#3689E6]" />
            </div>
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              Construindo seu Site Profissional...
            </h3>
            <p className="text-slate-300 text-sm animate-pulse font-medium">
              {generationStepMsg}
            </p>
          </div>

          {/* Progress Bar Container */}
          <div className="max-w-md mx-auto space-y-2">
            <div className="h-3 rounded-full bg-slate-900 overflow-hidden border border-slate-800 p-0.5">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-[#1769AA] via-[#3689E6] to-cyan-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-xs font-bold text-slate-400 text-right">
              {progressPercent}% Concluído
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 max-w-md mx-auto text-xs text-slate-400 space-y-1">
            <p>✦ Gemini AI criando copy comercial personalizada</p>
            <p>✦ Layout 100% responsivo para mobile e desktop</p>
            <p>✦ Otimizado com metadados de SEO</p>
          </div>
        </div>
      )}
    </div>
  );
};
