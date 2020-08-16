USE CampusTecDB;
SELECT cur.IdCurso, cur.Nombre
FROM curso AS cur
         INNER JOIN (
    SELECT *
    FROM cursopersona AS p
    WHERE p.IdPersona = 1
) AS c on cur.IdCurso = c.IdCurso;


SELECT s.*
FROM sedepersona
         INNER JOIN sede s on sedepersona.IdSede = s.IdSede
WHERE sedepersona.IdPersona = ?;


SELECT s.*
FROM universidadpersona
         INNER JOIN universidad s on universidadpersona.IdUniversidad = s.IdUniversidad
WHERE universidadpersona.IdPersona = ?;
