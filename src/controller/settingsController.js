import { getAllLocations, getAllPositions, getAllFromMapWithJoin } from "../db/queries.js";

async function getSettings(req, res) {
  res.render("index", {
    partial: "partials/settings",
    locations: await getAllLocations(),
    positions: await getAllPositions(),
  });
}

export { getSettings };
