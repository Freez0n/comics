async function loadDetail() {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const detailBox = document.getElementById('detail');

  try {
      const res = await fetch(`/api/events/${id}`);
      const ev = await res.json();

      let contentHTML = ev.blocks.map(block => {
          if (block.block_type === 'text') {
              return `<p class="story-text" style="margin-bottom:20px; line-height:1.6;">${block.content}</p>`;
          } else {
              return `<img src="${block.content}" style="width:100%; border:4px solid #000; margin: 20px 0; box-shadow: 8px 8px 0 #000;">`;
          }
      }).join('');

      detailBox.innerHTML = `
          <button onclick="history.back()" class="filter-btn" style="margin: 20px; cursor:pointer;">← Назад</button>
          <div class="hero-banner" style="background-image: url('${ev.main_image}')">
              <div class="hero-info"><h1>${ev.title}</h1><p class="hero-date">${ev.event_date}</p></div>
          </div>
          <article class="story" style="max-width:800px; margin:0 auto; padding:20px;">
              ${contentHTML}
          </article>
      `;
  } catch (err) {
      detailBox.innerHTML = '<h2>Событие не найдено</h2>';
  }
}
loadDetail();