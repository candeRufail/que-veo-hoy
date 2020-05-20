CREATE DATABASE queVeoHoy;

USE queVeoHoy;

CREATE TABLE pelicula (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  titulo varchar(100) ,
  duracion varchar (400) ,
  director varchar (400) ,
  anio int(5),
  fecha_lanzamiento DATE ,
  puntuacion int (2),
  poster varchar (300) ,
  trama varchar (700) 
);


CREATE TABLE genero (
id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
nombre varchar (30)
);


CREATE TABLE actor (
id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
nombre varchar (70)
);


CREATE TABLE actor_pelicula (
id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
actor_id int , 
pelicula_id int
);
ALTER TABLE actor_pelicula ADD FOREIGN KEY (actor_id) REFERENCES actor (id);
ALTER TABLE actor_pelicula ADD FOREIGN KEY (pelicula_id) REFERENCES pelicula (id);