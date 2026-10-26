(() => {
  const C = window.CONFIG, $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const hide = id => { $('#' + id).hidden = true; const a = $(`nav a[href="#${id}"]`); a && a.remove(); };
  const toast = t => { const e = $('#toast'); e.textContent = t; e.classList.add('show'); setTimeout(() => e.classList.remove('show'), 2200); };

  /* Nama tamu (textContent = aman dari injeksi HTML) */
  const guest = (new URLSearchParams(location.search).get('to') || '').trim().slice(0, 60) || C.defaultGuest;
  $('#guest').textContent = guest;
  if (guest !== C.defaultGuest) $('#rname').value = guest;

  /* Mempelai */
  $('#nG').textContent = C.groom.name; $('#nB').textContent = C.bride.name;
  const par = (id, o, w) => $(id).textContent = (o.father && o.mother) ? `${w} dari Bapak ${o.father} dan Ibu ${o.mother}` : '';
  par('#pG', C.groom, 'Putra'); par('#pB', C.bride, 'Putri');
  const photo = (id, src, show) => { if (!src) return; const b = $(id), i = new Image(); i.alt = b.dataset.alt; i.onload = () => { b.textContent = ''; b.append(i); if (show) b.hidden = false; }; i.src = src; };
  photo('#phG', C.groom.photo); photo('#phB', C.bride.photo); photo('#phC', C.couplePhoto, true);

  /* Acara */
  const E = C.event, sd = new Date(E.start);
  const dateTxt = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' }).format(sd);
  $('#hdate').textContent = dateTxt; $('#edate').textContent = dateTxt;
  $('#etitle').textContent = E.title; $('#etime').textContent = E.timeLabel;
  $('#eplace').textContent = E.place; $('#eaddr').textContent = E.address;
  if (E.address) $('#map').href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(E.address);
  else { $('#map').removeAttribute('href'); $('#map').setAttribute('aria-disabled', 'true'); }

  $('#cal').onclick = () => {
    const z = d => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z', end = new Date(sd.getTime() + E.durationHours * 36e5);
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT', 'DTSTART:' + z(sd), 'DTEND:' + z(end),
      'SUMMARY:Pernikahan Hizul & Tania', `LOCATION:${E.place}\\, ${E.address}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    a.download = 'undangan-hizul-tania.ics'; a.click();
  };

  const cd = $('#cd');
  const tick = () => {
    const d = sd - Date.now();
    if (d <= 0) { cd.innerHTML = '<p class="it">Hari bahagia telah tiba. Terima kasih atas doa dan restunya.</p>'; return clearInterval(tm); }
    const v = [['Hari', 864e5], ['Jam', 36e5], ['Menit', 6e4], ['Detik', 1e3]].map(([n, m]) => `<div><b>${Math.floor(d / m) % (m === 864e5 ? 1e5 : m === 36e5 ? 24 : 60)}</b><span>${n}</span></div>`);
    cd.innerHTML = v.join('');
  };
  const tm = setInterval(tick, 1000); tick();

  /* Love story (buku dongeng) */
  const st = C.story.filter(s => s.text);
  if (!st.length) hide('story');
  else {
    const book = $('#book'), tabs = $('#tabs');
    const show = i => {
      $$('#tabs button').forEach((b, k) => b.setAttribute('aria-selected', k === i));
      const s = st[i]; book.replaceChildren();
      const h = document.createElement('h3'), sub = document.createElement('small'), p = document.createElement('p');
      h.textContent = s.title; sub.textContent = [s.sub, s.date].filter(Boolean).join(' · '); p.textContent = s.text;
      book.append(h, sub, p);
      if (s.photo) { const im = new Image(); im.alt = s.title; im.onload = () => book.append(im); im.src = s.photo; }
      book.classList.remove('flip'); void book.offsetWidth; book.classList.add('flip');
    };
    st.forEach((s, i) => { const b = document.createElement('button'); b.textContent = s.title; b.role = 'tab'; b.onclick = () => show(i); tabs.append(b); });
    show(0);
  }

  /* Galeri + lightbox */
  const grid = $('#grid'), lb = $('#lb'), lbi = $('#lb img'); let cur = 0, list = [...C.gallery];
  C.gallery.forEach(src => {
    const f = document.createElement('figure'), im = new Image();
    im.loading = 'lazy'; im.alt = 'Foto Hizul dan Tania'; im.src = src;
    im.onerror = () => { f.remove(); list = list.filter(u => u !== src); if (!grid.children.length) hide('galeri'); };
    f.append(im); f.onclick = () => open_(list.indexOf(src)); grid.append(f);
  });
  if (!list.length) hide('galeri');
  const open_ = i => { cur = (i + list.length) % list.length; lbi.src = list[cur]; lb.hidden = false; };
  $('#lb .x').onclick = () => lb.hidden = true;
  $('#lb .p').onclick = () => open_(cur - 1); $('#lb .n').onclick = () => open_(cur + 1);
  lb.onclick = e => { if (e.target === lb) lb.hidden = true; };
  addEventListener('keydown', e => { if (lb.hidden) return; if (e.key === 'Escape') lb.hidden = true; if (e.key === 'ArrowLeft') open_(cur - 1); if (e.key === 'ArrowRight') open_(cur + 1); });
  let tx = 0; lb.addEventListener('touchstart', e => tx = e.touches[0].clientX, { passive: true });
  lb.addEventListener('touchend', e => { const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 50) open_(cur + (d < 0 ? 1 : -1)); });

  /* RSVP via WhatsApp: pesan dapat diperiksa dulu */
  $('#rf').onsubmit = e => {
    e.preventDefault(); const f = new FormData(e.target);
    $('#pv').value = `Assalamu'alaikum, saya ${f.get('n')}.\nKonfirmasi: ${f.get('s')}\nJumlah tamu: ${f.get('j')} orang\nPesan/doa: ${f.get('m') || '-'}`;
    $('#pvbox').hidden = false; $('#pv').focus();
  };
  $('#wa').onclick = () => window.open(`https://wa.me/${C.rsvp.whatsapp}?text=${encodeURIComponent($('#pv').value)}`, '_blank', 'noopener');
  if (!C.rsvp.whatsapp) hide('rsvp');

  /* Wedding gift */
  const G = C.gift;
  if (!G.number) hide('gift');
  else {
    $('#gbank').textContent = G.bank; $('#gnum').textContent = G.number; $('#ghold').textContent = 'a.n. ' + G.holder;
    $('#copy').onclick = async () => {
      try { await navigator.clipboard.writeText(G.number); }
      catch { const t = document.createElement('textarea'); t.value = G.number; document.body.append(t); t.select(); document.execCommand('copy'); t.remove(); }
      toast('Nomor rekening berhasil disalin');
    };
  }

  /* Musik: hanya mulai setelah tombol Buka Undangan ditekan */
  const au = $('#bgm'), mb = $('#music'), off = () => { mb.disabled = true; $('#vol').disabled = true; mb.title = 'Musik belum tersedia'; };
  if (C.music) { au.src = C.music; au.onerror = off; } else off();
  au.volume = .7;
  const play = () => au.src && au.play().then(() => mb.classList.add('pl')).catch(() => { });
  mb.onclick = () => au.paused ? play() : (au.pause(), mb.classList.remove('pl'));
  $('#vol').oninput = e => au.volume = e.target.value;

  $('#openBtn').onclick = () => {
    $('#cover').classList.add('open'); document.body.classList.remove('lock'); scrollTo(0, 0); play();
    setTimeout(() => { $('#cover').remove(); document.body.classList.add('on'); }, 2400);
  };

  /* Burung terbang */
  if (!RM) for (let i = 0; i < 6; i++) {
    const b = document.createElement('div'), s = 26 + Math.random() * 28;
    b.className = 'bird';
    b.style.cssText = `top:${6 + Math.random() * 55}vh;width:${s}px;opacity:${.55 + s / 140};animation-duration:${16 + Math.random() * 16}s;animation-delay:-${Math.random() * 20}s`;
    b.innerHTML = '<i><svg viewBox="0 0 50 28"><use href="#bird"/></svg></i>'; $('#birds').append(b);
  }

  /* Partikel cahaya */
  const cv = $('#fx'), x = cv.getContext('2d'); let W, H;
  const rs = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; }; rs(); addEventListener('resize', rs);
  const P = Array.from({ length: 60 }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: .6 + Math.random() * 1.8, v: .1 + Math.random() * .35, p: Math.random() * 6.3 }));
  const draw = t => {
    x.clearRect(0, 0, W, H); x.shadowColor = '#ffd978'; x.shadowBlur = 8;
    for (const p of P) { p.y -= p.v; if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; } x.fillStyle = `rgba(255,226,140,${.35 + .35 * Math.sin(t / 700 + p.p)})`; x.beginPath(); x.arc(p.x, p.y, p.r, 0, 6.3); x.fill(); }
    if (!RM && !document.hidden) requestAnimationFrame(draw);
  };
  draw(0); document.addEventListener('visibilitychange', () => { if (!document.hidden && !RM) requestAnimationFrame(draw); });

  /* Efek miring 3D & reveal */
  if (!RM && matchMedia('(hover:hover)').matches) $$('.tilt').forEach(el => {
    el.onpointermove = e => { const r = el.getBoundingClientRect(); el.style.transform = `perspective(900px) rotateY(${((e.clientX - r.left) / r.width - .5) * 14}deg) rotateX(${-((e.clientY - r.top) / r.height - .5) * 14}deg)`; };
    el.onpointerleave = () => el.style.transform = '';
  });
  const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))), { threshold: .2 });
  $$('.rv').forEach(e => io.observe(e));
})();
