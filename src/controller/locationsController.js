import { insertLocation, deleteLocation } from "../db/queries.js";

async function postLocations(req, res) {
  try {
    const { location, email } = req.body;
    await insertLocation(location, email);
  } catch (error) {
    console.error(error);
    res.status(500);
  } finally {
    res.redirect("/settings");
  }
}

async function deleteLocations(req, res) {
  try {
    const location = req.query.location;
    await deleteLocation(location);
  } catch (error) {
    console.error(error);
    res.status(500);
  } finally {
    res.redirect("/settings");
  }
}

export { postLocations, deleteLocations };
