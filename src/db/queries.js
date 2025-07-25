import { query } from "./pool.js";
import prisma from "./prismaClient.js";

// Insert queries
async function insertToday(data) {
  await prisma.today.create({
    data: {
      ...data,
    },
  });
}

async function insertSensor(sensor) {
  try {
    await query("INSERT INTO sensors (sensor) VALUES (($1))", [sensor]);
    await query(
      "INSERT INTO map (sensor_id) SELECT sensor_id FROM sensors WHERE sensors.sensor='($1)'",
      [sensor]
    );
  } catch (error) {
    console.error(error);
  }
}

async function insertLocation(location) {
  try {
    await query("INSERT INTO locations (location) VALUES (($1))", [location]);
  } catch (error) {
    console.error(error);
  }
}

async function insertPosition(position) {
  try {
    await query("INSERT INTO positions (position) VALUES (($1))", [position]);
  } catch (error) {
    console.error(error);
  }
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

async function updateSensor(currentValue, newValue) {
  try {
    const sensorId = await getSensorId(currentValue);
    query("UPDATE sensors SET sensor = ($2) WHERE sensor_id = ($1)", [
      sensorId,
      newValue,
    ]);
  } catch (error) {
    console.error(error);
  }
}

async function updateLocation(currentValue, newValue) {
  try {
    const locationId = await getLocationId(currentValue);
    query("UPDATE locations SET location = ($2) WHERE location_id = ($1)", [
      locationId,
      newValue,
    ]);
  } catch (error) {
    console.error(error);
  }
}

async function updatePosition(currentValue, newValue) {
  try {
    const positionId = await getPositionId(currentValue);
    query("UPDATE positions SET position = ($2) WHERE position_id = ($1)", [
      positionId,
      newValue,
    ]);
  } catch (error) {
    console.error(error);
  }
}

async function updateMap(sensor, location, position) {
  try {
    const sensorId = await getSensorId(sensor);
    const locationId = await getLocationId(location);
    const positionId = await getPositionId(position);
    query(
      "UPDATE map SET location_id = ($1), position_id = ($2) WHERE sensor_id = ($3)",
      [locationId, positionId, sensorId]
    );
  } catch (error) {
    console.error(error);
  }
}

// Delete queries
async function deleteSensor(sensor) {
  try {
    const sensorId = await getSensorId(sensor);
    query("DELETE FROM sensors WHERE sensors.sensor_id = ($1)", [sensorId]);
  } catch (error) {
    console.error(error);
  }
}

async function deleteLocation(location) {
  try {
    const locationId = await getLocationId(location);
    query("DELETE FROM locations WHERE locations.location_id = ($1)", [
      locationId,
    ]);
  } catch (error) {
    console.error(error);
  }
}

async function deletePosition(position) {
  try {
    const positionId = await getPositionId(position);
    query("DELETE FROM positions WHERE positions.position_id = ($1)", [
      positionId,
    ]);
  } catch (error) {
    console.error(error);
  }
}

// Select queries
async function getSensorId(sensorName) {
  const sensor = await prisma.sensors.findUnique({
    where: {
      sensor: sensorName,
    },
  });
  return sensor?.sensor_id;
}

async function getSensorById(sensorId) {
  const sensor = await prisma.sensors.findUnique({
    where: {
      sensor_id: sensorId,
    },
  });
  return sensor;
}

async function getAllLocations() {
  const locations = await prisma.locations.findMany({
    omit: {
      location_id: true,
    }
  });
  return locations;
}

async function getLocationId(locationName) {
  const location = await prisma.locations.findUnique({
    where: {
      location: locationName,
    },
  });
  return location?.location_id;
}

async function getLocationById(locationId) {
  const location = await prisma.locations.findUnique({
    where: {
      location_id: locationId,
    },
  });
  return location;
}

async function getPositionId(positionName) {
  const position = await prisma.positions.findUnique({
    where: {
      position: positionName,
    },
  });
  return position?.position_id;
}

async function getPositionById(positionId) {
  const position = await prisma.positions.findUnique({
    where: {
      position_id: positionId,
    },
  });
  return position;
}

async function getTodayData() {
  const todayData = await prisma.today.findMany();
  return todayData;
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

async function getFromMapBySensorIdWithJoin(sensorId) {
  const row = await prisma.map.findUnique({
    where: {
      sensor_id: sensorId,
    },
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
      sensors: {
        select: {
          sensor: true,
        },
      },
    },
  });
  return row;
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
  getSensorById,
  getAllLocations,
  getLocationId,
  getLocationById,
  getPositionId,
  getPositionById,
  getFromMapBySensorId,
  getFromMapBySensorIdWithJoin,
  getTodayData,
  getTodayDataWithJoin,
  getFromTodayById,
  insertToday,
  updateToday,
  //
  updateSensor,
  updateLocation,
  updatePosition,
  updateMap,
  deleteSensor,
  deleteLocation,
  deletePosition,
  insertSensor,
  insertLocation,
  insertPosition,
};
