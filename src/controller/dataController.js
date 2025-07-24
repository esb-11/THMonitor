import {
  getSensorId,
  getFromMapBySensorId,
  getFromTodayById,
  updateToday,
  insertToday,
} from "../db/queries.js";

function postData(req, res) {
  try {
    const data = parseIncomingData(req.body);
    pushToDB(data);
  } catch (error) {
    console.error(error);
  }
  res.end();
}

function parseIncomingData(data) {
  if (
    typeof data?.id != "string" ||
    typeof data?.t_canal1 != "string" ||
    typeof data?.u_canal1 != "string"
  )
    throw new Error("received data in incorrect format");

  const sensor = data.id;
  const temperature = parseInt(data.t_canal1.replace(".", ""));
  const humidity = parseInt(data.u_canal1.replace(".", ""));

  if (typeof humidity != "number" || typeof temperature != "number")
    throw new Error("humidity and temperature must be numbers");

  return { sensor, temperature, humidity };
}

async function pushToDB(data) {
  const { sensor, temperature, humidity } = data;
  const sensor_id = await getSensorId(sensor);
  if (!sensor_id) throw new Error("sensor not found");
  const { location_id, position_id } = await getFromMapBySensorId(sensor_id);
  const row = await getFromTodayById(location_id, position_id);  

  if (row) {
    row.min_temperature = Math.min(temperature, row.min_temperature);
    row.max_temperature = Math.max(temperature, row.max_temperature);
    row.min_humidity = Math.min(humidity, row.min_humidity);
    row.max_humidity = Math.max(humidity, row.max_humidity);
    updateToday(row);
  } else {
    insertToday({
      location_id,
      position_id,
      min_temperature: temperature,
      max_temperature: temperature,
      min_humidity: humidity,
      max_humidity: humidity,
    });
  }
}

export { postData };
