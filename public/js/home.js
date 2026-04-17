fetch("/data/projects.json")
  .then((r) => r.json())
  .then((projects) => {
    const grid = document.getElementById("projects-grid");
    projects.forEach((p) => {
      grid.insertAdjacentHTML(
        "beforeend",
        `<div class="col s12 m6 l4">
          <div class="card card2 medium">
            <div class="card-image">
              <img src="${p.image}" alt="${p.title}" />
              <span class="card-title">${p.title}</span>
            </div>
            <div class="card-content"><p>${p.description}.</p></div>
            <div class="card-action">
              <a href="${p.link}" class="btn blue" target="_blank" rel="noopener">Explore</a>
              <p class="date">${p.date}</p>
            </div>
          </div>
        </div>`
      );
    });
  });
