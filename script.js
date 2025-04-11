const API_URL = 'https://script.google.com/macros/s/AKfycbwBiAZ1GP3xGsFlerMVPU0e1m-WzriYfSgC19LhjIhtiC1udOekYbJ-WS4BHdqVLWeb2A/exec';

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    const tbody = document.getElementById('agenda-body');
    tbody.innerHTML = '';
    let total = 0, confirmados = 0, pendentes = 0;

    data.forEach(item => {
      total++;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.telefone}</td>
        <td>${item.data}</td>
        <td>${item.horario}</td>
        <td class="status-${item.confirmado}">${item.confirmado === 'true' || item.confirmado === true ? 'Confirmado' : 'Pendente'}</td>
      `;
      if (item.confirmado === 'true' || item.confirmado === true) {
        confirmados++;
      } else {
        pendentes++;
      }
      tbody.appendChild(tr);
    });

    document.getElementById('total').textContent = `Total: ${total}`;
    document.getElementById('confirmados').textContent = `Confirmados: ${confirmados}`;
    document.getElementById('pendentes').textContent = `Pendentes: ${pendentes}`;
  })
  .catch(err => {
    document.getElementById('agenda-body').innerHTML = '<tr><td colspan="5">Erro ao carregar dados.</td></tr>';
    console.error(err);
  });
