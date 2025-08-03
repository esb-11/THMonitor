import prisma from "./prismaClient.js";

export async function getMapData(sensor) {
  const result = await prisma.map.findUnique({
    where: {
      sensor: {
        sensor,
      },
    },
    include: {
      sensor: {
        select: {
          sensor: true,
        },
      },
      location: {
        select: {
          location: true,
        },
      },
      position: {
        select: {
          position: true,
        },
      },
    }
  });
  return result;
}
