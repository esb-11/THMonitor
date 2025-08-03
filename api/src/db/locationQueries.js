import prisma from "./prismaClient.js";

export async function createLocation(data) {
  const result = await prisma.location.create({
    data,
  });
  return result;
};

export async function getLocations() {
  const result = await prisma.location.findMany({});
  return result;
};

export async function getLocation(location) {
  const result = await prisma.location.findUnique({
    where: {
      location,
    },
  });
  return result;
};

export async function updateLocation(location, data) {
  const result = await prisma.location.update({
    where: {
      location,
    },
    data,
  });
  return result;
};

export async function deleteLocation(location) {
  const result = await prisma.location.delete({
    where: {
      location,
    },
  });
  return result;
};
