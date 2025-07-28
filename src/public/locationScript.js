const table = document.querySelector(".locations > table");

table.addEventListener("click", deleteLocation)

function deleteLocation(event) {
  const target = event.target;
  const location = target.dataset.location;
  const url = "/locations";
  fetch(url, {
    method: "DELETE",
  });
}
