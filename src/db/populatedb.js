import { query } from "./pool.js";

const SQL = `
CREATE TABLE sensors (
	sensor_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	sensor VARCHAR (255) UNIQUE
);


CREATE TABLE locations (
	location_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	location VARCHAR (255) UNIQUE
);


CREATE TABLE positions (
	position_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	position VARCHAR (255) UNIQUE
);


CREATE TABLE map (
	sensor_id INTEGER,
	location_id INTEGER,
	position_id INTEGER,
	PRIMARY KEY(sensor_id),
	CONSTRAINT fk_sensors FOREIGN KEY(sensor_id) REFERENCES sensors(sensor_id) ON DELETE CASCADE,
	CONSTRAINT fk_location FOREIGN KEY(location_id) REFERENCES locations(location_id) ON DELETE SET NULL,
	CONSTRAINT fk_position FOREIGN KEY(position_id) REFERENCES positions(position_id) ON DELETE SET NULL
);


CREATE TABLE history (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	date DATE NOT NULL DEFAULT CURRENT_DATE,
	temperature INTEGER NOT NULL,
	humidity INTEGER NOT NULL,
	sensor VARCHAR (255) NOT NULL,
	location VARCHAR (255) NOT NULL,
	position VARCHAR (255) NOT NULL
);


CREATE TABLE today(
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	date DATE NOT NULL DEFAULT CURRENT_DATE,
	temperature INTEGER NOT NULL,
	humidity INTEGER NOT NULL,
	sensor VARCHAR (255) NOT NULL,
	location VARCHAR (255) NOT NULL,
	position VARCHAR (255) NOT NULL
);
`;

async function main() {
  console.log("seeding...");
  await query(SQL);
  console.log("done");
}

main();
