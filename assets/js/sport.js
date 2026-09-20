(() => {
  const data = window.EPYAL || {};
  const params = new URLSearchParams(location.search);
  const slug = params.get('slug') || 'basketball';
  const sport = (data.sports || []).find(item => item.slug === slug) || (data.sports || [])[0];

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  if (!sport) {
    document.querySelector('#sport-app').innerHTML = '<section class="section"><div class="shell"><h1>Program not found</h1><p><a href="/">Return to EPYAL home.</a></p></div></section>';
    return;
  }

  document.title = `${sport.name} | EPYAL`;

  const setText = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = value || '';
  };

  setText('#crumb-name', sport.name);
  setText('#sport-meta', sport.meta);
  setText('#sport-name', sport.name);
  setText('#sport-summary', sport.summary);
  setText('#sport-icon', sport.icon);
  setText('#overview-title', `${sport.name} at EPYAL`);
  setText('#overview-copy', sport.summary);
  setText('#registration-copy', sport.registration);
  setText('#sport-directors', sport.directors);
  setText('#sport-meta-sidebar', sport.meta);

  const email = document.querySelector('#sport-email');
  if (email) {
    email.textContent = sport.email || 'Contact EPYAL';
    email.href = sport.email ? `mailto:${sport.email}` : 'mailto:info@epyal.com';
  }

  const status = document.querySelector('#sport-status');
  if (status) {
    status.textContent = sport.status;
    status.classList.add(`pill--${sport.statusClass}`);
  }

  const legacy = document.querySelector('#legacy-link');
  if (legacy) legacy.href = sport.legacy || 'https://tshq.bluesombrero.com/Default.aspx?tabid=1326003';

  const details = document.querySelector('#detail-stack');
  if (details) {
    details.innerHTML = (sport.details || []).map(([label, copy]) => `
      <div class="detail-row"><strong>${label}</strong><span>${copy}</span></div>
    `).join('');
  }
})();