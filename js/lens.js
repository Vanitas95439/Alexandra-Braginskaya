const container = document.querySelector(".painting-image");
const img = document.getElementById("paintingImage");
const lens = document.querySelector(".lens");

const zoom = 2;

img.onload = () => {
  lens.style.backgroundImage = `url(${img.src})`;
  lens.style.backgroundSize = `${img.width * zoom}px ${img.height * zoom}px`;
};

img.addEventListener("mouseenter", () => {
  if (window.innerWidth <= 900) {
    return;
  }
  lens.style.display = "block";
});

img.addEventListener("mouseleave", () => {
  lens.style.display = "none";
});

img.addEventListener("mousemove", (e) => {
  const rect = img.getBoundingClientRect();

  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  const lensSize = lens.offsetWidth;
  const halfLens = lensSize / 2;

  const right = rect.width - halfLens;
  const bottom = rect.height - halfLens;

  let lensX = x;
  let lensY = y;

  // Ограничиваем центр лупы
  lensX = Math.max(halfLens, Math.min(lensX, right));
  lensY = Math.max(halfLens, Math.min(lensY, bottom));

  // Позиция самой лупы
  lens.style.left = lensX - halfLens + "px";
  lens.style.top = lensY - halfLens + "px";

  // Смещение увеличенного изображения
  const bgWidth = img.width * zoom;
  const bgHeight = img.height * zoom;

  let bgX = x * zoom - halfLens;
  let bgY = y * zoom - halfLens;

  // Ограничиваем фон, а не положение лупы
  bgX = Math.max(0, Math.min(bgX, bgWidth - lensSize));
  bgY = Math.max(0, Math.min(bgY, bgHeight - lensSize));

  lens.style.backgroundPosition = `-${bgX}px -${bgY}px`;
});
