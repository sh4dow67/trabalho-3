const pontos = [
  {
    id: 'P01',
    local: 'Bloco 1',
    capacidade: 20,
    ocupadas: 8,
    coberto: true,
    iluminacao: true
  },
  {
    id: 'P02',
    local: 'Bloco 2',
    capacidade: 15,
    ocupadas: 12,
    coberto: false,
    iluminacao: true
  },
  {
    id: 'P03',
    local: 'Bloco 3',
    capacidade: 10,
    ocupadas: 10,
    coberto: true,
    iluminacao: false
  }
];

const container = document.getElementById('container');
const modal = document.getElementById('modal');
const modalInfo = document.getElementById('modalInfo');
const closeModal = document.getElementById('closeModal');

function calcularEstado(ponto) {
  if (ponto.ocupadas === ponto.capacidade) return 'lotado';
  else if (ponto.ocupadas >= ponto.capacidade / 2) return 'quase-cheio';
  else return 'disponivel';
}

function atualizarTela() {
  container.innerHTML = '';
  pontos.forEach((ponto, index) => {
    const estado = calcularEstado(ponto);
    const div = document.createElement('div');
    div.className = `ponto ${estado}`;
    div.setAttribute('role', 'region');
    div.setAttribute('aria-label', `Ponto ${ponto.local} - ${estado.replace('-', ' ')}`);

    div.innerHTML = `
      <div class="icone">🚲</div>
      <div class="info"><strong>Localização:</strong> ${ponto.local}</div>
      <div class="info"><strong>Capacidade:</strong> ${ponto.capacidade} vagas</div>
      <div class="info"><strong>Estacionadas:</strong> ${ponto.ocupadas} bicicletas</div>
      <div class="info"><strong>Código:</strong> ${ponto.id}</div>
      <div class="btn-group">
        <button class="btn-add" aria-label="Adicionar bicicleta">+1 Bicicleta</button>
        <button class="btn-remove" aria-label="Remover bicicleta">-1 Bicicleta</button>
      </div>
      <button class="btn-info" aria-label="Ver mais informações">Mais Informações</button>
    `;

    // Adicionar eventos
    div.querySelector('.btn-add').addEventListener('click', () => {
      if (ponto.ocupadas < ponto.capacidade) {
        ponto.ocupadas++;
        atualizarTela();
      }
    });

    div.querySelector('.btn-remove').addEventListener('click', () => {
      if (ponto.ocupadas > 0) {
        ponto.ocupadas--;
        atualizarTela();
      }
    });

    div.querySelector('.btn-info').addEventListener('click', () => {
      mostrarModal(ponto);
    });

    container.appendChild(div);
  });
}

function mostrarModal(ponto) {
  modalInfo.innerHTML = `
    <strong>Local:</strong> ${ponto.local}<br/>
    <strong>Código:</strong> ${ponto.id}<br/>
    <strong>Cobertura:</strong> ${ponto.coberto ? 'Sim' : 'Não'}<br/>
    <strong>Iluminação:</strong> ${ponto.iluminacao ? 'Sim' : 'Não'}
  `;
  modal.style.display = 'block';
  modal.setAttribute('aria-hidden', 'false');
}

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
});

window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }
});

atualizarTela();
