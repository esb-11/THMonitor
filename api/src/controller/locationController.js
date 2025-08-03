import * as locationQueries from "../db/locationQueries.js";

export async function postLocation(req, res, next) {
  const { data } = req.body;
  const result = await locationQueries.createLocation(data);
  res.status(201).json(result);
}

export async function getLocations(req, res, next) {
  const result = await locationQueries.getLocations();
  res.status(200).json(result);
}

export async function getLocation(req, res, next) {
  const { location } = req.params;
  const result = await locationQueries.getLocation(location);
  res.status(200).json(result);
}

export async function putLocation(req, res, next) {
  const { location } = req.params;
  const { data } = req.body;
  const result = await locationQueries.updateLocation(location, data);
  res.status(200).json(result);
}

export async function deleteLocation(req, res, next) {
  const { location } = req.params;
  const result = await locationQueries.deleteLocation(location);
  res.status(200).json(result);
}
