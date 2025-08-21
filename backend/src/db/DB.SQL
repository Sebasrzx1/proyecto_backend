CREATE DATABASE IF NOT EXISTS equipos_futbol;
USE equipos_futbol;

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
