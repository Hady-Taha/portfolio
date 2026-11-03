// Main JavaScript for Hady Taha Portfolio

document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS animation if available
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }

  /* -----------------------------------------------------------
     0. Theme Switcher (Dark / Light Mode)
     ----------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlElement = document.documentElement;

  // Sync initial theme
  const savedTheme = localStorage.getItem('hady_theme') || 'dark';
  htmlElement.setAttribute('data-bs-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-bs-theme') || 'dark';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlElement.setAttribute('data-bs-theme', nextTheme);
      localStorage.setItem('hady_theme', nextTheme);
    });
  }

  /* -----------------------------------------------------------
     1. Project Data & Modal Trigger
     ----------------------------------------------------------- */
  const projectsData = {
    'manasa': {
      title: 'Manasa V3 – Educational LMS',
      category: 'Learning Management System',
      image: 'img/project-mockup.jpg',
      description: 'A large-scale educational platform designed to serve students and manage educational services, subscriptions, examinations, and learning-related activities with high-throughput backend architecture.',
      features: [
        'Student management and subscription systems',
        'Educational content and course management',
        'Examination and assessment workflows',
        'Student progress and points tracking',
        'Automated notifications and messaging',
        'Background task processing with Celery & Redis',
        'PostgreSQL database optimization for high concurrency',
        'Real-time communication with Django Channels'
      ],
      technologies: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Celery', 'Django Channels', 'JavaScript']
    },
    'amaan': {
      title: 'Amaan Stream – Video Streaming Platform',
      category: 'Video-on-Demand (VOD) Platform',
      image: 'img/project-smarthome.jpg',
      description: 'A video streaming platform focused on delivering protected video content through a scalable backend architecture, automated transcoding pipelines, and cloud-based storage infrastructure.',
      features: [
        'Automated video upload and FFmpeg processing workflows',
        'HTTP Live Streaming (HLS) multi-bitrate delivery',
        'Video-on-Demand (VOD) architecture',
        'Cloudflare R2 cloud storage integration',
        'CDN-based global video distribution',
        'Video content security and access protection',
        'Multi-tenant customer storage organization',
        'Comprehensive backend REST APIs for media management'
      ],
      technologies: ['Python', 'Django', 'FFmpeg', 'HLS', 'Shaka Player', 'Cloudflare R2', 'AWS']
    },
    'livekit': {
      title: 'Live Streaming Infrastructure',
      category: 'Streaming Infrastructure / WebRTC',
      image: 'img/project-healthtracker.jpg',
      description: 'Modern real-time streaming infrastructure engineered using LiveKit and WebRTC to enable browser and mobile-based live interactive audio and video broadcasting with sub-second latency.',
      features: [
        'Self-hosted LiveKit server deployment and orchestration',
        'WebRTC-based ultra-low latency communication',
        'Real-time media publishing and subscriber management',
        'Ubuntu Linux server optimization and Nginx reverse proxying',
        'Seamless integration architecture with Django backend',
        'High-availability infrastructure engineered for scale'
      ],
      technologies: ['LiveKit', 'WebRTC', 'Docker', 'Ubuntu', 'Nginx', 'AWS']
    },
    'qna': {
      title: 'Educational Q&A Platform',
      category: 'Educational Web Application',
      image: 'img/project-travelhaul.jpg',
      description: 'An interactive educational website developed to help secondary-school students access structured questions and answers, review study materials, and engage with educational content.',
      features: [
        'Student-focused educational content and question library',
        'Interactive question-and-answer functionality',
        'Backend management and structured subject organization',
        'Responsive user interface tailored for all screen sizes',
        'Relational database-driven content management'
      ],
      technologies: ['Python', 'Django', 'PostgreSQL', 'JavaScript', 'Bootstrap 5']
    },
    'ecommerce': {
      title: 'E-Commerce Web Application',
      category: 'E-Commerce Platform',
      image: 'img/img.png',
      description: 'A custom e-commerce web application designed to provide online shopping operations with a robust backend architecture for managing products, carts, transactions, and business logistics.',
      features: [
        'Complete product catalog and inventory management',
        'Database-driven relational architecture with PostgreSQL',
        'Backend transactional business logic and cart validation',
        'Frontend and backend REST API integration',
        'Responsive administrative dashboard and shopping interface'
      ],
      technologies: ['Python', 'Django', 'PostgreSQL', 'JavaScript', 'Bootstrap 5', 'REST API']
    }
  };

  const projectCards = document.querySelectorAll('.project-card');
  const projectModalElement = document.getElementById('projectDetailModal');
  let projectModal = null;
  if (typeof bootstrap !== 'undefined' && projectModalElement) {
    projectModal = new bootstrap.Modal(projectModalElement);
  }

  projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = card.getAttribute('data-project-id');
      const project = projectsData[projectId];
      if (!project) return;

      document.getElementById('modalProjectTitle').textContent = project.title;
      document.getElementById('modalProjectCategory').textContent = project.category;
      document.getElementById('modalProjectDesc').textContent = project.description;
      document.getElementById('modalProjectImg').src = project.image;
      document.getElementById('modalProjectImg').alt = project.title;

      // Render Features
      const featuresList = document.getElementById('modalProjectFeatures');
      featuresList.innerHTML = project.features
        .map(feat => `<li><i class="bi bi-check2-circle text-primary me-2"></i><span>${feat}</span></li>`)
        .join('');

      // Render Technologies
      const tagsContainer = document.getElementById('modalProjectTags');
      tagsContainer.innerHTML = project.technologies
        .map(tech => `<span class="skill-pill featured">${tech}</span>`)
        .join('');

      if (projectModal) {
        projectModal.show();
      }
    });
  });

  /* -----------------------------------------------------------
     2. Contact Form Submission with Toastify
     ----------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const messageInput = document.getElementById('contactMessage');

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const messageVal = messageInput ? messageInput.value.trim() : '';

      if (!nameVal || !emailVal || !messageVal) {
        if (typeof Toastify !== 'undefined') {
          Toastify({
            text: '⚠️ Please fill in all fields before sending.',
            duration: 3500,
            gravity: 'bottom',
            position: 'right',
            style: {
              background: '#b91c1c',
              color: '#ffffff',
              borderRadius: '8px'
            }
          }).showToast();
        } else {
          alert('Please fill in all fields before sending.');
        }
        return;
      }

      // Success Notification
      if (typeof Toastify !== 'undefined') {
        Toastify({
          text: `✨ Thank you, ${nameVal}! Your message has been received. Hady will get back to you soon.`,
          duration: 5000,
          gravity: 'bottom',
          position: 'right',
          style: {
            background: '#10b981',
            color: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)'
          }
        }).showToast();
      } else {
        alert(`Thank you, ${nameVal}! Your message has been sent.`);
      }

      contactForm.reset();
    });
  }

  /* -----------------------------------------------------------
     3. Scroll to Top Floating Button
     ----------------------------------------------------------- */
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* -----------------------------------------------------------
     4. Active Navbar Link on Scroll
     ----------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu-link');

  window.addEventListener('scroll', () => {
    let currentSection = '';
    const scrollPos = window.scrollY + 180;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
});
