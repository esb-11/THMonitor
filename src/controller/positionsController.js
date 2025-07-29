import { insertPosition, deletePosition } from "../db/queries.js";

async function postPositions(req, res) {
  try {
    const {
      position,
      min_humidity,
      max_humidity,
      min_temperature,
      max_temperature,
    } = req.body;
    await insertPosition(
      position,
      parseInt(min_humidity) * 100,
      parseInt(max_humidity) * 100,
      parseInt(min_temperature) * 100,
      parseInt(max_temperature) * 100
    );
  } catch (error) {
    console.error(error);
    res.status(500);
  } finally {
    res.redirect("/settings");
  }
}

async function deletePositions(req, res) {
  try {
    const { position } = req.query;
    await deletePosition(position);
  } catch (error) {
    console.error(error);
    res.status(500);
  } finally {
    res.redirect("/settings");
  }
}

export { postPositions, deletePositions };
