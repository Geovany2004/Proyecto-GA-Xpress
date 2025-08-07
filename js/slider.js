document.addEventListener("DOMContentLoaded", function () {
  const slidesAlt = document.getElementById("slidesAlt");
  const paginationAlt = document.getElementById("paginationAlt");
  const slideItems = document.querySelectorAll(".slide-alt");
  const totalSlidesAlt = slideItems.length;
  let currentIndexAlt = 0;
  let autoplayAlt;

  // Crear puntos de paginación
  for (let i = 0; i < totalSlidesAlt; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndexAlt = i;
      updateSlidePositionAlt();
      resetAutoplayAlt();
    });
    paginationAlt.appendChild(dot);
  }

  function updateSlidePositionAlt() {
    slidesAlt.style.transform = `translateX(-${currentIndexAlt * 100}%)`;
    updatePaginationAlt();
  }

  function moveSlideAlt(direction) {
    currentIndexAlt = (currentIndexAlt + direction + totalSlidesAlt) % totalSlidesAlt;
    updateSlidePositionAlt();
    resetAutoplayAlt();
  }

  function updatePaginationAlt() {
    const dots = paginationAlt.children;
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.toggle("active", i === currentIndexAlt);
    }
  }

  function startAutoplayAlt() {
    autoplayAlt = setInterval(() => moveSlideAlt(1), 5000);
  }

  function resetAutoplayAlt() {
    clearInterval(autoplayAlt);
    startAutoplayAlt();
  }

  // Manejar botones (ahora usando JS en lugar de inline HTML)
  const prevButton = document.querySelector(".prev-alt");
  const nextButton = document.querySelector(".next-alt");

  if (prevButton && nextButton) {
    prevButton.addEventListener("click", () => moveSlideAlt(-1));
    nextButton.addEventListener("click", () => moveSlideAlt(1));
  }

  // Recalcular al redimensionar
  window.addEventListener("resize", updateSlidePositionAlt);

  // Inicializar
  updateSlidePositionAlt();
  startAutoplayAlt();
});