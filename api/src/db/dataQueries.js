import prisma from "./prismaClient.js";

export async function upsertData(data) {
  const { location_id, position_id, ...rest } = data;
  const result = await prisma.data.upsert({
    where: {
      id: {
        location_id,
        position_id,
      },
    },
    update: {
      ...rest,
    },
    create: {
      location: {
        connect: {
          location_id,
        },
      },
      position: {
        connect: {
          position_id,
        },
      },
      ...rest,
    },
  });
  return result;
}

export async function createData(data) {
  const { location_id, position_id, ...rest } = data;
  const result = await prisma.data.create({
    data: {
      location: {
        connect: {
          location_id,
        },
      },
      position: {
        connect: {
          position_id,
        },
      },
      ...rest,
    },
  });
  return result;
}

export async function getAllData() {
  const result = await prisma.data.findMany({});
  return result;
}

export async function getData(location_id, position_id) {
  const result = await prisma.data.findUnique({
    where: {
      id: {
        location_id,
        position_id,
      },
    },
  });
  return result;
}

export async function updateData(data) {
  const { location_id, position_id, ...rest } = data;
  const result = await prisma.data.update({
    where: {
      id: {
        location_id,
        position_id,
      },
    },
    data: {
      ...rest,
    },
  });
  return result;
}

export async function deleteData(location_id, position_id) {
  const result = await prisma.data.delete({
    where: {
      id: {
        location_id,
        position_id,
      },
    },
  });
  return result;
}
