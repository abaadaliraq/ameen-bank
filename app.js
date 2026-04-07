const sectionsContainer = document.getElementById("sectionsContainer");
const showAllBtn = document.getElementById("showAllBtn");
const closeAllBtn = document.getElementById("closeAllBtn");

function createTable(headers, rows) {
  return `
    <div class="table-wrap">
      <table class="pricing-table">
        <thead>
          <tr>
            <th class="col-no">${headers[0]}</th>
            <th class="col-service">${headers[1]}</th>
            <th class="col-price">${headers[2]}</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => `
            <tr>
              <td class="col-no">${row[0]}</td>
              <td class="col-service">${row[1]}</td>
              <td class="col-price">${row[2].replace(/\n/g, "<br>")}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function createSectionCard(section, index) {
  const article = document.createElement("article");
  article.className = "section-card fade-element";

 article.innerHTML = `
  <button class="section-head" type="button" aria-expanded="false">
    <div class="section-head__right">
      <span class="section-index">${String(index + 1).padStart(2, "0")}</span>

      <div class="section-title-wrap">
        <h3 class="section-title">${section.title}</h3>
        <p class="section-subtitle">${section.subtitle}</p>
      </div>
    </div>

    <span class="toggle-icon">
      <i class="fa-solid fa-chevron-down"></i>
    </span>
  </button>

  <div class="section-body">
    <div class="section-body__inner">
      <div class="section-body__content">
        ${section.tables
          ? section.tables.map(t => `
              <div class="sub-table-block">
                <h4>${t.title}</h4>
                ${createTable(t.headers, t.rows)}
              </div>
            `).join("")
          : createTable(section.headers, section.rows)
        }
      </div>
    </div>
  </div>
`;

  const headBtn = article.querySelector(".section-head");

  headBtn.addEventListener("click", () => {
    const isOpen = article.classList.contains("open");
    article.classList.toggle("open");
    headBtn.setAttribute("aria-expanded", String(!isOpen));
  });

  return article;
}

function renderSections() {
  sectionsContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();

  TABLE_SECTIONS.forEach((section, index) => {
    fragment.appendChild(createSectionCard(section, index));
  });

  sectionsContainer.appendChild(fragment);
  initFadeIn();
}

function openAllSections() {
  document.querySelectorAll(".section-card").forEach((card) => {
    card.classList.add("open");
    const btn = card.querySelector(".section-head");
    if (btn) btn.setAttribute("aria-expanded", "true");
  });
}

function closeAllSections() {
  document.querySelectorAll(".section-card").forEach((card) => {
    card.classList.remove("open");
    const btn = card.querySelector(".section-head");
    if (btn) btn.setAttribute("aria-expanded", "false");
  });
}

function initFadeIn() {
  const elements = document.querySelectorAll(".fade-element");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, {
    threshold: 0.1
  });

  elements.forEach((el) => observer.observe(el));
}

if (showAllBtn) showAllBtn.addEventListener("click", openAllSections);
if (closeAllBtn) closeAllBtn.addEventListener("click", closeAllSections);

renderSections();