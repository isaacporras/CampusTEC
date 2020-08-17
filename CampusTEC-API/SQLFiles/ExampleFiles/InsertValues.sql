INSERT INTO persona(nombre, apellido, activo, numtelefono, email1, email2, ppurl, puesto)

VALUES ('', '', TRUE, 0, '', '', '', TRUE),
       ('Kenneth', 'Hernandez', TRUE, 88760967, 'khken21@gmail.com', 'khken21@gmail.com', '', FALSE),
       ('Isaac', 'Porras', TRUE, 543748658, 'Isaac@gmail.com', 'Isaac@gmail.com', '', FALSE),
       ('Marco', 'Herrera', TRUE, 547547547, 'Marco@gmail.com', 'Marco@gmail.com', '', FALSE),
       ('Jasson', 'Rodriguez', TRUE, 354236536, 'Jasson@gmail.com', 'Jasson@gmail.com', '', FALSE);



INSERT INTO persona(nombre, apellido, activo, numtelefono, email1, email2, ppurl, puesto)
VALUES ('Daniel', 'Madriz', TRUE, 88880941, 'Daniel@gmail.com', 'Daniel@gmail.com', '', TRUE);


INSERT INTO logininfo(idpersona, pin, carne, type)
VALUES (1, 'Contra1', '1', FALSE),
       (2, 'Contra2', '2', FALSE),
       (3, 'Contra3', '3', FALSE),
       (4, 'Contra4', '4', FALSE),
       (5, 'Contra5', '5', FALSE),
       (6, 'Contra6', '6', TRUE);
INSERT INTO cuenta(TECCOLONES, IDPERSONA)
VALUES (default, 2),
       (default, 3),
       (default, 4),
       (default, 5);
INSERT INTO sede(Nombre)
values ('Sede de Cartago');


INSERT INTO sedepersona(idpersona, idsede, valid)
VALUES (1, 1, TRUE),
       (2, 1, TRUE),
       (3, 1, TRUE),
       (4, 1, TRUE),
       (5, 1, TRUE),
       (6, 1, TRUE);

INSERT INTO universidad(nombre)
VALUES ('X-Tec');

INSERT INTO universidadpersona(idpersona, iduniversidad)
VALUES (1, 1),
       (2, 1),
       (3, 1),
       (4, 1),
       (5, 1),
       (6, 1);


INSERT INTO semestre(Nombre)
VALUES ('PrimerSemestre 2020');

INSERT INTO curso(nombre, teccolones, idsemestre)
VALUES ('Espe', 90000, 1),
       ('Arquitectura de Computadores', 90000, 1);

INSERT INTO cursopersona(idcurso, idpersona, valid)
VALUES (1, 2, TRUE),
       (1, 3, TRUE),
       (2, 4, TRUE),
       (2, 5, TRUE),
       (1, 6, TRUE),
       (2, 6, TRUE);

INSERT INTO objetivo(DESCRIPCION, IDCURSO)
VALUES ('Aprender de diseño de aplicaciones', 1),
       ('Aprender sobre diferentes herramientas de user testing', 1),
       ('Aprender sobre herramientas de Unit Testing', 1),
       ('Aprender sobre herramientas Scrum', 1),
       ('Aprender sobre Amdal', 2),
       ('Aprender sobre Procesadores vectoriales', 2),
       ('Aprender sobre MISD', 2),
       ('Aprender sobre niveles de cache', 2);


# INSERT INTO tarea(idpersona, idactividad, titulo, semana, numdia, descripcion, hora) VALUES (?,?,?,?,?,?,?,?);