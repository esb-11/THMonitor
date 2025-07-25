import { getTodayDataWithJoin } from "../db/queries.js";

async function getIndex(req, res) {
  res.render("index", {
    partial: "partials/dashboard",
    table: await getTodayDataWithJoin(),
  });
}

export { getIndex };
