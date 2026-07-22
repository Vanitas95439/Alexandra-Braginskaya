const hero = document.querySelector(".hero");
const layers = document.querySelectorAll(".hero-layer img");
const content = document.querySelector(".hero-content");

if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  hero.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;

    layers.forEach((layer) => {
      const speed = parseFloat(
        getComputedStyle(layer).getPropertyValue("--speed"),
      );

      const baseY = getComputedStyle(layer).getPropertyValue("--base-y");

      layer.style.transform = `translate(
          calc(-50% + ${-x * speed}px),
          calc(${baseY} + ${-y * speed}px)
        )`;
    });

    content.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
  });

  hero.addEventListener("mouseleave", () => {
    layers.forEach((layer) => {
      const baseY = getComputedStyle(layer).getPropertyValue("--base-y");

      layer.style.transform = `translate(-50%, ${baseY})`;
    });

    content.style.transform = "translate(0,0)";
  });
}
