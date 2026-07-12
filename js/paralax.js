const hero = document.querySelector(".hero");

const layers = document.querySelectorAll(".hero-layer img");

const content = document.querySelector(".hero-content");

const speeds = [6, 10, 15, 20];

if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  hero.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;

    layers.forEach((layer, index) => {
      const speed = speeds[index];

      layer.style.transform = `translate(${-x * speed}px, ${-y * speed}px) translateX(-50%)`;
    });

    content.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
  });

  hero.addEventListener("mouseleave", () => {
    layers.forEach((layer) => {
      layer.style.transform = "translateX(-50%)";
    });

    content.style.transform = "translate(0,0)";
  });
}
