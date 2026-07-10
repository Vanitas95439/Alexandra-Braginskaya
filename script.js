const gallery = document.getElementById("gallery");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
});

async function loadGallery() {
  const list = await fetch("gallery.json");
  const ids = await list.json();

  for (const id of ids) {
    const response = await fetch(`data/${id}.json`);
    const work = await response.json();

    const card = document.createElement("div");
    card.className = "work";

    card.innerHTML = `
    <a href="painting.html?id=${id}">
        <img src="img/${id}.jpg" alt="${work.title}">
    </a>

    <h3>${work.title}</h3>
`;

    gallery.appendChild(card);

    observer.observe(card);
  }
  setupMobileGallery();
}

const showMoreBtn = document.getElementById("showMoreBtn");

function setupMobileGallery() {
  if (window.innerWidth > 768) return;

  const works = [...document.querySelectorAll(".work")];

  if (works.length <= 4) return;

  works.slice(4).forEach((work) => {
    work.classList.add("hidden-mobile");
  });

  showMoreBtn.hidden = false;

  let opened = false;

  showMoreBtn.addEventListener("click", () => {
    opened = !opened;

    works.slice(4).forEach((work) => {
      work.classList.toggle("show-work", opened);
    });

    showMoreBtn.textContent = opened ? "Скрыть ▲" : "Показать ещё ▼";
  });
}

loadGallery();

const hero = document.querySelector(".hero");
const background = document.querySelector(".hero-background");
const content = document.querySelector(".hero-content");

// Компьютер
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  hero.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;

    background.style.transform = `translate3d(${-x * 35}px, ${-y * 35}px, 0) scale(1.12)`;

    content.style.transform = `translate3d(${x * 10}px, ${y * 10}px, 0)`;
  });

  hero.addEventListener("mouseleave", () => {
    background.style.transform = "translate3d(0,0,0) scale(1.12)";
    content.style.transform = "translate3d(0,0,0)";
  });
}

// Телефон
else {
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (ticking) return;

    requestAnimationFrame(() => {
      background.style.transform = `translate3d(0, ${window.scrollY * 0.3}px, 0) scale(1.12)`;
      ticking = false;
    });

    ticking = true;
  });
}
