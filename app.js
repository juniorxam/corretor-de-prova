const MEDIUM_CARGOS = new Set([
  'Assistente de Serviços de Saúde',
  'Instrumentador Cirúrgico',
  'Técnico em Enfermagem',
  'Técnico em Imobilização Ortopédica',
  'Técnico em Laboratório',
  'Técnico em Radiologia',
  'Técnico em Saúde Bucal'
]);

const cargoSelect = document.querySelector('#cargo-select');
const provaSelect = document.querySelector('#prova-select');
const cargoLevel = document.querySelector('#cargo-level');
const grid = document.querySelector('#answer-grid');
const bulkInput = document.querySelector('#bulk-input');
const bulkHint = document.querySelector('#bulk-hint');
const inputs = [];

const cargos = [...new Set(GABARITOS.map(item => item.cargo))];
cargos.forEach(cargo => cargoSelect.add(new Option(cargo, cargo)));

function selectedKey() {
  return GABARITOS.find(item => item.cargo === cargoSelect.value && item.prova === Number(provaSelect.value));
}

function isMedium() {
  return MEDIUM_CARGOS.has(cargoSelect.value);
}

function updateSubjectsLabel() {
  const medium = isMedium();
  cargoLevel.textContent = medium ? 'Nível médio · 60 questões · 90 pontos' : 'Nível superior · 60 questões · 90 pontos';
}

function populateProvas() {
  const provas = GABARITOS.filter(item => item.cargo === cargoSelect.value).map(item => item.prova);
  provaSelect.replaceChildren(...provas.map(prova => new Option(`Prova ${prova}`, prova)));
  updateSubjectsLabel();
}

function buildGrid() {
  grid.replaceChildren();
  inputs.length = 0;
  for (let q = 1; q <= 60; q += 1) {
    const item = document.createElement('div');
    item.className = `answer-item${q > 30 ? ' weighted' : ''}`;
    item.innerHTML = `<label for="q${q}">${String(q).padStart(2, '0')}</label><input id="q${q}" maxlength="1" inputmode="text" autocomplete="off" placeholder="—" aria-label="Questão ${q}" />`;
    grid.appendChild(item);
    inputs.push(item.querySelector('input'));
  }
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value.toUpperCase().replace(/[^ABCD]/g, '').slice(0, 1);
      updateCounter();
    });
    input.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const next = inputs[inputs.indexOf(input) + 1];
        if (next) next.focus();
      }
    });
  });
}

function updateCounter() {
  document.querySelector('#counter').textContent = `${inputs.filter(input => input.value.trim()).length}/60 preenchidas`;
}

function parseBulk(value) {
  return (value.toUpperCase().match(/[ABCD]/g) || []).slice(0, 60);
}

function applyBulkAnswers() {
  const values = parseBulk(bulkInput.value);
  inputs.forEach((input, index) => { input.value = values[index] || ''; });
  updateCounter();
  bulkHint.textContent = values.length === 60 ? '60 respostas reconhecidas — agora clique em Corrigir prova' : `${values.length}/60 alternativas reconhecidas`;
  bulkHint.style.color = values.length === 60 ? 'var(--green)' : 'var(--muted)';
}

function subjectLayout() {
  return isMedium()
    ? [
        { name: 'Língua Portuguesa', start: 1, end: 10 },
        { name: 'Matemática e Raciocínio Lógico', start: 11, end: 17 },
        { name: 'Informática Básica', start: 18, end: 24 },
        { name: 'História e Geografia do Tocantins', start: 25, end: 30 },
        { name: 'Legislação (SUS)', start: 31, end: 35 },
        { name: 'Conhecimentos Específicos', start: 36, end: 60 }
      ]
    : [
        { name: 'Língua Portuguesa', start: 1, end: 10 },
        { name: 'Matemática e Raciocínio Lógico', start: 11, end: 18 },
        { name: 'História e Geografia do Tocantins', start: 19, end: 24 },
        { name: 'Legislação (SUS)', start: 25, end: 30 },
        { name: 'Conhecimentos Específicos', start: 31, end: 60 }
      ];
}

function resetResults() {
  document.querySelector('#validation').textContent = '';
  document.querySelector('#results-section').classList.add('hidden');
  document.querySelector('#summary-content').classList.add('hidden');
  document.querySelector('#pdf-btn').classList.add('hidden');
  document.querySelector('#empty-state').classList.remove('hidden');
}

function grade() {
  const invalid = inputs.find(input => input.value && !/^[ABCD]$/.test(input.value));
  if (invalid) {
    document.querySelector('#validation').textContent = 'Use somente A, B, C ou D em cada questão.';
    invalid.focus();
    return;
  }
  const key = selectedKey();
  const subjects = subjectLayout().map(subject => ({ ...subject, correct: 0 }));
  let points = 0; let correct = 0; let wrong = 0; let blank = 0;
  const cards = [];
  inputs.forEach((input, index) => {
    const question = index + 1;
    const answer = input.value || '';
    const answerKey = key.respostas[index];
    const weight = question <= 30 ? 1 : 2;
    let status = 'blank'; let label = 'Em branco';
    if (!answer) blank += 1;
    else if (answer === answerKey) {
      correct += 1; points += weight; status = 'correct'; label = 'Certo';
      const subject = subjects.find(item => question >= item.start && question <= item.end);
      if (subject) subject.correct += 1;
    } else { wrong += 1; status = 'wrong'; label = 'Errado'; }
    cards.push(`<div class="result-item ${status}"><span class="result-q">Q${String(question).padStart(2, '0')} · ×${weight}</span><span class="result-main">${answer || '—'} <small>gabarito ${answerKey}</small></span><span class="result-status">${label}</span></div>`);
  });

  document.querySelector('#score').textContent = points;
  document.querySelector('#percent').textContent = `${(points / 90 * 100).toFixed(2).replace('.', ',')}% de aproveitamento`;
  document.querySelector('#correct').textContent = correct;
  document.querySelector('#wrong').textContent = wrong;
  document.querySelector('#blank').textContent = blank;
  document.querySelector('#empty-state').classList.add('hidden');
  document.querySelector('#summary-content').classList.remove('hidden');
  document.querySelector('#pdf-btn').classList.remove('hidden');
  document.querySelector('#results-section').classList.remove('hidden');
  document.querySelector('#results-grid').innerHTML = cards.join('');
  document.querySelector('#subject-breakdown').innerHTML = '<h4>Desempenho por matéria</h4>' + subjects.map(subject => {
    const total = subject.end - subject.start + 1;
    const pct = Math.round(subject.correct / total * 100);
    return `<div class="subject-row"><span class="subject-name">${subject.name}</span><span class="subject-score">${subject.correct}/${total} · ${pct}%</span><div class="subject-bar"><div class="subject-fill ${pct < 100 ? 'partial' : ''}" style="width:${pct}%"></div></div></div>`;
  }).join('');
  document.querySelector('#result-caption').textContent = `${key.cargo} · Prova ${key.prova} · ${correct} acertos · ${points}/90 pontos`;
  document.querySelector('#results-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

cargoSelect.addEventListener('change', () => { populateProvas(); resetResults(); });
provaSelect.addEventListener('change', resetResults);
document.querySelector('#grade-btn').addEventListener('click', grade);
document.querySelector('#apply-bulk').addEventListener('click', applyBulkAnswers);
bulkInput.addEventListener('input', () => { bulkHint.textContent = `${parseBulk(bulkInput.value).length}/60 alternativas reconhecidas`; });
bulkInput.addEventListener('paste', () => setTimeout(applyBulkAnswers, 0));
document.querySelector('#clear-btn').addEventListener('click', () => {
  inputs.forEach(input => { input.value = ''; });
  bulkInput.value = '';
  bulkHint.textContent = 'Aceita espaços, vírgulas ou quebras de linha';
  bulkHint.style.color = 'var(--muted)';
  resetResults();
  updateCounter();
  inputs[0].focus();
});
document.querySelector('#pdf-btn').addEventListener('click', () => {
  const oldTitle = document.title;
  document.title = 'correcao-prova';
  window.print();
  setTimeout(() => { document.title = oldTitle; }, 1000);
});

buildGrid();
populateProvas();
updateCounter();
