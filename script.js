const works = document.querySelectorAll(".work");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

works.forEach((work) => {
  observer.observe(work);
});
