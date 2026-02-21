const grid = document.getElementById('eventGrid');
const searchInput = document.getElementById('search');
const btns = document.querySelectorAll('.filter-btn');

async function render(filter = 'all', search = '') {
  try {
    const response = await fetch('/api/events');
    const events = await response.json();

    const filtered = events.filter(ev => {
      const uniMatch = filter === 'all' || ev.universe === filter;
      const searchMatch = ev.title.toLowerCase().includes(search.toLowerCase());
      return uniMatch && searchMatch;
    });

    grid.innerHTML = '';
    filtered.forEach(ev => {
      const card = document.createElement('div');
      card.className = 'card';
      card.onclick = () => location.href = `detail.html?id=${ev.id}`;
      card.innerHTML = `
        <div class="card-img" style="background-image: url('${ev.main_image}')"></div>
        <div class="card-content">
          <span class="badge badge-${ev.universe}">${ev.universe.toUpperCase()}</span>
          <h2 class="card-title">${ev.title}</h2>
          <p class="card-date">${ev.event_date}</p>
          <p class="card-desc">${ev.card_desc ? ev.card_desc.slice(0, 80) + '...' : ''}</p>
        </div>
      `;
      grid.appendChild(card);
    });
  } catch (err) {
    grid.innerHTML = '<p style="color:red">Ошибка подключения к серверу</p>';
  }
}

btns.forEach(btn => {
  btn.onclick = () => {
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render(btn.dataset.filter, searchInput.value);
  };
});
searchInput.oninput = () => render(document.querySelector('.filter-btn.active').dataset.filter, searchInput.value);
render();