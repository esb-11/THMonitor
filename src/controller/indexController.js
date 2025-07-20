import db from "../db.js";

function getIndex(req, res) {
  res.render("index", {
    title: "Data",
    table: db.get(),
  });
}

export { getIndex };
