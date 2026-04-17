const express = require("express");
const router = express.Router();
const fs = require("fs");

function loadProjects() {
  const out = { projects: {} };

  var files = fs.readdirSync("./views/projects").sort();

  files.forEach((file) => {
    fs.readFile("./views/projects/" + file, "utf8", (err, data) => {
      const lines = data.split("\n");

      const projectData = {
        title: lines[1].match(/"([^"]+)"/)[1],
        description: lines[2].match(/"([^"]+)"/)[1],
        image: lines[3].match(/"([^"]+)"/)[1],
        link: lines[4].match(/"([^"]+)"/)[1],
        idx: lines[5].match(/"([^"]+)"/)[1],
        date: lines[6].match(/"([^"]+)"/)[1],
      };

      out.projects[projectData.idx] = projectData;
    });
  });

  return out;
}

const prj = loadProjects();

//  Get /
router.get("/", function (req, res) {
  res.render("home", prj);
});

module.exports = router;
