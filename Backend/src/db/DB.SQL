CREATE DATABASE IF NOT EXISTS futbol_equipos;
USE futbol_equipos;

CREATE TABLE equipos(
    id_equipo INT AUTO_INCREMENT PRIMARY KEY,
    nombre_equipo VARCHAR(100) NOT NULL
);

-- Insert  = POST 

INSERT INTO equipos (nombre_equipo) VALUES
("Alemania"),
("Holanda"),
("Suecia"),
("Francia"),
("Noruega");

--Select = GET
SELECT * FROM equipos;
CREATE DATABASE IF NOT EXISTS futbol_equipos;
USE futbol_equipos;

CREATE TABLE equipos(
    id_equipo INT AUTO_INCREMENT PRIMARY KEY,
    nombre_equipo VARCHAR(100) NOT NULL
);

-- Insert  = POST 

INSERT INTO equipos (nombre_equipo) VALUES
("Alemania"),
("Holanda"),
("Suecia"),
("Francia"),
("Noruega");

--Select = GET
SELECT * FROM equipos;
