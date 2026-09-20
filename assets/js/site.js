(() => {
  const data = window.EPYAL || {};
  const $ = (s, root=document) => root.querySelector(s);

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  const toggle = $('.nav-toggle');
  const nav = $('#primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded','false');
    }));
  }

  const sportGrid = $('#sport-grid');
  if (sportGrid) {
    sportGrid.innerHTML = (data.sports || []).map(s => `
      <a class="sport-card" href="/sport.html?slug=${encodeURIComponent(s.slug)}">
        <div class="sport-card__icon" aria-hidden="true">${s.icon}</div>
        <strong>${s.name}</strong>
        <span>${s.meta}</span>
      </a>`).join('');
  }

  const regGrid = $('#registration-grid');
  if (regGrid) {
    regGrid.innerHTML = (data.registrations || []).map(r => `
      <article class="registration-card">
        <div class="registration-card__top">
          <span class="registration-card__icon" aria-hidden="true">${r.icon}</span>
          <span class="pill pill--${r.statusClass}">${r.status}</span>
        </div>
        <h3>${r.sport}</h3>
        <small>${r.window}</small>
        <p>${r.description}</p>
        <a class="button ${r.statusClass === 'open' ? 'button--orange' : 'button--outline'}" href="/sport.html?slug=${encodeURIComponent(r.slug)}">Program Details</a>
      </article>`).join('');
  }

  const newsList = $('#news-list');
  if (newsList) {
    newsList.innerHTML = (data.news || []).map(n => `
      <article class="news-card">
        <div class="news-card__visual" aria-hidden="true">${n.icon}</div>
        <div><h3>${n.title}</h3><p>${n.summary}</p><time>${n.date}</time></div>
      </article>`).join('');
  }

  const eventList = $('#event-list');
  if (eventList) {
    eventList.innerHTML = (data.events || []).map(e => `
      <article class="event-card">
        <div class="date-box"><span>${e.month}</span><strong>${e.day}</strong></div>
        <div><h3>${e.title}</h3><p>${e.meta}</p></div>
      </article>`).join('');
  }

  const leadership = $('#leadership-grid');
  if (leadership) {
    leadership.innerHTML = (data.leadership || []).map(l => `
      <article class="leader-card">
        <small>${l.role}</small>
        <h3>${l.name}</h3>
        ${l.email ? `<a href="mailto:${l.email}">${l.email}</a>` : '<p>League leadership</p>'}
      </article>`).join('');
  }

  const form = $('#newsletter-form');
  const status = $('#newsletter-status');
  if (form && status) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      const formData = new FormData(form);
      const payload = {
        email: String(formData.get('email') || '').trim(),
        consent: formData.get('consent') === 'yes',
        website: String(formData.get('website') || '')
      };

      button.disabled = true;
      const previous = button.textContent;
      button.textContent = 'Joining…';
      status.textContent = '';

      try {
        const response = await fetch('/api/subscribe', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(payload)
        });
        const body = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(body.error || 'Unable to subscribe right now.');
        status.style.color = '#a9e8bf';
        status.textContent = 'You’re on the list. Watch your inbox for EPYAL updates.';
        form.reset();
      } catch (error) {
        status.style.color = '#ffb19b';
        status.textContent = error.message || 'Unable to subscribe right now.';
      } finally {
        button.disabled = false;
        button.textContent = previous;
      }
    });
  }
})();