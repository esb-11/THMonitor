import {
  getLocationId,
  getPositionId,
  insertIntoMap,
  insertSensors,
  deleteSensor,
} from "../db/queries.js";

async function postSensors(req, res) {
  try {
    const { sensor, location, position } = req.body;
    const locationId = await getLocationId(location);
    const positionId = await getPositionId(position);
    const sensorId = (await insertSensors(sensor)).sensor_id;
    await insertIntoMap(sensorId, locationId, positionId);
  } catch (error) {
    console.error(error);
    res.status(500);
  } finally {
    res.redirect("/settings");
  }
}

async function deleteSensors(req, res) {
  try {
    const { sensor } = req.query;
    await deleteSensor(sensor);
  } catch (error) {
    console.error(error);
    res.status(500);
  } finally {
    res.redirect("/settings");
  }
}

export { postSensors, deleteSensors };
