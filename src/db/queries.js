import prisma from "./prismaClient.js";

// Insert queries
async function insertToday(data) {
  await prisma.today.create({
    data: {
      ...data,
    },
  });
}

async function insertLocations(location, email = null) {
  const result = await prisma.locations.create({
    data: {
      location: location,
      email: email,
    },
  });
  return result;
}

async function insertPosition(
  position,
  min_humidity,
  max_humidity,
  min_temperature,
  max_temperature
) {
  const result = await prisma.positions.create({
    data: {
      position,
      min_humidity,
      max_humidity,
      min_temperature,
      max_temperature,
    },
  });
  return result;
}

async function insertSensors(sensor) {
  const result = await prisma.sensors.create({
    data: {
      sensor,
    }
  });
  return result;
}

async function insertIntoMap(sensor_id, location_id, position_id) {
  const result = await prisma.map.create({
    data: {
      sensor_id,
      location_id,
      position_id,
    },
  });
  return result;
}

// Update queries
async function updateToday(data) {
  await prisma.today.update({
    where: {
      id: {
        location_id: data.location_id,
        position_id: data.position_id,
      },
    },
    data: {
      ...data,
    },
  });
}

// Delete queries

// Select queries
async function getSensorId(sensorName) {
  const sensor = await prisma.sensors.findUnique({
    where: {
      sensor: sensorName,
    },
  });
  return sensor?.sensor_id;
}

async function getLocationId(location) {
  const result = await prisma.locations.findUnique({
    where: {
      location,
    },
    select: {
      location_id: true,
    },
  });
  return result?.location_id;
}

async function getPositionId(position) {
  const result = await prisma.positions.findUnique({
    where: {
      position,
    },
    select: {
      position_id: true,
    },
  });
  return result?.position_id;
}

async function getAllLocations() {
  const locations = await prisma.locations.findMany({
    omit: {
      location_id: true,
    },
  });
  return locations;
}

async function getAllPositions() {
  const positions = await prisma.positions.findMany({
    omit: {
      position_id: true,
    },
  });
  return positions;
}

async function getTodayDataWithJoin() {
  const todayData = await prisma.today.findMany({
    include: {
      locations: {
        select: {
          location: true,
        },
      },
      positions: {
        select: {
          position: true,
        },
      },
    },
    omit: {
      location_id: true,
      position_id: true,
    },
    orderBy: {
      locations: {
        location: "asc",
      },
    },
  });
  return todayData;
}

async function getFromTodayById(location_id, position_id) {
  return await prisma.today.findUnique({
    where: {
      id: {
        location_id: location_id,
        position_id: position_id,
      },
    },
  });
}

async function getAllFromMapWithJoin() {
  const map = await prisma.map.findMany({
    include: {
      sensors: {
        select: {
          sensor: true,
        },
      },
      locations: {
        select: {
          location: true,
        },
      },
      positions: {
        select: {
          position: true,
        },
      },
    },
    omit: {
      location_id: true,
      position_id: true,
      sensor_id: true,
    },
  });
  return map;
}

async function getFromMapBySensorId(sensorId) {
  const row = await prisma.map.findUnique({
    where: {
      sensor_id: sensorId,
    },
  });
  return row;
}

export {
  getSensorId,
  getLocationId,
  getPositionId,
  getAllLocations,
  getAllPositions,
  getAllFromMapWithJoin,
  getFromMapBySensorId,
  getTodayDataWithJoin,
  getFromTodayById,
  insertToday,
  insertLocations,
  insertPosition,
  insertSensors,
  insertIntoMap,
  updateToday,
};
