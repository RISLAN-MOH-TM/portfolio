(function() {
  'use strict';
  
  /////// 🌌 3D WIREFRAME SPHERE BACKGROUND ///////
  const container = document.getElementById('canvas-container');
  if (container && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Create wireframe sphere
    const sphereGeometry = new THREE.IcosahedronGeometry(2, 1);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    
    // Create inner sphere
    const innerSphereGeometry = new THREE.IcosahedronGeometry(1, 1);
    const innerSphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xbc13fe,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const innerSphere = new THREE.Mesh(innerSphereGeometry, innerSphereMaterial);
    scene.add(innerSphere);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: 0x00f7ff,
      transparent: true,
      opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 5;
    
    // Animation
    function animate() {
      requestAnimationFrame(animate);
      
      sphere.rotation.x += 0.001;
      sphere.rotation.y += 0.002;
      
      innerSphere.rotation.x -= 0.002;
      innerSphere.rotation.y -= 0.001;
      
      particlesMesh.rotation.y += 0.0005;
      
      renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
  
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
})();
