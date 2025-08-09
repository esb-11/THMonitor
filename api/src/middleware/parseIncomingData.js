export function parseIncomingData(req, res, next) {
  const data = req.body;

  if (!data || !data.id || !data.t_canal1 || !data.u_canal1)
    throw new Error("No data received");

  const sensor = data.id;
  const temperature = parseInt(data.t_canal1.replace(".", ""));
  const humidity = parseInt(data.u_canal1.replace(".", ""));

  if (typeof humidity != "number" || typeof temperature != "number")
    throw new Error("humidity and temperature must be numbers");

  data.sensor = sensor;
  data.temperature = temperature;
  data.humidity = humidity;

  next();
}
