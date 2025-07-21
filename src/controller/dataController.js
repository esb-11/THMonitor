function postData(req, res) {
  const { sensor, temperature, humidity } = parseIncomingData(req.body);
  res.end();
}

function parseIncomingData(data) {
  if (
    typeof data.id != "string" ||
    typeof data.t_canal1 != "string" ||
    typeof data.u_canal1 != "string"
  )
    throw new Error("Received data in incorrect format!");

  const sensor = data.id;
  const temperature = parseInt(data.t_canal1.replace(".", ""));
  const humidity = parseInt(data.u_canal1.replace(".", ""));

  if (typeof humidity != "number" || typeof temperature != "number")
    throw new Error("Received data in incorrect format!");

  return { sensor, temperature, humidity };
}

export { postData };
