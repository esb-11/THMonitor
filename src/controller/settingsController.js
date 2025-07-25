import { getAllLocations } from "../db/queries.js";

async function getSettings(req, res) {
  res.render("index", {
    partial: "partials/settings",
    locations: await getAllLocations(),
  });
}

export { getSettings };
