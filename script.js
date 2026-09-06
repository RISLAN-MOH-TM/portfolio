// ── Hamburger / Mobile Nav Overlay ──────────────────────────────────
(function () {
  const hamburger = document.getElementById('hamburger')
  const mobileNav = document.getElementById('mobileNav')
  if (!hamburger || !mobileNav) return

  function openNav () {
    hamburger.classList.add('is-open')
    hamburger.setAttribute('aria-expanded', 'true')
    mobileNav.classList.add('is-open')
    document.body.style.overflow = 'hidden'
  }

  function closeNav () {
    hamburger.classList.remove('is-open')
    hamburger.setAttribute('aria-expanded', 'false')
    mobileNav.classList.remove('is-open')
    document.body.style.overflow = ''
  }

  hamburger.addEventListener('click', () => {
    if (hamburger.classList.contains('is-open')) closeNav()
    else openNav()
  })

  // Close on any mobile nav link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeNav()
    })
  })

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeNav()
  })
})()

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: true,
  touchMultiplier: 2,
  infinite: false,
})

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Connect Lenis to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

// Anchor links smooth scroll with Lenis
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href')
    if (href && href !== '#') {
      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()
        lenis.scrollTo(target)
      }
    }
  })
})

// Magnetic Buttons — desktop (mouse) only
const isTouchDevice = window.matchMedia('(hover: none)').matches

const magneticElements = document.querySelectorAll('.magnetic')

// GSAP Animations

// Hero Parallax & Reveal
gsap.to('.hero-bg-text', {
  yPercent: 30,
  ease: "none",
  scrollTrigger: {
    trigger: '.hero',
    start: "top top",
    end: "bottom top",
    scrub: true
  }
})

// Scroll Reveal Animations
const revealUpElements = document.querySelectorAll('.gs-reveal-up')
revealUpElements.forEach((el) => {
  const delay = parseFloat(el.getAttribute('data-delay') || 0)

  gsap.fromTo(el,
    {
      y: 60,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.4,
      ease: "power4.out",
      delay: delay,
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    }
  )
})

const revealRightElements = document.querySelectorAll('.gs-reveal-right')
revealRightElements.forEach((el) => {
  const delay = parseFloat(el.getAttribute('data-delay') || 0)

  gsap.fromTo(el,
    {
      x: 80,
      opacity: 0
    },
    {
      x: 0,
      opacity: 1,
      duration: 1.4,
      ease: "power4.out",
      delay: delay,
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    }
  )
})

// Staggered entrance for skill tags inside cards
document.querySelectorAll('.skill-card, .edu-card, .experience-card').forEach((card) => {
  const tags = card.querySelectorAll('.skill-tag')
  if (!tags.length) return
  gsap.fromTo(tags,
    { y: 14, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.07,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
        toggleActions: "play none none reverse"
      }
    }
  )
})

// Staggered entrance for project skill tags
document.querySelectorAll('.project-card-full').forEach((card) => {
  const tags = card.querySelectorAll('.skill-tags .skill-tag')
  if (!tags.length) return
  gsap.fromTo(tags,
    { scale: 0.85, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.45,
      stagger: 0.05,
      ease: "back.out(1.4)",
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
        toggleActions: "play none none reverse"
      }
    }
  )
})

// Navigation blur on scroll + hide-on-scroll (nav & social bar)
const nav = document.querySelector('.nav-container')
const socialBar = document.getElementById('socialBar')
let lastScrollY = window.scrollY
const SCROLL_THRESHOLD = 5 // px — prevents jitter on tiny scrolls

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY
  const scrollDelta = currentScrollY - lastScrollY

  // ── Desktop: darken nav background on scroll ──
  if (currentScrollY > 50) {
    nav.style.background = 'rgba(9, 9, 9, 0.8)'
    nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)'
  } else {
    nav.style.background = 'rgba(9, 9, 9, 0.6)'
    nav.style.boxShadow = 'none'
  }

  // ── Shared: hide on scroll down, show on scroll up (nav + social bar) ──
  const atTop = currentScrollY <= 60
  const scrollingDown = scrollDelta > SCROLL_THRESHOLD
  const scrollingUp = scrollDelta < -SCROLL_THRESHOLD

  // Nav hide/show — all screen sizes
  if (atTop || scrollingUp) nav.classList.remove('nav-hidden')
  else if (scrollingDown) nav.classList.add('nav-hidden')

  // Social bar hide/show (desktop + any viewport where it's visible)
  if (socialBar) {
    if (atTop || scrollingUp) socialBar.classList.remove('social-bar-hidden')
    else if (scrollingDown) socialBar.classList.add('social-bar-hidden')
  }

  lastScrollY = currentScrollY
})

  // ── Typewriter Role Switcher ──────────────────────────────────────
  ; (function () {
    const roles = [
      'Software Engineer',
      'AI/ML Engineer',
      'Full-Stack Developer',
      'Data Scientist',
      'Data Analyst',
      'IoT Systems Developer',
      'Cybersecurity Enthusiast',
      'Cloud Solutions Architect',
      'Machine Learning Specialist',
    ]

    const el = document.getElementById('roleText')
    if (!el) return

    let roleIndex = 0
    let charIndex = 0
    let isDeleting = false
    const typeSpeed = 80    // ms per character while typing
    const delSpeed = 45    // ms per character while deleting
    const pauseMs = 1800  // ms to hold the completed word

    function tick() {
      const current = roles[roleIndex]

      if (!isDeleting) {
        charIndex++
        el.textContent = current.slice(0, charIndex)

        if (charIndex === current.length) {
          isDeleting = true
          return setTimeout(tick, pauseMs)
        }
        setTimeout(tick, typeSpeed)
      } else {
        charIndex--
        el.textContent = current.slice(0, charIndex)

        if (charIndex === 0) {
          isDeleting = false
          roleIndex = (roleIndex + 1) % roles.length
          return setTimeout(tick, 400)
        }
        setTimeout(tick, delSpeed)
      }
    }

    setTimeout(tick, 800)
  })()

  // ── Project Read More / Show Less Toggle ──────────────────────────
  document.querySelectorAll('.btn-read-more').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.project-card-full')
      if (!card) return
      const collapseWrapper = card.querySelector('.project-details-collapse')
      if (!collapseWrapper) return

      const isExpanded = collapseWrapper.classList.toggle('is-expanded')
      btn.classList.toggle('is-active', isExpanded)
      btn.setAttribute('aria-expanded', isExpanded)

      const textSpan = btn.querySelector('.btn-text')
      if (textSpan) {
        textSpan.textContent = isExpanded ? 'Show Less' : 'Read More'
      }

      // Refresh ScrollTrigger and Lenis smooth scrolling bounds
      setTimeout(() => {
        ScrollTrigger.refresh()
        if (typeof lenis !== 'undefined' && lenis) {
          lenis.resize()
        }
      }, 150)

      // When collapsing, scroll back to project card top if it has scrolled out of view
      if (!isExpanded) {
        const cardRect = card.getBoundingClientRect()
        if (cardRect.top < 80) {
          if (typeof lenis !== 'undefined' && lenis) {
            lenis.scrollTo(card, { offset: -90, duration: 0.8 })
          } else {
            card.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }
      }
    })
  })
