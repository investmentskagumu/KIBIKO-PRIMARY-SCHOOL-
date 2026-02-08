document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".fame-slider");
  const track = document.querySelector(".fame-track");
  const slides = document.querySelectorAll(".fame-card, .principal-card");
  const nextBtn = document.querySelector(".slider-btn.next");
  const prevBtn = document.querySelector(".slider-btn.prev");

  if (!slider || !track || slides.length === 0) return;

  let currentIndex = 0;
  let slideWidth = slides[0].getBoundingClientRect().width;
  let autoSlideInterval;
  let startX = 0;
  let endX = 0;
  let isDragging = false;

  /* ===== CORE SLIDE MOVE ===== */
  function moveToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, slides.length - 1));
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  /* ===== UPDATE ON RESIZE ===== */
  function updateWidth() {
    slideWidth = slides[0].getBoundingClientRect().width;
    moveToSlide(currentIndex);
  }

  /* ===== BUTTON CONTROLS ===== */
  nextBtn.addEventListener("click", () => {
    moveToSlide(currentIndex + 1);
    restartAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    moveToSlide(currentIndex - 1);
    restartAutoSlide();
  });

  /* ===== TOUCH SWIPE ===== */
  track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  track.addEventListener("touchmove", e => {
    if (!isDragging) return;
    endX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", () => {
    if (!isDragging) return;
    const diff = startX - endX;

    if (diff > 50) moveToSlide(currentIndex + 1);
    if (diff < -50) moveToSlide(currentIndex - 1);

    isDragging = false;
    restartAutoSlide();
  });

  /* ===== AUTO SLIDE ===== */
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      moveToSlide(
        currentIndex < slides.length - 1 ? currentIndex + 1 : 0
      );
    }, 4500);
  }

  function restartAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  slider.addEventListener("mouseenter", () => clearInterval(autoSlideInterval));
  slider.addEventListener("mouseleave", startAutoSlide);

  /* ===== INIT ===== */
  track.style.display = "flex";
  track.style.transition = "transform 0.45s ease";
  updateWidth();
  startAutoSlide();

  window.addEventListener("resize", updateWidth);
});
nextBtn.addEventListener("click", () => moveToSlide(currentIndex + 1));
prevBtn.addEventListener("click", () => moveToSlide(currentIndex - 1));