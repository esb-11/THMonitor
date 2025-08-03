import * as sensorQueries from "../db/sensorQueries.js";

async function postSensor(req, res) {
  const { data } = req.body;
  const result = await sensorQueries.createSensor(data);
  res.status(201).json(result);
}

async function getSensors(req, res) {
  const result = await sensorQueries.getSensors();
  res.status(200).json(result);
}

async function getSensor(req, res) {
  const { sensor } = req.params;
  const result = await sensorQueries.getSensor(sensor);
  res.status(200).json(result);
}

async function putSensor(req, res) {
  const { sensor } = req.params;
  const { data } = req.body;
  const result = await sensorQueries.updateSensor(sensor, data);
  res.status(200).json(result);
}

async function deleteSensor(req, res) {
  const { sensor } = req.params;
  const result = await sensorQueries.deleteSensor(sensor);
  res.status(200).json(result);
}

export { postSensor, getSensors, getSensor, putSensor, deleteSensor };
