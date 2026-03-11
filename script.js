// ===== CURSOR PERSONALIZADO =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.transform = `translate(${followerX - 18}px, ${followerY - 18}px)`;
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .skill-card, .repo, .about-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform += ' scale(1.5)';
    follower.style.opacity = '0.5';
  });
  el.addEventListener('mouseleave', () => {
    follower.style.opacity = '1';
  });
});

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== HAMBURGER MENU =====
function toggleMenu() {
  document.getElementById('nav').classList.toggle('show');
}

// ===== TYPED EFFECT =====
const roles = ['Desarrollador de Software', 'Analista de Datos', 'Estudiante de Ingeniería', 'Apasionado por la tecnología'];
let roleIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function typeEffect() {
  const current = roles[roleIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeEffect, deleting ? 40 : 75);
}
typeEffect();

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== ANIMATE SKILL BARS =====
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.progress span').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

// ===== LANG COLOR MAP =====
const langColors = {
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  HTML: '#e34c26',
  CSS: '#563d7c',
  TypeScript: '#2b7489',
  default: '#7b61ff'
};

// ===== GITHUB REPOS =====
fetch("https://api.github.com/users/AdonisFajardo005/repos?sort=updated&per_page=10")
  .then(res => res.json())
  .then(data => {
    const repos = document.getElementById("repos");
    repos.innerHTML = '';

    const filtered = data.filter(r => !r.fork).slice(0, 6);

    if (filtered.length === 0) {
      repos.innerHTML = '<p style="color:var(--muted);grid-column:1/-1;text-align:center;">No se encontraron repositorios públicos.</p>';
      return;
    }

    filtered.forEach(repo => {
      const langColor = langColors[repo.language] || langColors.default;
      const div = document.createElement("div");
      div.className = "repo";
      div.innerHTML = `
        <div class="repo-icon">📁</div>
        ${repo.language ? `<div class="repo-lang"><span class="repo-lang-dot" style="background:${langColor}"></span>${repo.language}</div>` : ''}
        <h3>${repo.name}</h3>
        <p>${repo.description || "Proyecto de software"}</p>
        <a href="${repo.html_url}" target="_blank">Ver repositorio →</a>
      `;
      repos.appendChild(div);
    });
  })
  .catch(() => {
    document.getElementById("repos").innerHTML =
      '<p style="color:var(--muted);grid-column:1/-1;text-align:center;">No se pudieron cargar los proyectos.</p>';
  });