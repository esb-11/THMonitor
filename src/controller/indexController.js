import { getTodayData } from "../db/queries.js";

async function getIndex(req, res) {
  res.render("index", {
    title: "Data",
    table: await getTodayData(),
  });
}

export { getIndex };
