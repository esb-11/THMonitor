import * as dataQueries from "../db/dataQueries.js";
import { getMapData } from "../db/mapQueries.js";
import { parseIncomingData } from "../middleware/parseIncomingData.js";

export const postData = [
  parseIncomingData,
  async (req, res, next) => {
    const { sensor, temperature: temp, humidity } = req.body;

    const { sensor_id, location_id, position_id } = await getMapData(sensor);

    if (!sensor_id || !location_id || !position_id) {
      throw new Error("Sensor not registered");
    }

    const data = (await dataQueries.getData(location_id, position_id)) || {
      location_id,
      position_id,
    };

    data.min_temperature = Math.min(temp, data?.min_temperature) || temp;
    data.max_temperature = Math.max(temp, data?.max_temperature) || temp;
    data.min_humidity = Math.min(humidity, data?.min_humidity) || humidity;
    data.max_humidity = Math.max(humidity, data?.max_humidity) || humidity;

    const result = await dataQueries.upsertData(data);

    res.status(201).json(result);
  },
];
