import { query } from "./pool.js";

const SQL = `
CREATE TABLE IF NOT EXISTS sensors (
	sensor_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	sensor VARCHAR (255)
);


CREATE TABLE IF NOT EXISTS locations (
	location_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	location VARCHAR (255)
);


CREATE TABLE IF NOT EXISTS positions (
	position_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	position VARCHAR (255)
);


CREATE TABLE IF NOT EXISTS map (
	sensor_id INTEGER REFERENCES sensors,
	location_id INTEGER REFERENCES locations,
	position_id INTEGER REFERENCES positions,
	PRIMARY KEY(sensor_id)
);


CREATE TABLE IF NOT EXISTS historical_data (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	date DATE NOT NULL DEFAULT CURRENT_DATE,
	temperature INTEGER NOT NULL,
	humidity INTEGER NOT NULL,
	sensor_id INTEGER REFERENCES sensors,
	location_id INTEGER REFERENCES locations,
	position_id INTEGER REFERENCES positions
);


CREATE TABLE IF NOT EXISTS recent_data (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	date DATE NOT NULL DEFAULT CURRENT_DATE,
	temperature INTEGER NOT NULL,
	humidity INTEGER NOT NULL,
	sensor_id INTEGER REFERENCES sensors,
	location_id INTEGER REFERENCES locations,
	position_id INTEGER REFERENCES positions
);
`;

async function main() {
  console.log("seeding...");
  await query(SQL);
  console.log("done");
}

main();
