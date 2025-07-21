import { query } from "./pool.js";

async function getRecentData() {
  const { rows } = await query("SELECT TO_CHAR(date, 'DD-MM-YYYY') AS date, sensor, temperature, humidity, location, position FROM recent_data JOIN sensors ON recent_data.sensor_id = sensors.sensor_id JOIN locations ON recent_data.location_id = locations.location_id JOIN positions ON recent_data.position_id = positions.position_id");
  return rows;
}

async function insertRecentData(data) {
  const { sensor, temperature, humidity } = data;
  
  let sensor_id, location_id, position_id;
  try {
    sensor_id = await getSensorId(sensor);
    location_id, position_id = await getSensorPosition(sensor_id);    
  } catch (error) {
    console.error(error);
    return;
  }
  
  await query("INSERT INTO recent_data (temperature, humidity, sensor_id, location_id, position_id) VALUES ($1, $2, $3, $4, $5)", [temperature, humidity, sensor_id, location_id, position_id]);
}

async function getSensorId(sensor) {
  const { rows } = await query("SELECT sensor_id FROM sensors WHERE sensor = ($1)", [sensor]);
  if (rows.length == 0) throw new Error("Sensor not found");
  const sensor_id = rows[0].sensor_id;
  return sensor_id;
}

async function getSensorPosition(sensor_id) {
  const { rows } = await query("SELECT location_id, position_id FROM map WHERE sensor_id = ($1)", [sensor_id]);
  if (rows.length == 0) throw new Error("Sensor not found");
  const { location_id, position_id } = rows[0];
  return { location_id, position_id };
}

export { getRecentData, insertRecentData };
