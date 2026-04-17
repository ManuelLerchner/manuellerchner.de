const express = require("express");
const exphbs = require("express-handlebars");
const dotenv = require("dotenv");
const path = require("path");
const robots = require("robots.txt");

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "hbs");
app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs" }));

app.use("/", require("./routes/home"));
app.use("/about", require("./routes/about"));
app.use("/projects", require("./routes/projects"));
app.use("/datenschutzerklaerung", require("./routes/datenschutzerklaerung"));
app.use("/impressum", require("./routes/impressum"));
app.use(robots(__dirname + "/robots.txt"));

app.get("/*", function (req, res) {
  res.render("error/pageNotFound", { layout: "error" });
});

const PORT =
  process.env.NODE_ENV === "developement"
    ? process.env.HTTP_DEV_PORT || 3000
    : process.env.HTTP_PORT || 8080;

app.listen(PORT, () =>
  console.log(`Website running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
