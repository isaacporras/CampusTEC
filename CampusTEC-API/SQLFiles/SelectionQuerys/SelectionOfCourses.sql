USE CampusTecDB;
SELECT cur.IdCurso,cur.Nombre
FROM curso AS cur
         INNER JOIN (
             SELECT * FROM cursopersona AS p WHERE p.IdPersona = 1
             ) AS c on cur.IdCurso = c.IdCurso;