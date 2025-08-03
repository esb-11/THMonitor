export function parseIntPosition(req, res, next) {
  const { data } = req.body;
  const attributes = [
    "min_temperature",
    "max_temperature",
    "min_humidity",
    "max_humidity",
  ];

  attributes.forEach(attr => {    
    let value = data[attr];
    value = value.replace(".", "");
    value = value.replace(",", "");
    data[attr] = parseInt(value);
  });

  next();
}
