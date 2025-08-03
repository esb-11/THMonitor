import * as dataQueries from "../db/dataQueries.js";
import { getMapData } from "../db/mapQueries.js";

export async function postData(req, res, next) {
  const { sensor, temperature: temp, humidity } = parseIncomingData(req.body);

  const { sensor_id, location_id, position_id } = await getMapData(sensor);

  if (!sensor_id || !location_id || !position_id) {
    throw new Error("Sensor not registered");
  }
  
  const data = await dataQueries.getData(location_id, position_id) || { location_id, position_id };
  
  data.min_temperature = Math.min(temp, data?.min_temperature) || temp;
  data.max_temperature = Math.max(temp, data?.max_temperature) || temp;
  data.min_humidity = Math.min(humidity, data?.min_humidity) || humidity;
  data.max_humidity = Math.max(humidity, data?.max_humidity) || humidity;
  
  const result = await dataQueries.upsertData(data);

  res.status(201).json(result);
}

function parseIncomingData(data) {
  const sensor = data.id;
  const temperature = parseInt(data.t_canal1.replace(".", ""));
  const humidity = parseInt(data.u_canal1.replace(".", ""));

  if (typeof humidity != "number" || typeof temperature != "number")
    throw new Error("humidity and temperature must be numbers");

  return { sensor, temperature, humidity };
}
