import * as positionQueries from "../db/positionQueries.js";
import { parseIntPosition } from "../middleware/parseIntPosition.js";

export const postPosition = [
  parseIntPosition,
  async (req, res, next) => {
    const { data } = req.body;
    const result = await positionQueries.createPosition(data);
    res.status(201).json(result);
  },
];

export async function getPositions(req, res, next) {
  const result = await positionQueries.getPositions();
  res.status(200).json(result);
}

export async function getPosition(req, res, next) {
  const { position } = req.params;
  const result = await positionQueries.getPosition(position);
  res.status(200).json(result);
}

export const putPosition = [
  parseIntPosition,
  async (req, res, next) => {
    const { position } = req.params;
    const { data } = req.body;
    const result = await positionQueries.updatePosition(position, data);
    res.status(200).json(result);
  },
];

export async function deletePosition(req, res, next) {
  const { position } = req.params;
  const result = await positionQueries.deletePosition(position);
  res.status(200).json(result);
}
