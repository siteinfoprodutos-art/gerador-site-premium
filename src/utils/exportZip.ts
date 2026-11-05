import JSZip from 'jszip';
import { SiteData } from '../types/site';

export async function generateSiteZip(site: SiteData): Promise<Blob> {
  const zip = new JSZip();

  const htmlContent = generateStandaloneHtml(site);
  const cssContent = generateStandaloneCss(site);
  const jsContent = generateStandaloneJs(site);
  const schemaContent = JSON.stringify(site, null, 2);
  const readmeContent = `=====================================================
SITEIA — SITE GERADO COM INTELIGÊNCIA ARTIFICIAL
=====================================================
Projeto: ${site.title}
Empresa: ${site.businessName}
Nicho: ${site.niche}
Data de Exportação: ${new Date().toLocaleDateString('pt-BR')}

COMO PUBLICAR ESTE SITE:

1. HOSPEDAGEM TRADICIONAL (Hostinger, cPanel, Locaweb, etc.):
   - Envie os arquivos 'index.html', 'styles.css' e 'script.js' para a pasta 'public_html' ou raiz do seu servidor de hospedagem.

2. HOSPEDAGEM GRATUITA E MODERNA (Vercel / Netlify / GitHub Pages):
   - Arraste esta pasta descompactada diretamente para o painel da Vercel ou Netlify (Netlify Drop / Vercel Import).
   - O site estará online com SSL gratuito em menos de 1 minuto!

3. IMPORTAR NOVAMENTE NO SITEIA:
   - Guarde o arquivo 'site-schema.json'. Você pode re-importá-lo no editor visual do SITEIA a qualquer momento para continuar editando.

Suporte SITEIA: contato@siteia.app
Transforme ideias em sites extraordinários.
`;

  zip.file('index.html', htmlContent);
  zip.file('styles.css', cssContent);
  zip.file('script.js', jsContent);
  zip.file('site-schema.json', schemaContent);
  zip.file('README.txt', readmeContent);

  return await zip.generateAsync({ type: 'blob' });
}

function generateStandaloneHtml(site: SiteData): string {
  const { title, businessName, colors, font = 'Inter', header, sections, footer, contactInfo, floatingWhatsapp, whatsappMessage, seo } = site as any;

  let sectionsHtml = '';
  sections.filter((s: any) => s.visible).forEach((sec: any) => {
    switch (sec.type) {
      case 'hero':
        sectionsHtml += `
    <section id="${sec.id}" class="py-20 md:py-28 relative overflow-hidden flex items-center min-h-[85vh]">
      <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          ${sec.badge ? `<span class="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-6 bg-primary/10 text-primary border border-primary/20">${sec.badge}</span>` : ''}
          <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">${sec.title}</h1>
          <p class="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">${sec.subtitle || ''}</p>
          <div class="flex flex-wrap gap-4">
            ${sec.ctaText ? `<a href="${sec.ctaLink || '#contact'}" class="px-8 py-4 rounded-xl font-bold bg-primary text-white shadow-lg hover:brightness-110 transition duration-200">${sec.ctaText}</a>` : ''}
            ${sec.secondaryCtaText ? `<a href="${sec.secondaryCtaLink || '#about'}" class="px-8 py-4 rounded-xl font-semibold bg-white/10 text-white hover:bg-white/20 transition duration-200">${sec.secondaryCtaText}</a>` : ''}
          </div>
        </div>
        ${sec.image ? `
        <div class="relative">
          <img src="${sec.image}" alt="${sec.title}" class="rounded-2xl shadow-2xl object-cover w-full h-[400px] md:h-[480px] border border-white/10">
        </div>` : ''}
      </div>
    </section>`;
        break;

      case 'features':
      case 'services':
        sectionsHtml += `
    <section id="${sec.id}" class="py-20 bg-slate-900/50 border-t border-white/5">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-5xl font-bold mb-4">${sec.title}</h2>
          ${sec.subtitle ? `<p class="text-slate-400 text-lg">${sec.subtitle}</p>` : ''}
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          ${(sec.items || []).map((item: any) => `
          <div class="bg-slate-800/80 p-8 rounded-2xl border border-white/10 hover:border-primary/50 transition">
            ${item.icon ? `<div class="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center font-bold mb-6 text-xl">✦</div>` : ''}
            <h3 class="text-xl font-bold mb-3">${item.title}</h3>
            <p class="text-slate-300 leading-relaxed text-sm">${item.description || ''}</p>
            ${item.price ? `<div class="mt-4 text-2xl font-extrabold text-primary">${item.price}</div>` : ''}
          </div>`).join('')}
        </div>
      </div>
    </section>`;
        break;

      case 'properties':
      case 'portfolio':
      case 'gallery':
      case 'menu':
        sectionsHtml += `
    <section id="${sec.id}" class="py-20">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-5xl font-bold mb-4">${sec.title}</h2>
          ${sec.subtitle ? `<p class="text-slate-400 text-lg">${sec.subtitle}</p>` : ''}
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          ${(sec.items || []).map((item: any) => `
          <div class="bg-slate-900 rounded-2xl overflow-hidden border border-white/10 shadow-xl group">
            ${item.image ? `<img src="${item.image}" alt="${item.title}" class="w-full h-52 object-cover group-hover:scale-105 transition duration-300">` : ''}
            <div class="p-6">
              ${item.badge ? `<span class="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-md mb-2">${item.badge}</span>` : ''}
              <h3 class="text-xl font-bold mb-2">${item.title}</h3>
              <p class="text-slate-400 text-sm mb-4">${item.subtitle || item.description || ''}</p>
              ${item.price ? `<div class="text-2xl font-bold text-emerald-400 mb-4">${item.price}</div>` : ''}
              <a href="#contact" class="inline-block w-full text-center py-2.5 rounded-lg bg-primary/20 text-primary font-semibold hover:bg-primary hover:text-white transition">Solicitar Informações</a>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </section>`;
        break;

      case 'about':
        sectionsHtml += `
    <section id="${sec.id}" class="py-20 bg-slate-900/30">
      <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        ${sec.image ? `<img src="${sec.image}" alt="${sec.title}" class="rounded-2xl shadow-xl w-full h-[400px] object-cover border border-white/10">` : ''}
        <div>
          <h2 class="text-3xl md:text-4xl font-bold mb-6">${sec.title}</h2>
          <p class="text-slate-300 text-lg leading-relaxed mb-6">${sec.subtitle || ''}</p>
          <p class="text-slate-400 leading-relaxed mb-8">${sec.description || ''}</p>
          <a href="#contact" class="px-8 py-3.5 rounded-xl bg-primary text-white font-bold hover:brightness-110 transition inline-block">Fale Conosco</a>
        </div>
      </div>
    </section>`;
        break;

      case 'pricing':
        sectionsHtml += `
    <section id="${sec.id}" class="py-20">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-5xl font-bold mb-4">${sec.title}</h2>
          ${sec.subtitle ? `<p class="text-slate-400 text-lg">${sec.subtitle}</p>` : ''}
        </div>
        <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          ${(sec.items || []).map((item: any) => `
          <div class="bg-slate-800/90 p-8 rounded-2xl border ${item.badge ? 'border-primary ring-2 ring-primary/50' : 'border-white/10'} relative">
            ${item.badge ? `<span class="absolute -top-3 right-6 bg-primary text-white text-xs px-3 py-1 rounded-full font-bold uppercase">${item.badge}</span>` : ''}
            <h3 class="text-2xl font-bold mb-2">${item.title}</h3>
            <p class="text-slate-400 text-sm mb-6">${item.description || ''}</p>
            <div class="mb-6">
              <span class="text-4xl font-black text-white">${item.price}</span>
              <span class="text-slate-400">${item.period || ''}</span>
            </div>
            <ul class="space-y-3 mb-8 text-sm text-slate-300">
              ${(item.features || []).map((f: string) => `<li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> ${f}</li>`).join('')}
            </ul>
            <a href="#contact" class="block text-center w-full py-3.5 rounded-xl font-bold bg-primary text-white hover:brightness-110 transition">Contratar Agora</a>
          </div>`).join('')}
        </div>
      </div>
    </section>`;
        break;

      case 'lead_form':
      case 'contact':
        sectionsHtml += `
    <section id="contact" class="py-20 bg-slate-900 border-t border-white/10">
      <div class="max-w-4xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">${sec.title || 'Entre em Contato'}</h2>
          <p class="text-slate-400">${sec.subtitle || 'Preencha o formulário e retornaremos rapidamente.'}</p>
        </div>
        <form id="siteia-contact-form" class="bg-slate-800 p-8 rounded-2xl border border-white/10 space-y-6">
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold mb-2">Nome Completo</label>
              <input type="text" name="name" required placeholder="Seu nome" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-primary">
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2">E-mail</label>
              <input type="email" name="email" required placeholder="seu@email.com" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-primary">
            </div>
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold mb-2">Telefone / WhatsApp</label>
              <input type="tel" name="phone" required placeholder="(11) 99999-9999" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-primary">
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2">Assunto</label>
              <input type="text" name="subject" placeholder="Qual o assunto?" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-primary">
            </div>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">Mensagem</label>
            <textarea name="message" rows="4" required placeholder="Descreva sua necessidade..." class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-primary"></textarea>
          </div>
          <button type="submit" class="w-full py-4 rounded-xl font-bold bg-primary text-white text-lg hover:brightness-110 transition">Enviar Mensagem</button>
          <div id="form-feedback" class="hidden p-4 rounded-xl text-center font-bold"></div>
        </form>
      </div>
    </section>`;
        break;

      default:
        break;
    }
  });

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${seo?.metaTitle || title}</title>
  <meta name="description" content="${seo?.metaDescription || ''}" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '${colors?.primary || '#1769AA'}',
            secondary: '${colors?.secondary || '#071A35'}',
            accent: '${colors?.accent || '#3689E6'}',
          }
        }
      }
    }
  </script>
  <link rel="stylesheet" href="styles.css">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Manrope:wght@400;600;700;800&display=swap" rel="stylesheet">
</head>
<body class="bg-[${colors?.background || '#071A35'}] text-[${colors?.text || '#FFFFFF'}] font-['Inter',sans-serif]">
  <!-- Header -->
  <header class="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
    <div class="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
      <a href="#" class="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
        <span class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-sm font-black">✦</span>
        ${header?.logoText || businessName}
      </a>
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        ${(header?.navLinks || []).map((link: any) => `<a href="${link.href}" class="hover:text-primary transition">${link.label}</a>`).join('')}
      </nav>
      <a href="${header?.ctaLink || '#contact'}" class="px-5 py-2.5 rounded-lg bg-primary font-bold text-white text-sm hover:brightness-110 transition">
        ${header?.ctaText || 'Contato'}
      </a>
    </div>
  </header>

  <main class="pt-20">
    ${sectionsHtml}
  </main>

  <!-- Footer -->
  <footer class="bg-slate-950 py-12 border-t border-white/10">
    <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
      <div>
        <h3 class="text-xl font-bold text-white mb-3">${businessName}</h3>
        <p class="text-slate-400 text-sm">${footer?.description || ''}</p>
      </div>
      <div>
        <h4 class="font-bold text-white mb-3">Links Rápidos</h4>
        <ul class="space-y-2 text-sm text-slate-400">
          ${(header?.navLinks || []).map((l: any) => `<li><a href="${l.href}" class="hover:text-primary">${l.label}</a></li>`).join('')}
        </ul>
      </div>
      <div>
        <h4 class="font-bold text-white mb-3">Contato</h4>
        <p class="text-slate-400 text-sm">${contactInfo?.phone || ''}</p>
        <p class="text-slate-400 text-sm">${contactInfo?.email || ''}</p>
        <p class="text-slate-400 text-sm">${contactInfo?.address || ''}</p>
      </div>
    </div>
    <div class="max-w-6xl mx-auto px-6 mt-8 pt-8 border-t border-white/5 text-center text-xs text-slate-500">
      ${footer?.copyright || `© ${new Date().getFullYear()} ${businessName}. Todos os direitos reservados.`}
    </div>
  </footer>

  ${floatingWhatsapp ? `
  <a href="https://wa.me/${contactInfo?.whatsapp || ''}?text=${encodeURIComponent(whatsappMessage || 'Olá!')}" target="_blank" rel="noopener noreferrer" class="fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition duration-200">
    <svg class="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.288-1.124z"/></svg>
  </a>` : ''}

  <script src="script.js"></script>
</body>
</html>`;
}

function generateStandaloneCss(site: SiteData): string {
  return `/* Custom styling overrides for ${site.businessName} */
html {
  scroll-behavior: smooth;
}
::selection {
  background-color: ${site.colors?.primary || '#1769AA'};
  color: #ffffff;
}
`;
}

function generateStandaloneJs(site: SiteData): string {
  return `// SITEIA Interactive Client Script
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('siteia-contact-form');
  const feedback = document.getElementById('form-feedback');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      if (feedback) {
        feedback.classList.remove('hidden', 'bg-red-500/20', 'text-red-400');
        feedback.classList.add('bg-emerald-500/20', 'text-emerald-400');
        feedback.textContent = 'Obrigado, ' + (data.name || 'cliente') + '! Sua mensagem foi enviada com sucesso.';
      }

      form.reset();

      // Open WhatsApp if configured
      const waNumber = '${site.contactInfo?.whatsapp || ''}';
      if (waNumber) {
        const text = encodeURIComponent('Olá! Acabei de enviar um formulário no site:\\n' + (data.name || '') + ' - ' + (data.phone || ''));
        setTimeout(() => {
          window.open('https://wa.me/' + waNumber + '?text=' + text, '_blank');
        }, 1000);
      }
    });
  }
});`;
}
