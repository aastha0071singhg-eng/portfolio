// ---------- Content ----------

const capabilities = [
  'Project Planning & Delivery',
  'Cross-functional Team Coordination',
  'Product Strategy & Execution',
  'Quality Assurance & Testing',
  'Risk & Dependency Management',
  'From Brief to Launch',
]

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

// ---------- Hero video: one click control for sound and play/pause ----------

function setupHeroVideo() {
  const video = document.getElementById('hero-video')
  const hit = document.getElementById('hero-video-hit')
  let startedByUser = false

  function showPaused() {
    hit.classList.toggle('is-paused', video.paused)
    hit.classList.toggle('is-muted', video.muted)
    const label = video.paused ? 'Play video with sound' : video.muted ? 'Turn on video sound' : 'Pause video'
    hit.setAttribute('aria-label', label)
  }

  function play() {
    startedByUser = true
    video.play().catch(showPaused)
  }

  // Respect "reduce motion": keep the video paused unless the visitor presses play
  function applyReducedMotion() {
    if (reducedMotion.matches) {
      startedByUser = false
      video.pause()
    }
    showPaused()
  }

  video.addEventListener('play', () => {
    if (reducedMotion.matches && !startedByUser) video.pause()
    showPaused()
  })
  video.addEventListener('pause', showPaused)
  video.addEventListener('volumechange', showPaused)

  // Browsers only allow sound after a click, so the video autoplays muted:
  // muted → sound on → paused → playing with sound
  hit.addEventListener('click', () => {
    if (video.paused) {
      video.muted = false
      play()
    } else if (video.muted) {
      video.muted = false
    } else {
      video.pause()
    }
  })

  applyReducedMotion()
  reducedMotion.addEventListener('change', applyReducedMotion)
}

// ---------- Skill straps ----------

function buildStraps() {
  const asterisk = '<svg class="icon" width="18" height="18"><use href="#i-asterisk" /></svg>'
  const items = [...capabilities, ...capabilities]
    .map((item) => `<span class="strap-item">${item}${asterisk}</span>`)
    .join('')

  document.querySelectorAll('.strap-track').forEach((track) => {
    track.innerHTML = items
  })
}

// ---------- ID card: tilt with the mouse, flip on hover or click ----------

function setupBadge() {
  const badge = document.getElementById('badge')
  const card = document.getElementById('id-card')
  const front = card.querySelector('.id-front')
  const back = card.querySelector('.id-back')
  let clickedFlip = false
  let hovering = false

  function render() {
    const flipped = clickedFlip !== hovering
    card.classList.toggle('flipped', flipped)
    badge.setAttribute('aria-pressed', String(flipped))
    front.setAttribute('aria-hidden', String(flipped))
    back.setAttribute('aria-hidden', String(!flipped))
  }

  badge.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'touch') return
    hovering = true
    render()
  })

  badge.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch' || reducedMotion.matches) return
    const rect = badge.getBoundingClientRect()
    card.style.setProperty('--rx', `${-(event.clientY - rect.top - rect.height / 2) / 35}deg`)
    card.style.setProperty('--ry', `${(event.clientX - rect.left - rect.width / 2) / 35}deg`)
  })

  badge.addEventListener('pointerleave', () => {
    hovering = false
    card.style.setProperty('--rx', '0deg')
    card.style.setProperty('--ry', '0deg')
    render()
  })

  badge.addEventListener('click', () => {
    clickedFlip = !(clickedFlip !== hovering)
    hovering = false
    render()
  })
}

// ---------- Pop-up dialogs ----------

function setupDialogs() {
  document.querySelectorAll('[data-open-dialog]').forEach((button) => {
    const dialog = document.getElementById(button.dataset.openDialog)
    button.addEventListener('click', () => dialog.showModal())
  })

  document.querySelectorAll('dialog').forEach((dialog) => {
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close())
    // Close when clicking the dark backdrop outside the box
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return
      const box = dialog.getBoundingClientRect()
      const outside = event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom
      if (outside) dialog.close()
    })
  })
}

// ---------- Projects mosaic ----------

// Projects shown in the mosaic (edit titles/tags freely; images live in assets/projects/)
const projects = [
  { title: 'P/S Golf', tag: 'Golf coaching · Mobile app', img: 'ps-golf.jpg' },
  { title: 'Unbrako', tag: 'B2B e-commerce · Web & mobile', img: 'unbrako.jpg' },
  { title: 'Prostate Cure', tag: 'Healthcare · Mobile app', img: 'prostate-cure.jpg' },
  { title: 'Sawalif', tag: 'Social game · Mobile app', img: 'sawalif.jpg' },
  { title: 'FirstPaw', tag: 'Pet care · Web & mobile', img: 'firstpaw.jpg' },
  { title: 'No Food Waste', tag: 'AI recipes · Web & mobile', img: 'no-food-waste.jpg' },
  { title: 'Fascinate', tag: 'Party booking · Web', img: 'fascinate.jpg' },
  { title: 'Order Manager', tag: 'Restaurant orders · Android', img: 'orders.jpg' },
  { title: 'Plant Care', tag: 'Plant care · Mobile app', img: 'plant-care.jpg' },
  { title: 'GoDash', tag: 'Delivery tracking · Mobile app', img: 'godash.jpg' },
  { title: 'Smart Shipping', tag: 'Logistics · Mobile app', img: 'smart-shipping.jpg' },
  { title: 'New Ace Properties', tag: 'Real estate · Website', img: 'new-ace-properties.jpg' },
]

// 3 columns × 5 tiles, all projects; the list repeats from the start once it runs out
const TILES_PER_COLUMN = 5

function buildMosaic() {
  let next = 0

  function cell() {
    const project = projects[next % projects.length]
    const number = String((next++ % projects.length) + 1).padStart(2, '0')
    return `<div class="tile t-photo"><img src="assets/projects/${project.img}" alt="" />
      <span class="tile-caption"><small>${number} · ${project.tag}</small><strong>${project.title}</strong></span></div>`
  }

  document.querySelectorAll('.mosaic-col').forEach((col) => {
    const html = Array.from({ length: TILES_PER_COLUMN }, cell).join('')
    col.innerHTML = html + html // twice, so the scroll animation loops without a jump
  })

  // The mosaic is decorative, so screen readers get the same projects as a plain list
  document.getElementById('project-list').innerHTML = projects
    .map((project) => `<li>${project.title}: ${project.tag}</li>`)
    .join('')
}

// ---------- Fade up on scroll ----------

function setupFadeUps() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    })
  }, { threshold: 0.15 })

  document.querySelectorAll('.fade-up, .wipe, .identity-scene').forEach((element) => observer.observe(element))
}

// ---------- Pointer & scroll effects ----------

function setupMotion() {
  if (reducedMotion.matches) return

  // Hero video drifts slower than the page; skill ribbons slide sideways
  const heroMedia = document.querySelector('.hero-media')
  const straps = document.querySelector('.straps')
  let ticking = false

  function onScroll() {
    ticking = false
    const y = window.scrollY
    if (y < window.innerHeight * 1.5) heroMedia.style.translate = `0 ${y * 0.25}px`
    const rect = straps.getBoundingClientRect()
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      // 0 → 1 while the ribbons cross the screen; max shift (6vw) stays inside their 15% overhang
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      straps.style.setProperty('--shift', (progress * window.innerWidth * 0.06).toFixed(1))
    }
  }

  window.addEventListener('scroll', () => {
    if (!ticking) requestAnimationFrame(onScroll)
    ticking = true
  }, { passive: true })
  onScroll()

  // Counter cards: glow follows the cursor
  document.querySelectorAll('.counter').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`)
      card.style.setProperty('--my', `${event.clientY - rect.top}px`)
    })
  })

  // Contact button: pulled towards the cursor
  const magnet = document.querySelector('.contact-circle')
  const zone = document.querySelector('.contact-layout')
  zone.addEventListener('pointermove', (event) => {
    const rect = magnet.getBoundingClientRect()
    const dx = event.clientX - (rect.left + rect.width / 2)
    const dy = event.clientY - (rect.top + rect.height / 2)
    const near = Math.hypot(dx, dy) < 220
    magnet.style.translate = near ? `${dx * 0.3}px ${dy * 0.3}px` : '0 0'
  })
  zone.addEventListener('pointerleave', () => { magnet.style.translate = '0 0' })
}

// ---------- Animated counters ----------

function formatCount(value, decimals, prefix, suffix) {
  return prefix + value.toFixed(decimals) + suffix
}

console.assert(formatCount(2.5, 1, '$', 'M+') === '$2.5M+' && formatCount(95, 0, '', '%') === '95%', 'formatCount')

function setupCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      observer.unobserve(entry.target)
      const el = entry.target
      const target = Number(el.dataset.target)
      const decimals = Number(el.dataset.decimals || 0)
      const prefix = el.dataset.prefix || ''
      const suffix = el.dataset.suffix || ''
      const duration = reducedMotion.matches ? 0 : 1600
      const start = performance.now()

      function frame(now) {
        const progress = duration ? Math.min((now - start) / duration, 1) : 1
        const eased = 1 - Math.pow(1 - progress, 3)
        el.textContent = formatCount(target * eased, decimals, prefix, suffix)
        if (progress < 1) requestAnimationFrame(frame)
      }
      requestAnimationFrame(frame)
    })
  }, { threshold: 0.5 })

  document.querySelectorAll('.counter-value').forEach((element) => observer.observe(element))
}

// ---------- Start ----------

document.documentElement.classList.add('js')
buildStraps()
buildMosaic()
setupHeroVideo()
setupBadge()
setupDialogs()
setupFadeUps()
setupCounters()
setupMotion()
