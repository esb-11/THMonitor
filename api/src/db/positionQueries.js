import prisma from "./prismaClient.js";

export async function createPosition(data) {
  const result = await prisma.position.create({
    data,
  });
  return result;
}

export async function getPositions() {
  const result = await prisma.position.findMany({});
  return result;
}

export async function getPosition(position) {
  const result = await prisma.position.findUnique({
    where: {
      position,
    },
  });
  return result;
}

export async function updatePosition(position, data) {
  const result = await prisma.position.update({
    where: {
      position,
    },
    data,
  });
  return result;
}

export async function deletePosition(position) {
  const result = await prisma.position.delete({
    where: {
      position,
    },
  });
  return result;
}
