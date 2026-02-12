(function() {
  'use strict';
  
  /////// 🎯 TYPING EFFECT FOR ROLE TITLES ///////
  const roles = [
    'AI/ML ENGINEER',
    'SOFTWARE ENGINEER',
    'IT ADMINISTRATOR',
    'FULL-STACK DEVELOPER',
    'CYBERSECURITY SPECIALIST'
  ];
  
  let currentRoleIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  const roleElement = document.getElementById('typing-role');
  
  function typeRole() {
    const currentRole = roles[currentRoleIndex];
    
    if (isDeleting) {
      // Deleting characters
      roleElement.textContent = currentRole.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      typingSpeed = 50;
      
      if (currentCharIndex === 0) {
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before typing next role
      }
    } else {
      // Typing characters
      roleElement.textContent = currentRole.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      typingSpeed = 100;
      
      if (currentCharIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end before deleting
      }
    }
    
    setTimeout(typeRole, typingSpeed);
  }
  
  // Start typing effect
  if (roleElement) {
    setTimeout(typeRole, 1000);
  }
  
  /////// 🌠 ULTRA PREMIUM PARTICLE BACKGROUND ///////
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  let particles = [];
  let animationId = null;
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Detect mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
  
  // Check for slow connection (2G, slow-2g, or save-data)
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g' || connection.saveData);
  
  if (prefersReducedMotion || isSlowConnection || (isMobile && window.innerWidth < 480)) {
    // Disable particles on small mobile screens or slow connections for better performance
    canvas.style.display = 'none';
    return;
  }

  function initCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    createParticles();
  }

  function createParticles() {
    particles = [];
    // Reduce particle count on mobile for better performance
    const baseCount = isMobile ? 40 : 160; // Reduced from 60 to 40 for mobile
    const particleCount = Math.min(baseCount, Math.floor(width * height / 12000)); // Increased divisor for fewer particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.9 + 0.7,
        color: `rgba(${70 + Math.floor(Math.random()*120)}, ${170 + Math.floor(Math.random()*85)}, 255, ${Math.random() * 0.5 + 0.3})`
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);
    
    // Deep cosmic gradient
    const grad = ctx.createLinearGradient(0, 0, width*0.3, height);
    grad.addColorStop(0, '#010216');
    grad.addColorStop(0.9, '#0a1422');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    
    // Draw connections (neural web) - skip on very small screens
    if (!isMobile || width >= 480) {
      ctx.lineWidth = 0.5;
      const maxDistance = isMobile ? 100 : 140;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 230, 250, ${0.06 * (1 - dist/160)})`;
            ctx.stroke();
          }
        }
      }
    }

    // Draw particles
    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = isMobile ? 8 : 14;
      ctx.shadowColor = '#00f0ff';
      ctx.fill();
      ctx.shadowBlur = 0;
      
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -0.9;
      if (p.y < 0 || p.y > height) p.vy *= -0.9;
      p.x = Math.max(0, Math.min(width, p.x));
      p.y = Math.max(0, Math.min(height, p.y));
    }
    
    animationId = requestAnimationFrame(drawParticles);
  }

  // Debounce resize handler for better performance
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      initCanvas();
    }, 250);
  });

  initCanvas();
  animationId = requestAnimationFrame(drawParticles);

  /////// REVEAL ON SCROLL (intersection observer) ///////
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optionally unobserve after revealing for better performance
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '20px' });
  
  reveals.forEach(el => observer.observe(el));

  // Subtle mouse influence (throttled for performance)
  let mouseX = 0, mouseY = 0;
  let lastMouseUpdate = 0;
  
  // Only enable mouse influence on desktop
  if (!isMobile) {
    window.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastMouseUpdate < 50) return; // Throttle to ~20fps
      
      lastMouseUpdate = now;
      mouseX = e.clientX / width;
      mouseY = e.clientY / height;
      
      if (particles.length) {
        particles.forEach(p => {
          p.vx += (mouseX - 0.5) * 0.006;
          p.vy += (mouseY - 0.5) * 0.004;
        });
      }
    });
  }
  
  // Pause animation when page is not visible (battery saving)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    } else {
      if (!animationId) {
        animationId = requestAnimationFrame(drawParticles);
      }
    }
  });
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  });
})();
