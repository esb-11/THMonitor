async function logData() {
  const url = "https://thmonitor-production.up.railway.app/sensors";
  const data = await fetch(url, {
    method: "GET",
  }).then((response) => response.json());
  console.log(data);
}

logData();
