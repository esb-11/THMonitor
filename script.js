
async function logData() {
  const url = "https://thmonitor-production.up.railway.app/sensors";
  const data = await fetch(url, {
    method: "GET",
  });
  console.log(data.json());
}

logData();
