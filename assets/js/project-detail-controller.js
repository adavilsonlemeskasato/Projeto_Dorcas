document.addEventListener('DOMContentLoaded', () => {
  const target = document.querySelector('#project-detail');
  if (!target || !window.DorcasProjects) return;
  const id = Number(new URLSearchParams(window.location.search).get('id') || 1);
  const project = window.DorcasProjects.find(item => item.id === id) || window.DorcasProjects[0];
  document.title = `${project.title} | Projeto Social Dorcas`;
  target.innerHTML = `<article class="project-detail-view"><img class="project-detail-image" src="${project.image}" alt="${project.title}"><div class="project-detail-copy"><div class="project-detail-meta"><span class="tag">${project.category}</span><span class="status ${project.color}">${project.status}</span></div><h1>${project.title}</h1><p class="project-lead">${project.short}</p><h2>Sobre o projeto</h2><p>${project.long}</p><h2>Impacto esperado</h2><p>${project.impact}</p><h2>Como apoiar</h2><p>${project.how}</p><div class="actions project-detail-actions"><button class="btn btn-orange" type="button" data-open-volunteer>Inscrever-se como voluntário</button><a class="btn btn-outline-green" href="projetos.html">Voltar aos projetos</a></div></div></article>`;
});


document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.querySelector('#volunteer-dialog');
  const openButton = document.querySelector('[data-open-volunteer]');
  if (!dialog || !openButton) return;
  const form = dialog.querySelector('#volunteer-dialog-form');
  const closeButtons = dialog.querySelectorAll('[data-close-volunteer]');
  const closeDialog = () => dialog.close();
  openButton.addEventListener('click', () => dialog.showModal());
  closeButtons.forEach(button => button.addEventListener('click', closeDialog));
  dialog.addEventListener('click', event => {
    if (event.target === dialog) closeDialog();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const fields = [...form.querySelectorAll('input, select')];
    let valid = true;
    fields.forEach(field => {
      const error = field.parentElement.querySelector('.field-error');
      let message = '';
      if (field.required && !field.value.trim()) message = 'Este campo é obrigatório.';
      else if (field.name === 'nome' && field.value.trim().length < 3) message = 'Informe ao menos 3 caracteres.';
      else if (field.name === 'endereco' && field.value.trim().length < 5) message = 'Informe um endereço válido.';
      else if (field.type === 'email' && !/^\\S+@\\S+\\.\\S+$/.test(field.value)) message = 'Informe um e-mail válido.';
      else if (field.name === 'telefone' && field.value.replace(/\\D/g, '').length < 10) message = 'Informe ao menos 10 dígitos.';
      if (error) error.textContent = message;
      field.classList.toggle('invalid', Boolean(message));
      if (message && valid) field.focus();
      valid = valid && !message;
    });
    if (!valid) return;
    const success = form.querySelector('.success');
    success.hidden = false;
    success.textContent = 'Sua inscrição foi registrada neste navegador. A equipe da Dorcas entrará em contato.';
    form.reset();
  });
});
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
    let animated = false;

    const runCounter = (counter) => {
        const target = +counter.getAttribute("data-target");
        const suffix = counter.getAttribute("data-suffix") || "";
        let count = 0;
        
        // Velocidade da contagem (quanto menor o divisor, mais rápido)
        const speed = target > 100 ? target / 30 : target / 15; 

        const updateCount = () => {
            count += speed;
            if (count < target) {
                counter.innerText = Math.ceil(count) + suffix;
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = target + suffix; // Garante que para exatamente no valor correto
            }
        };

        updateCount();
    };

    const checkScroll = () => {
        const statsSection = document.querySelector(".stats");
        if (!statsSection) return;

        const sectionPosition = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (sectionPosition < screenPosition && !animated) {
            counters.forEach(counter => runCounter(counter));
            animated = true;
        }
    };

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Verifica caso a seção já carregue visível na tela
});
