fetch("/data/projects.json")
  .then((r) => {
    if (!r.ok) throw new Error(`Failed to load projects (${r.status})`);
    return r.json();
  })
  .then((projects) => {
    const grid = document.getElementById("projects-grid");
    projects.forEach((p) => {
      const repositoryLink = p.repository
        ? ` <a href="${p.repository}" target="_blank" rel="noopener">${p.repositoryText}</a>`
        : "";

      grid.insertAdjacentHTML(
        "beforeend",
        `<div class="col s12 m6 l4">
          <div class="card card2 medium">
            <div class="card-image">
              <img src="${p.image}" alt="${p.title}" />
              <span class="card-title">${p.title}</span>
            </div>
            <div class="card-content"><p>${p.description}${repositoryLink}.</p></div>
            <div class="card-action">
              <a href="${p.link}" class="btn blue" target="_blank" rel="noopener">Explore</a>
              <p class="date">${p.date}</p>
            </div>
          </div>
        </div>`
      );
    });
  })
  .catch((err) => {
    console.error("Could not load projects:", err);
    const grid = document.getElementById("projects-grid");
    if (grid) {
      grid.insertAdjacentHTML(
        "beforeend",
        `<p class="col s12 center-align">Projects could not be loaded. Please try again later.</p>`
      );
    }
  });
