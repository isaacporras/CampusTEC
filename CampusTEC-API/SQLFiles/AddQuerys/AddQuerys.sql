INSERT INTO comentario( IdFile, IdActividad, Comentario, IdPersona, Fecha, Hora ) VALUES (?,?,?,?,?,?);
INSERT INTO actividad( IdFile, NumSemana, TecColones, Fecha, Descripcion, IdCurso) VALUES (?,?,?,?,?,?);
INSERT INTO retoacademico( Descripcion, Titulo, TecColones, IdCurso) VALUES (?,?,?,?);
INSERT INTO retoacademicopersona(IdRetoAcademico, IdPersona, Completado) VALUES (?,?,?);
INSERT INTO actividadpersona(IdActividad, IdPersona, Completado) VALUES (?,?,?);
INSERT INTO retopsicologico( TecColones, Titulo) VALUES (?,?);
INSERT INTO preguntapsico( idretopsicologico, pregunta) VALUES (?,?);
INSERT INTO  respuesta(idpreguntapsico, respuesta) VALUES (?,?);
INSERT INTO objetivo(descripcion, idcurso) VALUES (?,?);
INSERT INTO tarea(idpersona, idactividad, titulo, descripcion, hora) VALUES (?,?,?,?,?);
INSERT INTO respuestapregunta(idresultado, idpreguntapsico, idrespuesta) VALUES (?,?,?);
INSERT INTO resultado( idretopsicologico) VALUES (?);
SELECT LAST_INSERT_ID();
INSERT INTO resultadopersona(idpersona, idresultado) VALUES (?,?);
INSERT INTO 
