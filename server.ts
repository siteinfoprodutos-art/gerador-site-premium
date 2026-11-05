import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI SDK safely
const getAiClient = (userCustomApiKey?: string) => {
  const key = userCustomApiKey || process.env.GEMINI_API_KEY;
  if (!key) return null;
  return new GoogleGenAI({
    apiKey: key,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// 1. Generate Site via AI
app.post('/api/gemini/generate-site', async (req, res) => {
  try {
    const { businessName, niche, description, services, differentials, targetAudience, phone, whatsapp, email, address, cityState, projectType, style, customKey } = req.body;

    const ai = getAiClient(customKey);
    if (!ai) {
      return res.status(400).json({ error: 'API Key do Gemini não encontrada. Configure a chave em Configurações.' });
    }

    const prompt = `Você é o motor de Inteligência Artificial do SITEIA, uma plataforma SaaS de criação profissional de sites.
Crie a estrutura COMPLETA de um site profissional para o seguinte negócio:

- Nome da Empresa: ${businessName || 'Minha Empresa'}
- Nicho de Atuação: ${niche || 'Serviços Profissionais'}
- Descrição da Empresa: ${description || 'Empresa especializada em entregar soluções de alta qualidade para clientes exigentes.'}
- Serviços Oferecidos: ${services || 'Consultoria, Atendimento Personalizado, Soluções sob medida'}
- Diferenciais do Negócio: ${differentials || 'Atendimento humanizado, rapidez e garantia de satisfação'}
- Público-Alvo: ${targetAudience || 'Clientes locais e empresariais'}
- Telefone: ${phone || '(11) 99999-9999'}
- WhatsApp: ${whatsapp || '5511999999999'}
- E-mail: ${email || 'contato@empresa.com.br'}
- Endereço / Cidade: ${address || 'São Paulo'} - ${cityState || 'SP'}
- Tipo de Projeto: ${projectType || 'institucional'}
- Estilo Visual Desejado: ${style || 'premium'}

REGRAS CRÍTICAS:
- NUNCA invente telefones, e-mails ou endereços fictícios discrepantes das informações fornecidas acima.
- Crie títulos comerciais altamente persuasivos, textos bem estruturados e descrições detalhadas dos serviços.
- Gere entre 4 e 6 seções bem organizadas (Ex: hero, services, about, portfolio/properties/menu/pricing dependendo do nicho, testimonials, lead_form).
- Defina uma paleta de cores moderna adequada ao nicho (primary, secondary, accent, background, text, cardBg).
- Escreva metadados de SEO completos (metaTitle, metaDescription, keywords).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Você é um arquiteto sênior de UX/UI e especialista em copywriting comercial. Responda ESTRITAMENTE em formato JSON com o schema de site do SITEIA.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            businessName: { type: Type.STRING },
            niche: { type: Type.STRING },
            projectType: { type: Type.STRING },
            style: { type: Type.STRING },
            theme: { type: Type.STRING },
            colors: {
              type: Type.OBJECT,
              properties: {
                primary: { type: Type.STRING },
                secondary: { type: Type.STRING },
                accent: { type: Type.STRING },
                background: { type: Type.STRING },
                text: { type: Type.STRING },
                cardBg: { type: Type.STRING }
              },
              required: ['primary', 'secondary', 'accent', 'background', 'text', 'cardBg']
            },
            fontFamily: { type: Type.STRING },
            contactInfo: {
              type: Type.OBJECT,
              properties: {
                phone: { type: Type.STRING },
                whatsapp: { type: Type.STRING },
                email: { type: Type.STRING },
                address: { type: Type.STRING },
                cityState: { type: Type.STRING }
              },
              required: ['phone', 'whatsapp', 'email', 'address', 'cityState']
            },
            seo: {
              type: Type.OBJECT,
              properties: {
                metaTitle: { type: Type.STRING },
                metaDescription: { type: Type.STRING },
                keywords: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ['metaTitle', 'metaDescription', 'keywords']
            },
            header: {
              type: Type.OBJECT,
              properties: {
                logoText: { type: Type.STRING },
                ctaText: { type: Type.STRING },
                ctaLink: { type: Type.STRING },
                navLinks: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      label: { type: Type.STRING },
                      href: { type: Type.STRING }
                    },
                    required: ['id', 'label', 'href']
                  }
                }
              },
              required: ['logoText', 'ctaText', 'ctaLink', 'navLinks']
            },
            sections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  type: { type: Type.STRING },
                  title: { type: Type.STRING },
                  subtitle: { type: Type.STRING },
                  description: { type: Type.STRING },
                  badge: { type: Type.STRING },
                  ctaText: { type: Type.STRING },
                  ctaLink: { type: Type.STRING },
                  secondaryCtaText: { type: Type.STRING },
                  secondaryCtaLink: { type: Type.STRING },
                  image: { type: Type.STRING },
                  visible: { type: Type.BOOLEAN },
                  items: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        title: { type: Type.STRING },
                        subtitle: { type: Type.STRING },
                        description: { type: Type.STRING },
                        icon: { type: Type.STRING },
                        image: { type: Type.STRING },
                        price: { type: Type.STRING },
                        badge: { type: Type.STRING }
                      },
                      required: ['id', 'title']
                    }
                  }
                },
                required: ['id', 'type', 'title', 'visible']
              }
            },
            footer: {
              type: Type.OBJECT,
              properties: {
                copyright: { type: Type.STRING },
                description: { type: Type.STRING },
                quickLinks: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      label: { type: Type.STRING },
                      href: { type: Type.STRING }
                    },
                    required: ['id', 'label', 'href']
                  }
                }
              },
              required: ['copyright', 'description']
            },
            floatingWhatsapp: { type: Type.BOOLEAN },
            whatsappMessage: { type: Type.STRING }
          },
          required: ['title', 'businessName', 'colors', 'contactInfo', 'seo', 'header', 'sections', 'footer']
        }
      }
    });

    const resultJson = JSON.parse(response.text || '{}');

    // Attach default fallback stock images if AI didn't provide specific images
    if (!resultJson.sections?.find((s: any) => s.type === 'hero')?.image) {
      const heroSec = resultJson.sections?.find((s: any) => s.type === 'hero');
      if (heroSec) {
        heroSec.image = 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop';
      }
    }

    return res.json({ success: true, siteData: resultJson });

  } catch (error: any) {
    console.error('Erro na geração com Gemini:', error);
    return res.status(500).json({ error: error.message || 'Erro ao comunicar com a inteligência artificial.' });
  }
});

// 2. AI Visual Assistant Edit Endpoint
app.post('/api/gemini/edit-site', async (req, res) => {
  try {
    const { currentSite, instruction, customKey } = req.body;
    const ai = getAiClient(customKey);
    if (!ai) {
      return res.status(400).json({ error: 'API Key do Gemini não configurada.' });
    }

    const prompt = `Você é o assistente co-piloto do SITEIA. O usuário está editando visualmente seu site e solicitou a seguinte modificação:

INSTRUÇÃO DO USUÁRIO: "${instruction}"

DADOS ATUAIS DO SITE EM JSON:
${JSON.stringify(currentSite, null, 2)}

SUA TAREFA:
Altere APENAS os elementos solicitados na instrução (por exemplo: mudar cores, reescrever o título da hero, adicionar nova seção de depoimentos, alterar estilo do botão ou imagens), mantendo a integridade e consistência do restante da estrutura do site. Retorne o objeto JSON atualizado completo.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Retorne estritamente o JSON atualizado mantendo o formato exato da estrutura do SITEIA.',
        responseMimeType: 'application/json'
      }
    });

    const updatedSite = JSON.parse(response.text || '{}');
    return res.json({ success: true, siteData: updatedSite });
  } catch (error: any) {
    console.error('Erro na edição por IA:', error);
    return res.status(500).json({ error: error.message || 'Erro ao processar alteração do site.' });
  }
});

// 3. AI Reference Analyzer Endpoint
app.post('/api/gemini/analyze-reference', async (req, res) => {
  try {
    const { referenceUrl, referenceDescription, customKey } = req.body;
    const ai = getAiClient(customKey);
    if (!ai) {
      return res.status(400).json({ error: 'API Key do Gemini não configurada.' });
    }

    const prompt = `Você é o especialista em engenharia reversa de design e UX do SITEIA.
O usuário deseja criar um site ORIGINAL inspirado no seguinte site de referência:

URL / Referência: ${referenceUrl || 'N/A'}
Descrição do Estilo / Seções Desejadas: ${referenceDescription || 'N/A'}

REGRAS RÍGIDAS:
- Não copie logotipos, textos protegidos ou marcas registradas.
- Analise a arquitetura de informação (estrutura de seções, tom de voz comercial, hierarquia tipográfica e paleta de cores).
- Gere um novo projeto ORIGINAL no formato de schema JSON do SITEIA pronto para edição.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Retorne a estrutura JSON completa do site original inspirado.',
        responseMimeType: 'application/json'
      }
    });

    const resultSite = JSON.parse(response.text || '{}');
    return res.json({ success: true, siteData: resultSite });
  } catch (error: any) {
    console.error('Erro na análise de referência:', error);
    return res.status(500).json({ error: error.message || 'Erro ao analisar referência de site.' });
  }
});

// 4. Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'SITEIA SaaS Engine', timestamp: new Date().toISOString() });
});

// Mount Vite middleware in development mode
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`🚀 SITEIA Server running on http://localhost:${PORT}`);
  });
}

startServer();
