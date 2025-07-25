import prisma from "./prismaClient.js";

// Insert queries
async function insertToday(data) {
  await prisma.today.create({
    data: {
      ...data,
    },
  });
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

async function getAllLocations() {
  const locations = await prisma.locations.findMany({
    omit: {
      location_id: true,
    }
  });
  return locations;
}

async function getAllPositions() {
  const positions = await prisma.positions.findMany({
    omit: {
      position_id: true,
    }
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
        location: 'asc',
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
  getAllLocations,
  getAllPositions,
  getAllFromMapWithJoin,
  getFromMapBySensorId,
  getTodayDataWithJoin,
  getFromTodayById,
  insertToday,
  updateToday,
};
