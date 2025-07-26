import { insertLocations } from "../db/queries.js";

async function postLocations(req, res) {
  try {
    const { location, email } = req.body;
    await insertLocations(location, email);
  } catch (error) {
    console.error(error);
    res.status(500);
  } finally {
    res.redirect("/settings");
  }
}

export { postLocations };
