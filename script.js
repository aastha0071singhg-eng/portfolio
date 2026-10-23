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
  const beyond = document.getElementById('beyond')
  const beyondCols = beyond.querySelectorAll('.beyond-col')
  let ticking = false

  // Beyond: side words start pushed outwards and faded, and slide in as the section scrolls into view
  // (0 when its top enters at the bottom of the screen, 1 once its top reaches the top)
  function updateBeyond() {
    const rect = beyond.getBoundingClientRect()
    const progress = Math.min(Math.max(1 - rect.top / window.innerHeight, 0), 1)
    const scale = window.innerWidth < 768 ? 0.5 : 1
    beyondCols.forEach((col, side) => {
      const direction = side === 0 ? -1 : 1
      col.style.opacity = 0.35 + progress * 0.65
      ;[...col.children].forEach((word, i) => {
        word.style.transform = `translateX(${direction * (60 + i * 40) * scale * (1 - progress)}px)`
      })
    })
  }

  function onScroll() {
    ticking = false
    updateBeyond()
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
  window.addEventListener('resize', updateBeyond)
  onScroll()

  // Beyond: photo tilts towards the mouse and the stacked title layers shift at different depths
  beyond.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return
    const rect = beyond.getBoundingClientRect()
    beyond.style.setProperty('--px', (((event.clientX - rect.left) / rect.width) * 2 - 1).toFixed(3))
    beyond.style.setProperty('--py', (((event.clientY - rect.top) / rect.height) * 2 - 1).toFixed(3))
  })
  beyond.addEventListener('pointerleave', () => {
    beyond.style.setProperty('--px', 0)
    beyond.style.setProperty('--py', 0)
  })

  // Section backgrounds: glow / dot grid follows the cursor (mouse and pen only)
  document.querySelectorAll('.bg-interactive').forEach((section) => {
    section.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch') return
      const rect = section.getBoundingClientRect()
      section.style.setProperty('--bx', `${event.clientX - rect.left}px`)
      section.style.setProperty('--by', `${event.clientY - rect.top}px`)
      section.classList.add('is-hover')
    })
    section.addEventListener('pointerleave', () => section.classList.remove('is-hover'))
  })

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

// ---------- Beyond: side words type themselves out when the section comes into view ----------

function setupTyping() {
  if (reducedMotion.matches) return
  const columns = [...document.querySelectorAll('.beyond-col')].map((col) => [...col.children])
  const words = columns.flat()
  words.forEach((word) => { word.dataset.text = word.textContent })
  let run = 0 // bumped on every enter/leave, so an older typing run stops itself

  function typeWord(word, id) {
    return new Promise((done) => {
      const text = word.dataset.text
      let i = 0
      word.classList.add('is-typing')
      const timer = setInterval(() => {
        if (id === run) word.textContent = text.slice(0, ++i)
        if (id !== run || i >= text.length) {
          clearInterval(timer)
          word.classList.remove('is-typing')
          done()
        }
      }, 70)
    })
  }

  // Row by row; the left and right word of each row type together
  async function typeAll(id) {
    words.forEach((word) => { word.textContent = '' })
    for (let row = 0; row < columns[0].length && id === run; row++) {
      await Promise.all(columns.map((col) => typeWord(col[row], id)))
    }
  }

  new IntersectionObserver(([entry]) => {
    run++
    if (entry.isIntersecting) typeAll(run)
    else words.forEach((word) => { word.textContent = word.dataset.text })
  }, { threshold: 0.35 }).observe(document.getElementById('beyond'))
}

// ---------- Animated counters ----------

function formatCount(value, decimals, prefix, suffix) {
  return prefix + value.toFixed(decimals) + suffix
}

console.assert(formatCount(2.5, 1, '$', 'M+') === '$2.5M+' && formatCount(95, 0, '', '%') === '95%', 'formatCount')

function countUp(el, duration) {
  if (el.dataset.counting) return
  el.dataset.counting = 'yes'
  const target = Number(el.dataset.target)
  const decimals = Number(el.dataset.decimals || 0)
  const prefix = el.dataset.prefix || ''
  const suffix = el.dataset.suffix || ''
  const start = performance.now()

  function frame(now) {
    const progress = duration ? Math.min((now - start) / duration, 1) : 1
    const eased = 1 - Math.pow(1 - progress, 3)
    el.textContent = formatCount(target * eased, decimals, prefix, suffix)
    if (progress < 1) requestAnimationFrame(frame)
    else delete el.dataset.counting
  }
  requestAnimationFrame(frame)
}

// A burst of small orange/gold sparks shot out from the number
function fireSparks(card, number) {
  const box = card.getBoundingClientRect()
  const from = number.getBoundingClientRect()
  const x = from.left - box.left + from.width / 2
  const y = from.top - box.top + from.height / 2
  const colors = ['var(--primary)', 'var(--hero-gold)', 'var(--coral)']

  for (let i = 0; i < 16; i++) {
    const spark = document.createElement('i') // not span: `.counter > span` is position: relative
    spark.className = 'spark'
    spark.style.left = `${x}px`
    spark.style.top = `${y}px`
    spark.style.background = spark.style.color = colors[i % colors.length]
    card.appendChild(spark)
    const angle = (i / 16) * Math.PI * 2 + Math.random() * 0.4
    const distance = 50 + Math.random() * 60
    spark.animate([
      { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
      { transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(0)`, opacity: 0 },
    ], { duration: 700 + Math.random() * 300, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }).onfinish = () => spark.remove()
  }
}

function setupCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      observer.unobserve(entry.target)
      countUp(entry.target, reducedMotion.matches ? 0 : 1600)
    })
  }, { threshold: 0.5 })

  document.querySelectorAll('.counter-value').forEach((element) => observer.observe(element))

  // Hover: count again and fire sparks (mouse only, skipped for reduced motion)
  document.querySelectorAll('.counter').forEach((card) => {
    card.addEventListener('pointerenter', (event) => {
      const number = card.querySelector('.counter-value')
      if (event.pointerType === 'touch' || reducedMotion.matches || number.dataset.counting) return
      countUp(number, 900)
      fireSparks(card, number)
    })
  })
}

// ---------- Start ----------

document.documentElement.classList.add('js')
document.getElementById('year').textContent = new Date().getFullYear()
buildStraps()
buildMosaic()
setupHeroVideo()
setupBadge()
setupDialogs()
setupFadeUps()
setupCounters()
setupMotion()
setupTyping()
