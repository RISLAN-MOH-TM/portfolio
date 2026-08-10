// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Initialize Custom Cursor
const cursor = document.querySelector('.custom-cursor')
const cursorFollower = document.querySelector('.custom-cursor-follower')

if (cursor && cursorFollower) {
  document.addEventListener('mousemove', (e) => {
    // Basic cursor follows exactly
    cursor.style.left = e.clientX + 'px'
    cursor.style.top = e.clientY + 'px'
    
    // Follower has a slight delay/smoothness
    gsap.to(cursorFollower, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: "power2.out"
    })
  })

  // Add hover state for elements with data-cursor="hover"
  const hoverElements = document.querySelectorAll('[data-cursor="hover"]')
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover')
    })
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover')
    })
  })
}

// Magnetic Buttons
const magneticElements = document.querySelectorAll('.magnetic')

magneticElements.forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const position = el.getBoundingClientRect()
    const x = e.clientX - position.left - position.width / 2
    const y = e.clientY - position.top - position.height / 2
    
    gsap.to(el, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.5,
      ease: "power2.out"
    })
  })

  el.addEventListener('mouseleave', () => {
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    })
  })
})

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
  const delay = el.getAttribute('data-delay') || 0
  
  gsap.fromTo(el, 
    { 
      y: 100, 
      opacity: 0 
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: delay,
      scrollTrigger: {
        trigger: el,
        start: "top 85%", // Trigger when top of element hits 85% of viewport height
        toggleActions: "play none none reverse"
      }
    }
  )
})

const revealRightElements = document.querySelectorAll('.gs-reveal-right')
revealRightElements.forEach((el) => {
  const delay = el.getAttribute('data-delay') || 0
  
  gsap.fromTo(el, 
    { 
      x: 100, 
      opacity: 0 
    },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: delay,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
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
  const scrollingUp   = scrollDelta < -SCROLL_THRESHOLD

  // Nav hide/show — all screen sizes
  if (atTop || scrollingUp)   nav.classList.remove('nav-hidden')
  else if (scrollingDown)     nav.classList.add('nav-hidden')

  // Social bar hide/show (desktop + any viewport where it's visible)
  if (socialBar) {
    if (atTop || scrollingUp)   socialBar.classList.remove('social-bar-hidden')
    else if (scrollingDown)     socialBar.classList.add('social-bar-hidden')
  }

  lastScrollY = currentScrollY
})

// ── Typewriter Role Switcher ──────────────────────────────────────
;(function () {
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

  const el        = document.getElementById('roleText')
  if (!el) return

  let roleIndex   = 0
  let charIndex   = 0
  let isDeleting  = false
  const typeSpeed = 80    // ms per character while typing
  const delSpeed  = 45    // ms per character while deleting
  const pauseMs   = 1800  // ms to hold the completed word

  function tick () {
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
        roleIndex  = (roleIndex + 1) % roles.length
        return setTimeout(tick, 400)
      }
      setTimeout(tick, delSpeed)
    }
  }

  setTimeout(tick, 800)
})()
