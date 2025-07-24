import { query } from "./pool.js";
import prisma from "./prismaClient.js";

// Insert queries
async function insertData(data) {
  const { sensor, temperature, humidity } = data;

  try {
    const sensor_id = await getSensorId(sensor);
    const { location_id, position_id } = await getSensorPosition(sensor_id);
    const location = await getLocation(location_id);
    const position = await getPosition(position_id);
    await query(
      "INSERT INTO today (temperature, humidity, sensor, location, position) VALUES ($1, $2, $3, $4, $5)",
      [temperature, humidity, sensor, location, position]
    );
  } catch (error) {
    console.error(error);
    return;
  }
}

async function insertSensor(sensor) {
  try {
    await query("INSERT INTO sensors (sensor) VALUES (($1))", [sensor]);
    await query("INSERT INTO map (sensor_id) SELECT sensor_id FROM sensors WHERE sensors.sensor='($1)'", [sensor]);
  } catch (error) {
    console.error(error);
  }
}

async function insertLocation(location) {
  try {
    await query("INSERT INTO locations (location) VALUES (($1))", [location]);
  } catch (error) {
    console.error(error);
  }
}

async function insertPosition(position) {
  try {
    await query("INSERT INTO positions (position) VALUES (($1))", [position]);
  } catch (error) {
    console.error(error);
  }
}

// Update queries
async function updateSensor(currentValue, newValue) {
  try {
    const sensorId = await getSensorId(currentValue);
    query("UPDATE sensors SET sensor = ($2) WHERE sensor_id = ($1)", [
      sensorId,
      newValue,
    ]);
  } catch (error) {
    console.error(error);
  }
}

async function updateLocation(currentValue, newValue) {
  try {
    const locationId = await getLocationId(currentValue);
    query("UPDATE locations SET location = ($2) WHERE location_id = ($1)", [
      locationId,
      newValue,
    ]);
  } catch (error) {
    console.error(error);
  }
}

async function updatePosition(currentValue, newValue) {
  try {
    const positionId = await getPositionId(currentValue);
    query("UPDATE positions SET position = ($2) WHERE position_id = ($1)", [
      positionId,
      newValue,
    ]);
  } catch (error) {
    console.error(error);
  }
}

async function updateMap(sensor, location, position) {
  try {
    const sensorId = await getSensorId(sensor);
    const locationId = await getLocationId(location);
    const positionId = await getPositionId(position);
    query(
      "UPDATE map SET location_id = ($1), position_id = ($2) WHERE sensor_id = ($3)",
      [locationId, positionId, sensorId]
    );
  } catch (error) {
    console.error(error);
  }
}

// Delete queries
async function deleteSensor(sensor) {
  try {
    const sensorId = await getSensorId(sensor);
    query("DELETE FROM sensors WHERE sensors.sensor_id = ($1)", [sensorId]);
  } catch (error) {
    console.error(error);
  }
}

async function deleteLocation(location) {
  try {
    const locationId = await getLocationId(location);
    query("DELETE FROM locations WHERE locations.location_id = ($1)", [
      locationId,
    ]);
  } catch (error) {
    console.error(error);
  }
}

async function deletePosition(position) {
  try {
    const positionId = await getPositionId(position);
    query("DELETE FROM positions WHERE positions.position_id = ($1)", [
      positionId,
    ]);
  } catch (error) {
    console.error(error);
  }
}

// Select queries
async function getRecentData() {
  const { rows } = await query(
    "SELECT TO_CHAR(date, 'DD-MM-YYYY') AS date, sensor, temperature, humidity, location, position FROM recent_data JOIN sensors ON recent_data.sensor_id = sensors.sensor_id JOIN locations ON recent_data.location_id = locations.location_id JOIN positions ON recent_data.position_id = positions.position_id"
  );
  return rows;
}

async function getSensorId(sensorName) {
  const sensor = await prisma.sensors.findUnique({
    where: {
      sensor: sensorName,
    }
  });  
  return sensor.sensor_id;
}

async function getSensorById(sensorId) {
  const sensor = await prisma.sensors.findUnique({
    where: {
      sensor_id: sensorId,
    }
  });
  return sensor.sensor;
}

async function getLocationId(location) {
  const { rows } = await query(
    "SELECT location_id FROM locations WHERE location = ($1)",
    [location]
  );
  if (rows.length == 0) throw new Error("Location not found");
  const location_id = rows[0].location_id;
  return location_id;
}

async function getPositionId(position) {
  const { rows } = await query(
    "SELECT position_id FROM positions WHERE position = ($1)",
    [position]
  );
  if (rows.length == 0) throw new Error("Position not found");
  const position_id = rows[0].position_id;
  return position_id;
}

async function getSensorPosition(sensor_id) {
  const { rows } = await query(
    "SELECT location_id, position_id FROM map WHERE sensor_id = ($1)",
    [sensor_id]
  );
  if (rows.length == 0) throw new Error("Sensor not found");
  return rows[0];
}

async function getLocation(locationId) {
  const { rows } = await query(
    "SELECT location FROM locations WHERE location_id = ($1)",
    [locationId]
  );
  if (rows.length == 0) throw new Error("Location not found");
  const location = rows[0].location;
  return location;
}

async function getPosition(positionId) {
  const { rows } = await query(
    "SELECT position FROM positions WHERE position_id = ($1)",
    [positionId]
  );
  if (rows.length == 0) throw new Error("Position not found");
  const position = rows[0].position;
  return position;
}

console.log();

export {
  getSensorId,
  getSensorById,
  
  getRecentData,
  insertData,
  updateSensor,
  updateLocation,
  updatePosition,
  updateMap,
  deleteSensor,
  deleteLocation,
  deletePosition,
  insertSensor,
  insertLocation,
  insertPosition,
};
