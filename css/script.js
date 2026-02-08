/* =======================================================
   KIBIKO ICT CLUB – SLIDER & NAVIGATION SCRIPT
======================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ------------------------------
     ACTIVE NAV LINK
  ------------------------------- */
  const page = window.location.pathname.split("/").pop();
  document.querySelectorAll("nav a").forEach(link => {
    if (link.getAttribute("href") === page) {
      link.style.textDecoration = "underline";
      link.style.fontWeight = "600";
    }
  });

  /* ------------------------------
     CONFIRM DOWNLOAD ACTION
  ------------------------------- */
  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', function (e) {
      if (this.href.match(/\.(pdf|docx|ppt|pptx)$/i)) {
        const ok = confirm("You are about to download a learning material. Continue?");
        if (!ok) e.preventDefault();
      }
    });
  });

  /* ==============================
     WALL OF FAME SLIDER
  =============================== */
  const slider = document.querySelector(".fame-slider");
  const track = document.querySelector(".fame-track");
  const slides = Array.from(track.children);
  const nextBtn = document.querySelector(".slider-btn.next");
  const prevBtn = document.querySelector(".slider-btn.prev");

  if (!slider || !track || slides.length === 0) return;

  let currentIndex = 0;
  let slideWidth = slides[0].getBoundingClientRect().width;
  let autoSlideInterval;
  const autoSlideDelay = 5000; // 5 seconds

  /* ------------------------------
     Move to slide function
  ------------------------------- */
  function moveToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, slides.length - 1));
    track.style.transform = `translateX(-${currentIndex * (slideWidth + 16)}px)`; // 16px = gap
  }

  /* ------------------------------
     Buttons
  ------------------------------- */
  nextBtn.addEventListener("click", () => {
    if (currentIndex < slides.length - 1) {
      moveToSlide(currentIndex + 1);
    } else {
      moveToSlide(0); // Loop back to first
    }
    resetAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      moveToSlide(currentIndex - 1);
    } else {
      moveToSlide(slides.length - 1); // Loop to last
    }
    resetAutoSlide();
  });

  /* ------------------------------
     Touch / Swipe Support
  ------------------------------- */
  let startX = 0;
  let isDragging = false;

  track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  track.addEventListener("touchmove", e => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    track.style.transform = `translateX(-${currentIndex * (slideWidth + 16) + diff}px)`;
  });

  track.addEventListener("touchend", e => {
    if (!isDragging) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50 && currentIndex < slides.length - 1) moveToSlide(currentIndex + 1);
    else if (diff < -50 && currentIndex > 0) moveToSlide(currentIndex - 1);

    isDragging = false;
    resetAutoSlide();
  });

  /* ------------------------------
     Auto Slide
  ------------------------------- */
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      if (currentIndex < slides.length - 1) moveToSlide(currentIndex + 1);
      else moveToSlide(0);
    }, autoSlideDelay);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  /* ------------------------------
     Resize Handling
  ------------------------------- */
  window.addEventListener("resize", () => {
    slideWidth = slides[0].getBoundingClientRect().width;
    moveToSlide(currentIndex);
  });

  /* ------------------------------
     Initialize
  ------------------------------- */
  track.style.display = "flex";
  track.style.transition = "transform 0.4s ease";
  moveToSlide(currentIndex);
  startAutoSlide();

});