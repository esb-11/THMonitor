async function logData() {
  const url = "https://thmonitor-production.up.railway.app/sensors";
  const response = await fetch(url, {
    method: "GET",
  });
  const data = await response.json();
  console.log(data);
}

logData();
