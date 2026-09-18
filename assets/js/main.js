const projects = window.DorcasProjects || [];
const activities = [
  ['Campanha de Cimento: ajude a construir nossa sede', 'Infraestrutura', '12/08/2026', 'A construção da nossa sede precisa de você.', 'A campanha reúne doações de cimento e materiais para viabilizar a construção da sede da Associação Projeto Social Dorcas. A nova estrutura permitirá ampliar os atendimentos e oferecer um espaço mais seguro para as atividades.'], 
  ['Estatuto Social atualizado e aprovado em assembleia', 'Institucional', '28/11/2025', 'Conheça as atualizações do documento que orienta nossa atuação.', 'A atualização do Estatuto Social fortalece a organização institucional, registra responsabilidades e orienta a atuação da Associação em favor das famílias atendidas.'], 
  ['🎉 Festa do Dia das Crianças', 'Evento', '03/08/2026', 'No dia 12 de outubro, vamos celebrar o Dia das Crianças com muita alegria, brincadeiras e diversão!', 'Preparemos uma tarde especial com atividades lúdicas, gincanas, brinquedos infláveis, pintura de rosto, apresentações artísticas e muito mais. O objetivo é proporcionar um dia inesquecível para as crianças da nossa comunidade, valorizando o direito de brincar, se divertir e ser feliz.<br><br>📅 Data: 03 de outubro de 2026<br>⏰ Horário: às 08h<br>📍 Local: [Nome do local/sede da ONG]<br>👶 Público: Crianças de 0 a 12 anos acompanhadas de um responsável<br><br>Contamos com a participação de todas as famílias! Venha celebrar conosco essa data tão especial.'], 
  ['Dorcas completa 4 anos de atuação na comunidade', 'Institucional', '25/08/2026', 'Celebramos uma história construída com muitas mãos.', 'A celebração marca uma trajetória de compromisso com Santo Antônio de Leverger, construída com a participação de voluntários, parceiros, famílias e comunidade.'], 
  ['Saiba quais serviços a Dorcas oferece à comunidade', 'Serviços', '01/07/2026', 'Conheça nossos projetos e formas de atendimento.', 'A atividade apresenta os serviços, projetos e formas de acolhimento oferecidos pela Dorcas, ajudando a comunidade a encontrar orientação e apoio.']
];
const docs = [['Estatuto Social (2025)', '245 KB', '28/11/2025'], ['Ata de Assembleia — 28/11/2025', '180 KB', '28/11/2025'], ['Ata de Assembleia — 12/08/2026', '95 KB', '12/08/2026'], ['Ata de Fundação — 25/08/2022', '120 KB', '25/08/2022']];
const team = [['Odenir Cardoso de Resende', 'Presidente', 'Responsável pela condução institucional e representação da Associação.'], ['A definir', 'Vice-Presidente', 'Em breve, esta informação será atualizada.'], ['A definir', 'Secretária', 'Em breve, esta informação será atualizada.'], ['A definir', 'Tesoureiro', 'Em breve, esta informação será atualizada.']];
const initials = n => { const p = n.split(' '); return p.length > 1 ? (p[0][0] + p[p.length - 1][0]).toUpperCase() : p[0][0].toUpperCase() };
function renderProjects() { const el = document.querySelector('#projects-grid'); if (!el) return; el.innerHTML = projects.map(p => `<article class="card"><img src="${p.image.replace('w=1200&h=680', 'w=600&h=340')}" alt="${p.title}"><div class="card-body"><span class="tag">${p.category}</span><span class="status ${p.color}">${p.status}</span><h3>${p.title}</h3><p>${p.short}</p><button type="button" class="text-link project-modal-trigger" data-project-id="${p.id}">Conheça o projeto →</button></div></article>`).join('') }
function renderActivities() { const el = document.querySelector('#news-grid'); if (!el) return; el.innerHTML = activities.map(n => `<article class="card"><img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=340&fit=crop&auto=format" alt="${n[0]}"><div class="card-body"><div class="meta"><span class="tag">${n[1]}</span><small>${n[2]}</small></div><h3>${n[0]}</h3><p>${n[3]}</p><button type="button" class="text-link activity-modal-trigger" data-activity-id="${activities.indexOf(n)}">Ver atividades →</button></div></article>`).join('') }
function renderTeam() { const el = document.querySelector('#team-grid'); if (!el) return; el.innerHTML = team.map(m => `<article class="team"><div class="avatar">${initials(m[0])}</div><h3>${m[0]}</h3><span>${m[1]}</span><p>${m[2]}</p></article>`).join('') }
function renderDocs() { const el = document.querySelector('#docs-list'); if (!el) return; el.innerHTML = docs.map(d => `<div class="doc"><div class="doc-icon">PDF</div><div><h3>${d[0]}</h3><small>PDF · ${d[1]} · ${d[2]}</small></div><a class="btn" href="#" onclick="alert('O documento será disponibilizado em breve.');return false">Baixar</a></div>`).join('') }
function validate(input) { let ok = true, msg = ''; if (input.required && !input.value.trim()) { ok = false; msg = 'Este campo é obrigatório.' } else if (input.name === 'nome' && input.value.trim().length < 3) { ok = false; msg = 'Informe ao menos 3 caracteres.' } else if (input.type === 'email' && !/^\S+@\S+\.\S+$/.test(input.value)) { ok = false; msg = 'Informe um e-mail válido.' } else if (input.name === 'telefone' && input.value.replace(/\D/g, '').length < 10) { ok = false; msg = 'Informe ao menos 10 dígitos.' } else if (input.tagName === 'TEXTAREA' && input.value.trim().length < 10) { ok = false; msg = 'Escreva ao menos 10 caracteres.' } const error = input.parentElement.querySelector('.field-error'); if (error) error.textContent = ok ? '' : msg; input.classList.toggle('invalid', !ok); return ok }
function setupForm(form, message) { if (!form) return; form.querySelectorAll('input,select,textarea').forEach(i => i.addEventListener('blur', () => validate(i))); form.addEventListener('submit', e => { e.preventDefault(); const fields = [...form.querySelectorAll('input,select,textarea')]; const bad = fields.filter(i => !validate(i)); if (bad.length) { bad[0].focus(); return } message.hidden = false; message.textContent = 'Recebemos seus dados. Em uma versão estática, o envio precisa ser concluído por e-mail ou WhatsApp.'; form.reset() }) }
document.addEventListener('components:ready', () => {
  renderProjects(); renderActivities(); renderTeam(); renderDocs();
  const nav = document.querySelector('#main-nav'), hamb = document.querySelector('.hamb');
  if (nav && hamb) { hamb.addEventListener('click', () => { const open = nav.classList.toggle('aberto'); hamb.setAttribute('aria-expanded', String(open)) }); nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('aberto'); hamb.setAttribute('aria-expanded', 'false') })) }
  const modal = document.querySelector('#pix-modal'); const closeModal = () => modal?.classList.remove('open');
  document.querySelectorAll('.pix-open').forEach(button => button.addEventListener('click', () => modal?.classList.add('open'))); document.querySelector('#pix-modal .modal-close')?.addEventListener('click', closeModal); modal?.addEventListener('click', e => { if (e.target === modal) closeModal() }); document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal() });
  document.querySelectorAll('.copy-pix').forEach(button => button.addEventListener('click', async () => { try { await navigator.clipboard.writeText(button.dataset.pix) } catch { const text = document.createElement('textarea'); text.value = button.dataset.pix; document.body.appendChild(text); text.select(); document.execCommand('copy'); text.remove() } const label = button.textContent; button.textContent = 'Chave copiada!'; setTimeout(() => button.textContent = label, 2000) }));
  window.addEventListener('scroll', () => document.querySelector('#site-header')?.classList.toggle('scrolled', window.scrollY > 40));
  setupForm(document.querySelector('#volunteer-form'), document.querySelector('#volunteer-form .success')); setupForm(document.querySelector('#contact-form'), document.querySelector('#contact-form .success'));
});


document.addEventListener('components:ready', () => {
  const dialog = document.querySelector('#project-dialog');
  const content = document.querySelector('#project-dialog-content');
  if (!dialog || !content || !projects.length) return;
  const closeButtons = dialog.querySelectorAll('[data-close-project]');
  const closeDialog = () => dialog.close();
  document.querySelectorAll('.project-modal-trigger').forEach(button => {
    button.addEventListener('click', () => {
      const project = projects.find(item => item.id === Number(button.dataset.projectId));
      if (!project) return;
      content.innerHTML = `<div class="project-dialog-meta"><span class="tag">${project.category}</span><span class="status ${project.color}">${project.status}</span></div><img class="project-dialog-image" src="${project.image}" alt="${project.title}"><h2 id="project-dialog-title">${project.title}</h2><p class="project-lead">${project.short}</p><h3>Sobre o projeto</h3><p>${project.long}</p><h3>Impacto esperado</h3><p>${project.impact}</p><h3>Como apoiar</h3><p>${project.how}</p>`;
      dialog.showModal();
    });
  });
  closeButtons.forEach(button => button.addEventListener('click', closeDialog));
  dialog.addEventListener('click', event => {
    if (event.target === dialog) closeDialog();
  });
});


document.addEventListener('components:ready', () => {
  const projectDialog = document.querySelector('#project-dialog');
  const volunteerDialog = document.querySelector('#volunteer-dialog');
  const openVolunteer = document.querySelector('[data-open-volunteer]');
  if (!projectDialog || !volunteerDialog || !openVolunteer) return;
  const closeVolunteerButtons = volunteerDialog.querySelectorAll('[data-close-volunteer]');
  const closeVolunteer = () => volunteerDialog.close();
  openVolunteer.addEventListener('click', () => {
    projectDialog.close();
    requestAnimationFrame(() => volunteerDialog.showModal());
  });
  closeVolunteerButtons.forEach(button => button.addEventListener('click', closeVolunteer));
  volunteerDialog.addEventListener('click', event => {
    if (event.target === volunteerDialog) closeVolunteer();
  });
  const form = volunteerDialog.querySelector('#volunteer-dialog-form');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    let valid = true;
    let firstInvalid = null;
    form.querySelectorAll('input, select').forEach(field => {
      const error = field.parentElement.querySelector('.field-error');
      let message = '';
      if (field.required && !field.value.trim()) message = 'Este campo é obrigatório.';
      else if (field.name === 'nome' && field.value.trim().length < 3) message = 'Informe ao menos 3 caracteres.';
      else if (field.name === 'endereco' && field.value.trim().length < 5) message = 'Informe um endereço válido.';
      else if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)) message = 'Informe um e-mail válido.';
      else if (field.name === 'telefone' && field.value.replace(/\D/g, '').length < 10) message = 'Informe ao menos 10 dígitos.';
      if (error) error.textContent = message;
      field.classList.toggle('invalid', Boolean(message));
      if (message && !firstInvalid) firstInvalid = field;
      valid = valid && !message;
    });
    if (!valid) { firstInvalid?.focus(); return; }
    const success = form.querySelector('.success');
    success.hidden = false;
    success.textContent = 'Sua inscrição foi registrada neste navegador. A equipe da Dorcas entrará em contato.';
    form.reset();
  });
});


document.addEventListener('components:ready', () => {
  const dialog = document.querySelector('#activity-dialog');
  const content = document.querySelector('#activity-dialog-content');
  if (!dialog || !content || !activities.length) return;
  const closeDialog = () => dialog.close();
  document.querySelectorAll('.activity-modal-trigger').forEach(button => {
    button.addEventListener('click', () => {
      const activity = activities[Number(button.dataset.activityId)];
      if (!activity) return;
      content.innerHTML = `<div class="activity-dialog-meta"><span class="tag">${activity[1]}</span><time>${activity[2]}</time></div><h2 id="activity-dialog-title">${activity[0]}</h2><p class="activity-dialog-lead">${activity[3]}</p><h3>Sobre esta atividade</h3><p>${activity[4]}</p><h3>Participe e acompanhe</h3><p>As atividades da Dorcas são construídas com a participação da comunidade, voluntários e parceiros. Acompanhe nossas ações e ajude a fortalecer essa iniciativa.</p>`;
      dialog.showModal();
    });
  });
  dialog.querySelectorAll('[data-close-activity]').forEach(button => button.addEventListener('click', closeDialog));
  dialog.addEventListener('click', event => {
    if (event.target === dialog) closeDialog();
  });
});


document.addEventListener('components:ready', () => {
  const pixDialog = document.querySelector('#pix-dialog');
  if (!pixDialog) return;
  const openButtons = document.querySelectorAll('[data-open-pix]');
  const closeButtons = pixDialog.querySelectorAll('[data-close-pix]');
  const closePix = () => pixDialog.close();
  openButtons.forEach(button => button.addEventListener('click', () => pixDialog.showModal()));
  closeButtons.forEach(button => button.addEventListener('click', closePix));
  pixDialog.addEventListener('click', event => {
    if (event.target === pixDialog) closePix();
  });
  pixDialog.querySelectorAll('.copy-pix').forEach(button => {
    button.addEventListener('click', async () => {
      const value = button.dataset.pix || '';
      const original = button.textContent;
      try {
        if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(value);
        else {
          const helper = document.createElement('textarea');
          helper.value = value;
          helper.style.position = 'fixed';
          helper.style.opacity = '0';
          document.body.appendChild(helper);
          helper.select();
          document.execCommand('copy');
          helper.remove();
        }
        button.textContent = 'Chave copiada!';
        button.classList.add('copied');
        setTimeout(() => { button.textContent = original; button.classList.remove('copied'); }, 2200);
      } catch {
        button.textContent = 'Copie manualmente a chave';
        setTimeout(() => { button.textContent = original; }, 2200);
      }
    });
  });
});


document.addEventListener('components:ready', () => {
  const helpDialog = document.querySelector('#help-dialog');
  if (!helpDialog) return;
  const closeHelp = () => helpDialog.close();
  document.querySelectorAll('[data-open-help]').forEach(button => button.addEventListener('click', () => helpDialog.showModal()));
  helpDialog.querySelectorAll('[data-close-help]').forEach(button => button.addEventListener('click', closeHelp));
  helpDialog.addEventListener('click', event => {
    if (event.target === helpDialog) closeHelp();
  });
  helpDialog.querySelectorAll('.help-copy-pix').forEach(button => {
    button.addEventListener('click', async () => {
      const value = button.dataset.pix || '';
      const original = button.textContent;
      try {
        if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(value);
        else {
          const helper = document.createElement('textarea');
          helper.value = value;
          helper.style.position = 'fixed';
          helper.style.opacity = '0';
          document.body.appendChild(helper);
          helper.select();
          document.execCommand('copy');
          helper.remove();
        }
        button.textContent = 'Chave copiada!';
        button.classList.add('copied');
        setTimeout(() => { button.textContent = original; button.classList.remove('copied'); }, 2200);
      } catch {
        button.textContent = 'Copie manualmente a chave';
        setTimeout(() => { button.textContent = original; }, 2200);
      }
    });
  });
  const form = helpDialog.querySelector('#help-volunteer-form');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const fields = [...form.querySelectorAll('input')];
    let firstInvalid = null;
    let valid = true;
    fields.forEach(field => {
      const error = field.parentElement.querySelector('.field-error');
      let message = '';
      if (field.required && !field.value.trim()) message = 'Este campo é obrigatório.';
      else if (field.name === 'nome' && field.value.trim().length < 3) message = 'Informe ao menos 3 caracteres.';
      else if (field.name === 'endereco' && field.value.trim().length < 5) message = 'Informe um endereço válido.';
      else if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)) message = 'Informe um e-mail válido.';
      else if (field.name === 'telefone' && field.value.replace(/\D/g, '').length < 10) message = 'Informe ao menos 10 dígitos.';
      if (error) error.textContent = message;
      field.classList.toggle('invalid', Boolean(message));
      if (message && !firstInvalid) firstInvalid = field;
      valid = valid && !message;
    });
    if (!valid) { firstInvalid?.focus(); return; }
    const success = form.querySelector('.success');
    success.hidden = false;
    success.textContent = 'Recebemos seus dados. A equipe da Dorcas entrará em contato.';
    form.reset();
  });
});


document.addEventListener('components:ready', () => {
  const contactDialog = document.querySelector('#contact-dialog');
  if (!contactDialog) return;
  const closeContact = () => contactDialog.close();
  document.querySelectorAll('[data-open-contact]').forEach(button => button.addEventListener('click', () => contactDialog.showModal()));
  contactDialog.querySelectorAll('[data-close-contact]').forEach(button => button.addEventListener('click', closeContact));
  contactDialog.addEventListener('click', event => {
    if (event.target === contactDialog) closeContact();
  });
  const form = contactDialog.querySelector('#contact-dialog-form');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const fields = [...form.querySelectorAll('input, textarea')];
    let valid = true;
    let firstInvalid = null;
    fields.forEach(field => {
      const error = field.parentElement.querySelector('.field-error');
      let message = '';
      if (field.required && !field.value.trim()) message = 'Este campo é obrigatório.';
      else if (field.name === 'nome' && field.value.trim().length < 3) message = 'Informe ao menos 3 caracteres.';
      else if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)) message = 'Informe um e-mail válido.';
      else if (field.name === 'mensagem' && field.value.trim().length < 10) message = 'Escreva ao menos 10 caracteres.';
      if (error) error.textContent = message;
      field.classList.toggle('invalid', Boolean(message));
      if (message && !firstInvalid) firstInvalid = field;
      valid = valid && !message;
    });
    if (!valid) { firstInvalid?.focus(); return; }
    const success = form.querySelector('.success');
    success.hidden = false;
    success.textContent = 'Mensagem recebida. A equipe da Dorcas entrará em contato.';
    form.reset();
  });
});