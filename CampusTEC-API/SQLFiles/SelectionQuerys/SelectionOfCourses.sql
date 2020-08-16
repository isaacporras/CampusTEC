USE CampusTecDB;
SELECT cur.IdCurso,cur.Nombre
FROM curso AS cur
         INNER JOIN (
             SELECT * FROM cursopersona AS p WHERE p.IdPersona = 1
             ) AS c on cur.IdCurso = c.IdCurso;

SELECT * FROM actividad LEFT JOIN actividadretoacademico ON actividad.IdActividad = actividadretoacademico.IdActividad WHERE actividad.IdCurso = ?;
SELECT tarea.* FROM tarea INNER JOIN actividad a on tarea.IdActividad = a.IdActividad WHERE a.IdActividad = ? AND tarea.IdPersona = ?;