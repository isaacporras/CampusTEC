SELECT *
FROM logininfo c
WHERE c.Carne = ?
  AND c.Pin = ?;
SELECT *
FROM persona
WHERE persona.IdPersona = ?;


SELECT L.IdActividad, l.IdFile, l.NumSemana, l.TecColones, l.Fecha, l.Descripcion, l.IdCurso
FROM
      (SELECT a.*
       FROM actividad a
                INNER JOIN actividadretoacademico a2 on a.IdActividad = a2.IdActividad
       WHERE ? = a2.IdRetoAcademico)
      l
;

SELECT tarea.* FROM tarea INNER JOIN actividad a on tarea.IdActividad = a.IdActividad WHERE a.IdActividad = ?;
SELECT tarea.* FROM tarea INNER JOIN persona a on tarea.IdPersona = a.IdPersona WHERE a.IdPersona = ?;

SELECT persona.* FROM persona INNER JOIN cursopersona ON persona.IdPersona = cursopersona.IdPersona
WHERE persona.Puesto=TRUE AND cursopersona.IdCurso = ?;

SELECT objetivo.* FROM objetivo INNER JOIN curso c  on objetivo.IdCurso = c.IdCurso WHERE C.IdCurso = ?;