/* ======================================================
   Kibiko Primary School Website Script
   Purpose: Navigation UX + Downloads Handling
   Author: ICT Club
====================================================== */

/* ------------------------------
   ACTIVE NAV LINK
--------------------------------*/
(function () {
  const page = window.location.pathname.split("/").pop();
  document.querySelectorAll("nav a").forEach(link => {
    if (link.getAttribute("href") === page) {
      link.style.textDecoration = "underline";
      link.style.fontWeight = "600";
    }
  });
})();

/* ------------------------------
   CONFIRM DOWNLOAD ACTION
--------------------------------*/
document.querySelectorAll('a[href]').forEach(link => {
  link.addEventListener('click', function (e) {
    if (
      this.href.includes('.pdf') ||
      this.href.includes('.docx') ||
      this.href.includes('.ppt') ||
      this.href.includes('.pptx')
    ) {
      const ok = confirm(
        "You are about to download a learning material. Do you want to continue?"
      );
      if (!ok) e.preventDefault();
    }
  });
});

/* ------------------------------
   SIMPLE DOWNLOAD SEARCH
   (Use later if search input added)
--------------------------------*/
function filterMaterials(keyword) {
  const cards = document.querySelectorAll(".card");
  keyword = keyword.toLowerCase();

  cards.forEach(card => {
    const content = card.textContent.toLowerCase();
    card.style.display = content.includes(keyword) ? "block" : "none";
  });
}

/* ------------------------------
   ADMIN CONSOLE MESSAGE
--------------------------------*/
console.log(
  "Kibiko Primary School Website Loaded | ICT Club & Learning Portal"
);
