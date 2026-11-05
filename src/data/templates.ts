import { Template, TemplateCategory } from '../types/site';

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  { id: 'correspondente', name: 'Correspondente Bancário', description: 'Crédito consignado, antecipação FGTS, financiamento e empréstimos', icon: 'Landmark' },
  { id: 'imobiliaria', name: 'Imobiliárias', description: 'Casas, apartamentos e lançamentos de alto padrão', icon: 'Building' },
  { id: 'clinicas', name: 'Clínicas e Saúde', description: 'Médicos, dentistas, estética e terapias', icon: 'Activity' },
  { id: 'restaurantes', name: 'Restaurantes', description: 'Gastronomia, bares, delivery e bistrôs', icon: 'Utensils' },
  { id: 'advocacia', name: 'Advocacia', description: 'Escritórios jurídicos e consultorias de direito', icon: 'Scale' },
  { id: 'contabilidade', name: 'Contabilidade', description: 'BPO financeiro, impostos e gestão contábil', icon: 'Calculator' },
  { id: 'financeiras', name: 'Financeiras', description: 'Crédito, investimentos e seguros', icon: 'TrendingUp' },
  { id: 'construcao', name: 'Construção e Reformas', description: 'Engenharia, empreiteiras e pintura', icon: 'Hammer' },
  { id: 'arquitetura', name: 'Arquitetura', description: 'Design de interiores e projetos 3D', icon: 'Compass' },
  { id: 'barbearias', name: 'Barbearias', description: 'Cortes masculinos, barba e estilo vintage/moderno', icon: 'Scissors' },
  { id: 'beleza', name: 'Salões de Beleza', description: 'Estética, cabelo, maquiagem e spa', icon: 'Sparkles' },
  { id: 'academias', name: 'Academias & Fitness', description: 'Musculação, crossfit e personal trainers', icon: 'Dumbbell' },
  { id: 'marketing', name: 'Marketing Digital', description: 'Agências de tráfego, SEO e social media', icon: 'Target' },
  { id: 'tecnologia', name: 'Tecnologia & Software', description: 'SaaS, apps, startups e TI', icon: 'Cpu' },
  { id: 'educacao', name: 'Educação & Cursos', description: 'Escolas, idiomas e cursos profissionalizantes', icon: 'GraduationCap' },
  { id: 'igrejas', name: 'Igrejas & Comunidades', description: 'Templos, eventos e ministérios', icon: 'Heart' },
  { id: 'consultoria', name: 'Consultoria', description: 'Gestão de negócios e mentoria corporativa', icon: 'Briefcase' },
  { id: 'fotografia', name: 'Fotografia & Filmes', description: 'Ensaios, casamentos e vídeos publicitários', icon: 'Camera' },
  { id: 'servicos', name: 'Prestadores de Serviços', description: 'Manutenção, eletricistas, encanamento e limpeza', icon: 'Wrench' },
  { id: 'ecommerce', name: 'E-Commerce & Loja', description: 'Vitrine de produtos e conceito de loja', icon: 'ShoppingBag' },
  { id: 'autonomos', name: 'Profissionais Autônomos', description: 'Freelancers, consultores e especialistas', icon: 'UserCheck' },
];

export const ALL_TEMPLATES: Template[] = [
  // 0. Correspondente Bancário (Layout Premium Especial)
  {
    id: 'tpl-correspondente-bancario',
    name: 'CredPrime — Correspondente Bancário Autorizado',
    category: 'Correspondente Bancário',
    categoryId: 'correspondente',
    description: 'Layout Premium completo para correspondentes bancários, promotores de crédito, empréstimo consignado, FGTS e financiamentos.',
    previewImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop',
    badge: 'Destaque Premium',
    features: ['Seção de Nossos Serviços de Crédito', 'Simulador de Crédito Consignado', 'Seção de Mapa & Atendimento', 'Depoimentos de Aprovados'],
    siteData: {
      title: 'CredPrime — Correspondente Bancário Autorizado',
      businessName: 'CredPrime Promotora de Crédito',
      niche: 'Correspondente Bancário',
      projectType: 'vendas',
      style: 'premium',
      theme: 'dark',
      colors: {
        primary: '#1769AA',
        secondary: '#071A35',
        accent: '#D4AF37',
        background: '#0B1220',
        text: '#F4F6FA',
        cardBg: '#131F37'
      },
      fontFamily: 'Inter',
      contactInfo: {
        phone: '(11) 4003-8899',
        whatsapp: '5511988880000',
        email: 'credito@credprime.com.br',
        address: 'Av. Brigadeiro Faria Lima, 1800 - Conj. 121',
        cityState: 'São Paulo - SP',
        instagram: '@credprimeoficial'
      },
      seo: {
        metaTitle: 'CredPrime — Consignado & Antecipação FGTS no Pix em 10 Minutos',
        metaDescription: 'Correspondente bancário autorizado pelos principais bancos. Empréstimo consignado INSS, SIAPE e Saque FGTS sem burocracia.',
        keywords: ['correspondente bancario', 'emprestimo consignado', 'saque aniversario fgts', 'portabilidade de credito']
      },
      header: {
        logoText: 'CREDPRIME BANCÁRIO',
        ctaText: 'Simular no WhatsApp',
        ctaLink: '#contact',
        navLinks: [
          { id: 'n1', label: 'Nossos Serviços', href: '#services' },
          { id: 'n2', label: 'Vantagens', href: '#features' },
          { id: 'n3', label: 'Depoimentos', href: '#testimonials' },
          { id: 'n4', label: 'Nossa Localização', href: '#map' },
          { id: 'n5', label: 'Simular Crédito', href: '#contact' },
        ]
      },
      sections: [
        {
          id: 'sec-hero-cred',
          type: 'hero',
          title: 'Crédito Rápido e Sem Burocracia Liberado no Seu Pix',
          subtitle: 'Correspondente bancário autorizado. As melhores taxas para aposentados, pensionistas, servidores e trabalhadores com saldo FGTS.',
          badge: 'BANCOS PARCEIROS CERTIFICADOS BACEN',
          ctaText: 'Simular Meu Crédito Agora',
          ctaLink: '#contact',
          secondaryCtaText: 'Conheça Nossos Serviços',
          secondaryCtaLink: '#services',
          image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop',
          visible: true
        },
        {
          id: 'sec-services-cred',
          type: 'services',
          title: 'Nossos Serviços de Crédito',
          subtitle: 'Soluções financeiras inteligentes com prazos flexíveis e dinheiro rápido na conta.',
          visible: true,
          items: [
            {
              id: 's1',
              title: 'Empréstimo Consignado INSS & SIAPE',
              subtitle: 'Para aposentados, pensionistas e servidores públicos.',
              description: 'As menores taxas do mercado com desconto direto em folha de pagamento e até 84 meses para pagar.',
              price: 'Taxas a partir de 1,66% a.m.',
              badge: 'Mais Solicitado',
              icon: 'TrendingUp'
            },
            {
              id: 's2',
              title: 'Antecipação do Saque-Aniversário FGTS',
              subtitle: 'Antecipe até 10 parcelas do seu saldo de forma 100% digital.',
              description: 'Sem mensalidades no seu orçamento e sem consulta ao SPC/Serasa. Dinheiro via Pix em até 10 minutos.',
              price: 'Receba hoje no Pix',
              badge: 'Aprovação Imediata',
              icon: 'Sparkles'
            },
            {
              id: 's3',
              title: 'Empréstimo com Garantia de Imóvel ou Veículo',
              subtitle: 'Use seu bem para obter valores elevados com juros baixos.',
              description: 'Linhas de crédito de R$ 30.000 a R$ 2.000.000 mantendo o bem em seu uso para prazos de até 240 meses.',
              price: 'Até 240 meses para pagar',
              badge: 'Grandes Valores',
              icon: 'Building'
            },
            {
              id: 's4',
              title: 'Portabilidade & Refinanciamento de Crédito',
              subtitle: 'Reduza a taxa de juros do seu contrato atual.',
              description: 'Trazemos sua dívida de outro banco para uma taxa menor e liberamos um troco extra na sua conta corrente.',
              price: 'Troco em conta liberado',
              badge: 'Economia Garantida',
              icon: 'RefreshCw'
            }
          ]
        },
        {
          id: 'sec-features-cred',
          type: 'features',
          title: 'Por Que Escolher a CredPrime?',
          subtitle: 'Segurança total, atendimento humanizado e transparência em cada simulação.',
          visible: true,
          items: [
            { id: 'f1', title: 'Atendimento 100% Digital', description: 'Assinatura eletrônica pelo celular sem precisar sair de casa.', icon: 'Check' },
            { id: 'f2', title: 'Correspondente Autorizado', description: 'Atuamos em conformidade com as diretrizes do Banco Central do Brasil.', icon: 'Shield' },
            { id: 'f3', title: 'Pagamento via Pix em Minutos', description: 'Após a formalização, o dinheiro é depositado direto na sua conta bancária.', icon: 'Zap' }
          ]
        },
        {
          id: 'sec-map-cred',
          type: 'map',
          title: 'Venha nos Visitar / Nossa Localização',
          subtitle: 'Atendimento presencial e consultores especializados para lhe orientar.',
          address: 'Av. Brigadeiro Faria Lima, 1800 - Conjunto 121, São Paulo - SP',
          cityState: 'São Paulo - SP',
          businessHours: 'Segunda a Sexta: 08h30 às 18h00 | Sábado: 09h00 às 13h00',
          googleMapsLink: 'https://maps.google.com/?q=Av.+Brigadeiro+Faria+Lima,+1800+Sao+Paulo',
          mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.789123456!2d-46.689000!3d-23.578000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce570000000000%3A0x0!2zQXYuIEJyaWdhZGVpcm8gRmFyaWEgTGltYSwgMTgwMA!5e0!3m2!1spt-BR!2sbr!4v1600000000000',
          visible: true
        },
        {
          id: 'sec-leadform-cred',
          type: 'lead_form',
          title: 'Faça uma Simulação de Crédito Gratuita',
          subtitle: 'Preencha os dados e receba o cálculo das suas parcelas e troco disponível diretamente no seu WhatsApp.',
          visible: true
        }
      ],
      footer: {
        copyright: '© 2026 CredPrime Promotora de Crédito. Correspondente Bancário Autorizado nos termos da Resolução CMN nº 3.954/2011.',
        description: 'Transparência, rapidez e ética em crédito consciente.',
        quickLinks: [
          { id: 'fl1', label: 'Nossos Serviços', href: '#services' },
          { id: 'fl2', label: 'Localização', href: '#map' },
          { id: 'fl3', label: 'Simular Crédito', href: '#contact' }
        ],
        socialLinks: { instagram: '@credprimeoficial', whatsapp: '5511988880000' }
      },
      floatingWhatsapp: true,
      whatsappMessage: 'Olá! Gostaria de fazer uma simulação de crédito consignado/FGTS.'
    }
  },

  // 1. Imobiliária
  {
    id: 'tpl-imobiliaria-lux',
    name: 'Habitat Prime Imóveis',
    category: 'Imobiliárias',
    categoryId: 'imobiliaria',
    description: 'Design sofisticado para imobiliárias e corretores de luxo com filtro de buscas e imóveis em destaque.',
    previewImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    badge: 'Mais Popular',
    features: ['Hero com busca de imóveis', 'Grid de destaques', 'Depoimentos de compradores', 'Calculadora de simulado'],
    siteData: {
      title: 'Habitat Prime — Imóveis Exclusivos',
      businessName: 'Habitat Prime Imóveis',
      niche: 'Imobiliária de Alto Padrão',
      projectType: 'institucional',
      style: 'premium',
      theme: 'dark',
      colors: {
        primary: '#1769AA',
        secondary: '#071A35',
        accent: '#D4AF37',
        background: '#0B1220',
        text: '#F4F6FA',
        cardBg: '#131F37'
      },
      fontFamily: 'Inter',
      contactInfo: {
        phone: '(11) 3456-7890',
        whatsapp: '5511999990001',
        email: 'contato@habitatprime.com.br',
        address: 'Av. Brigadeiro Faria Lima, 2000 - Itaim Bibi',
        cityState: 'São Paulo - SP',
        instagram: '@habitatprimeimoveis'
      },
      seo: {
        metaTitle: 'Habitat Prime — Imóveis de Luxo em SP',
        metaDescription: 'Apartamentos e casas de alto padrão nos melhores bairros de São Paulo.',
        keywords: ['imobiliaria', 'imoveis de luxo', 'apartamento faria lima', 'corretor']
      },
      header: {
        logoText: 'HABITAT PRIME',
        ctaText: 'Falar com Corretor',
        ctaLink: '#contact',
        navLinks: [
          { id: 'n1', label: 'Imóveis', href: '#properties' },
          { id: 'n2', label: 'Sobre Nós', href: '#about' },
          { id: 'n3', label: 'Diferenciais', href: '#features' },
          { id: 'n4', label: 'Contato', href: '#contact' },
        ]
      },
      sections: [
        {
          id: 'sec-hero',
          type: 'hero',
          title: 'Encontre a Residência dos Seus Sonhos',
          subtitle: 'Os empreendimentos mais exclusivos de São Paulo selecionados por especialistas em alto padrão.',
          badge: 'PORTFÓLIO 2026 EXCLUSIVO',
          ctaText: 'Ver Imóveis Disponíveis',
          ctaLink: '#properties',
          secondaryCtaText: 'Simular Financiamento',
          secondaryCtaLink: '#contact',
          image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
          visible: true
        },
        {
          id: 'sec-properties',
          type: 'properties',
          title: 'Imóveis em Destaque',
          subtitle: 'Residências prontas para morar e lançamentos em regiões valorizadas.',
          visible: true,
          items: [
            {
              id: 'p1',
              title: 'Penthouse Faria Lima Design',
              subtitle: '4 suítes | 340m² | 4 vagas',
              price: 'R$ 6.800.000',
              image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
              badge: 'Lançamento',
              linkText: 'Solicitar Apresentação'
            },
            {
              id: 'p2',
              title: 'Villa Jardins Contemporânea',
              subtitle: '5 suítes | 520m² | Piscina aquecida',
              price: 'R$ 12.500.000',
              image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
              badge: 'Exclusividade',
              linkText: 'Solicitar Apresentação'
            }
          ]
        },
        {
          id: 'sec-map-hab',
          type: 'map',
          title: 'Nossa Sede em São Paulo',
          subtitle: 'Atendimento privativo com hora marcada.',
          address: 'Av. Brigadeiro Faria Lima, 2000 - Itaim Bibi, São Paulo - SP',
          cityState: 'São Paulo - SP',
          businessHours: 'Segunda a Sexta: 09h00 às 19h00',
          visible: true
        },
        {
          id: 'sec-leadform',
          type: 'lead_form',
          title: 'Agende uma Visita Privativa',
          subtitle: 'Preencha os dados e um dos nossos diretores imobiliários retornará em até 15 minutos.',
          visible: true
        }
      ],
      footer: {
        copyright: '© 2026 Habitat Prime Imóveis. Todos os direitos reservados.',
        description: 'Corretagem consultiva de altíssimo padrão.',
        quickLinks: [
          { id: 'fl1', label: 'Lançamentos', href: '#properties' },
          { id: 'fl2', label: 'Contato', href: '#contact' }
        ],
        socialLinks: { instagram: '@habitatprimeimoveis', whatsapp: '5511999990001' }
      },
      floatingWhatsapp: true,
      whatsappMessage: 'Olá! Gostaria de informações sobre imóveis de alto padrão.'
    }
  },

  // 2. Clínicas e Saúde
  {
    id: 'tpl-clinica-saude',
    name: 'Clínica Vitae & Medicina Integrativa',
    category: 'Clínicas e Saúde',
    categoryId: 'clinicas',
    description: 'Template limpo, transmite confiança e higiene, ideal para médicos, dentistas e clínicas.',
    previewImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop',
    badge: 'Saúde & Bem-Estar',
    features: ['Grade de especialidades', 'Corpo clínico', 'Agendamento por WhatsApp', 'Convenios aceitos'],
    siteData: {
      title: 'Clínica Vitae — Excelência Médica',
      businessName: 'Clínica Vitae Integrativa',
      niche: 'Clínica Médica e Estética',
      projectType: 'institucional',
      style: 'moderno',
      theme: 'light',
      colors: {
        primary: '#0D9488',
        secondary: '#0F172A',
        accent: '#14B8A6',
        background: '#FFFFFF',
        text: '#1E293B',
        cardBg: '#F8FAFC'
      },
      fontFamily: 'Inter',
      contactInfo: {
        phone: '(11) 4004-9876',
        whatsapp: '5511988887777',
        email: 'agendamento@clinicavitae.com.br',
        address: 'Rua Oscar Freire, 1200 - Cj. 81',
        cityState: 'São Paulo - SP'
      },
      seo: {
        metaTitle: 'Clínica Vitae — Agendamento de Consultas Médicas',
        metaDescription: 'Especialistas qualificados em dermatologia, endocrinologia e medicina preventiva.',
        keywords: ['clinica medica', 'dermatologista sp', 'checkup', 'agendar consulta']
      },
      header: {
        logoText: 'VITAE MEDICINA',
        ctaText: 'Agendar Consulta',
        ctaLink: '#lead-form',
        navLinks: [
          { id: 'n1', label: 'Especialidades', href: '#services' },
          { id: 'n2', label: 'Localização', href: '#map' },
          { id: 'n3', label: 'Contato', href: '#contact' },
        ]
      },
      sections: [
        {
          id: 'sec-hero-saude',
          type: 'hero',
          title: 'Cuidado Médico Humanizado e Tecnologia de Ponta',
          subtitle: 'Acolhimento preventivo e tratamentos personalizados para a sua saúde integral.',
          badge: 'MEDICINA INTEGRATIVA 2026',
          ctaText: 'Marcar Horário',
          ctaLink: '#lead-form',
          secondaryCtaText: 'Conheça os Médicos',
          secondaryCtaLink: '#services',
          image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
          visible: true
        },
        {
          id: 'sec-services-saude',
          type: 'services',
          title: 'Nossas Especialidades Médicas',
          subtitle: 'Equipe multidisciplinar em constante atualização científica.',
          visible: true,
          items: [
            { id: 's1', title: 'Dermatologia Avançada', description: 'Tratamentos a laser, rejuvenescimento facial e cuidados com a pele.', icon: 'Sparkles' },
            { id: 's2', title: 'Endocrinologia & Metabologia', description: 'Equilíbrio hormonal, emagrecimento saudável e prevenção metabólica.', icon: 'Activity' },
            { id: 's3', title: 'Cardiologia & Preventiva', description: 'Check-up completo de saúde cardiovascular e exames integrados.', icon: 'Heart' },
          ]
        },
        {
          id: 'sec-map-saude',
          type: 'map',
          title: 'Onde Estamos',
          subtitle: 'Fácil acesso nos Jardins com estacionamento privativo.',
          address: 'Rua Oscar Freire, 1200 - Cj. 81, São Paulo - SP',
          cityState: 'São Paulo - SP',
          businessHours: 'Segunda a Sexta: 08h00 às 20h00 | Sábado: 08h00 às 14h00',
          visible: true
        },
        {
          id: 'sec-lead-saude',
          type: 'lead_form',
          title: 'Solicite seu Atendimento',
          subtitle: 'Nossa equipe de recepção entrará em contato para confirmar a disponibilidade da agenda.',
          visible: true
        }
      ],
      footer: {
        copyright: '© 2026 Clínica Vitae Medicina. CRM/SP 99887.',
        description: 'Saúde preventiva com responsabilidade técnica.',
        quickLinks: [
          { id: 'fl1', label: 'Especialidades', href: '#services' },
          { id: 'fl2', label: 'Médicos', href: '#team' }
        ],
        socialLinks: { whatsapp: '5511988887777' }
      },
      floatingWhatsapp: true,
      whatsappMessage: 'Olá! Desejo marcar uma consulta na Clínica Vitae.'
    }
  }
];
