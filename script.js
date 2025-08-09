
async function logData() {
  const url = "https://thmonitor-production.up.railway.app/sensors";
  const data = await fetch(url, {
    method: "GET",
  });
  const result = await data.json();
  console.log(result);
}

logData();
