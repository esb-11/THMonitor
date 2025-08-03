import prisma from "./prismaClient.js";

export async function createSensor(data) {
  const { sensor, location, position } = data;
  const result = await prisma.sensor.create({
    data: {
      sensor,
      map: {
        create: {
          location: {
            connect: {
              location,
            },
          },
          position: {
            connect: {
              position,
            },
          }
        },
      },
    },
  });
  return result;
}

export async function getSensors() {
  const result = await prisma.sensor.findMany();
  return result;
}

export async function getSensor(sensor) {
  const result = await prisma.sensor.findUnique({
    where: {
      sensor,
    },
  });
  return result;
}

export async function updateSensor(sensor, data) {
  const result = await prisma.sensor.update({
    where: {
      sensor,
    },
    data,
  });
  return result;
}

export async function deleteSensor(sensor) {
  const result = await prisma.sensor.delete({
    where: {
      sensor,
    },
  });
  return result;
}
