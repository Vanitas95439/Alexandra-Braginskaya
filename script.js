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
}

loadGallery();
