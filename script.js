const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');

if (document.body.classList.contains('dark-theme')) {
    themeToggle.src = "cchange-dark.png";
} else {
    themeToggle.src = "cchange.png";
}
});


function enableIndependentDrag(row) {
  let isDragging = false;
  let startX;
  let currentX = 0;
  let prevX = 0;
  let maxScroll;

  const container = row.parentElement;

  const updateMaxScroll = () => {
    maxScroll = row.scrollWidth - container.offsetWidth;
  };

  updateMaxScroll();
  window.addEventListener('resize', updateMaxScroll);

  row.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    row.style.transition = 'none';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const dx = e.clientX - startX;
    currentX = prevX + dx;
    row.style.transform = `translateX(${currentX}px)`;
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;

    if (currentX > 0) {
      currentX = 0;
    } else if (Math.abs(currentX) > maxScroll) {
      currentX = -maxScroll;
    }

    prevX = currentX;
    row.style.transition = 'transform 0.3s ease';
    row.style.transform = `translateX(${currentX}px)`;
  });

  // Отключаем стандартный drag изображений
  row.querySelectorAll('img').forEach(el => {
    el.addEventListener('dragstart', e => e.preventDefault());
  });
}

enableIndependentDrag(document.getElementById('drag-top'));
enableIndependentDrag(document.getElementById('drag-bottom'));


document.addEventListener('DOMContentLoaded', () => {
  const dateElements = document.querySelectorAll('.date.clickable');

  dateElements.forEach(date => {
    date.addEventListener('click', () => {
      const container = date.closest('.date-container');
      const highlight = container.querySelector('.highlight');

      if (highlight.classList.contains('open')) {
        highlight.style.maxHeight = '0px';
        highlight.style.opacity = '0';
        highlight.classList.remove('open');
      } else {
        highlight.style.maxHeight = highlight.scrollHeight + 'px';
        highlight.style.opacity = '1';
        highlight.classList.add('open');
      }
    });
  });
});


const carousel = document.getElementById('teamCarousel');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      carousel.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
    });
  },
  { threshold: 0.2 }
);

observer.observe(carousel);

document.addEventListener("DOMContentLoaded", function () {
  const faqBubbles = document.querySelectorAll(".faq-bubble");

  faqBubbles.forEach((bubble) => {
    const question = bubble.querySelector(".cloud-question");
    const answer = bubble.querySelector(".cloud-answer");

    // Изначально класс не установлен — скрыто по CSS

    question.addEventListener("click", () => {
      answer.classList.toggle("show");
    });
  });
});

function smoothScrollTo(targetY, duration = 500) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  const startTime = performance.now();

  function step(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    window.scrollTo(0, startY + diff * ease);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

document.addEventListener("DOMContentLoaded", function () {
  const OFFSET = 80;

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      const targetId = href.substring(1);
      const target = document.getElementById(targetId);

      if (target) {
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.pageYOffset - OFFSET;
        smoothScrollTo(y, 600); // длительность 600 мс
      }
    });
  });
});