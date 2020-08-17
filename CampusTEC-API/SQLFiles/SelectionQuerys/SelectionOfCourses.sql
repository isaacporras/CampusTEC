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


SELECT actividad.*
FROM actividad
         INNER JOIN actividadretoacademico ar
WHERE ar.IdRetoAcademico = ?;

SELECT A.idpersona,
       A.nombre,
       A.apellido,
       A.activo,
       A.numtelefono,
       A.email1,
       A.email2,
       A.ppurl,
       A.puesto,
       universidad.Nombre
FROM (
         SELECT persona.*, universidadpersona.IdUniversidad
         FROM persona
                  INNER JOIN universidadpersona ON persona.IdPersona = universidadpersona.IdPersona
         WHERE persona.IdPersona = ?
     ) A
         INNER JOIN universidad ON A.IdUniversidad = universidad.IdUniversidad;


SELECT X.IdPersona,
       X.Nombre,
       X.Apellido,
       X.Activo,
       X.NumTelefono,
       X.Email1,
       X.Email2,
       X.PpUrl,
       X.Puesto,
       X.Nombre,
       sede.Nombre
FROM (SELECT A.*, sedepersona.IdSede
      FROM (
               SELECT A.idpersona,
                      A.nombre,
                      A.apellido,
                      A.activo,
                      A.numtelefono,
                      A.email1,
                      A.email2,
                      A.ppurl,
                      A.puesto,
                      universidad.Nombre AS universidadNombre
               FROM (
                        SELECT persona.*, universidadpersona.IdUniversidad
                        FROM persona
                                 INNER JOIN universidadpersona ON persona.IdPersona = universidadpersona.IdPersona
                        WHERE persona.IdPersona = ?
                    ) A
                        INNER JOIN universidad ON A.IdUniversidad = universidad.IdUniversidad
           ) A
               INNER JOIN sedepersona ON A.IdPersona = sedepersona.IdPersona
      WHERE sedepersona.IdPersona = ?) X
         INNER JOIN sede ON X.IdSede = sede.IdSede;


SELECT X.*, logininfo.Carne
FROM (SELECT X.IdPersona,
             X.Nombre,
             X.Apellido,
             X.Activo,
             X.NumTelefono,
             X.Email1,
             X.Email2,
             X.PpUrl,
             X.Puesto,
             X.universidadNombre,
             sede.Nombre AS sedeNombre
      FROM (SELECT A.*, sedepersona.IdSede
            FROM (
                     SELECT A.idpersona,
                            A.nombre,
                            A.apellido,
                            A.activo,
                            A.numtelefono,
                            A.email1,
                            A.email2,
                            A.ppurl,
                            A.puesto,
                            universidad.Nombre AS universidadNombre
                     FROM (
                              SELECT persona.*, universidadpersona.IdUniversidad
                              FROM persona
                                       INNER JOIN universidadpersona ON persona.IdPersona = universidadpersona.IdPersona
                              WHERE persona.IdPersona = ?
                          ) A
                              INNER JOIN universidad ON A.IdUniversidad = universidad.IdUniversidad
                 ) A
                     INNER JOIN sedepersona ON A.IdPersona = sedepersona.IdPersona
            WHERE sedepersona.IdPersona = ?) X
               INNER JOIN sede ON X.IdSede = sede.IdSede) X
         INNER JOIN logininfo on logininfo.IdPersona = x.IdPersona;


SELECT logininfo.Carne
FROM logininfo
WHERE logininfo.IdPersona = ?;

SELECT retoacademico.*
FROM retoacademico
WHERE retoacademico.IdCurso = ?;

SELECT actividad.*
FROM actividad
WHERE actividad.IdActividad NOT IN (
    SELECT actividad.IdActividad
    FROM actividad
             INNER JOIN actividadretoacademico a on actividad.IdActividad = a.IdActividad);

SELECT Z.*
FROM (SELECT actividadpersona.IdActividad
      FROM persona
               INNER JOIN actividadpersona ON persona.IdPersona = actividadpersona.IdPersona
      WHERE persona.IdPersona = ?) A
         INNER JOIN (
    SELECT actividad.*
    FROM actividad
    WHERE actividad.IdActividad NOT IN (
        SELECT actividad.IdActividad
        FROM actividad
                 INNER JOIN actividadretoacademico a on actividad.IdActividad = a.IdActividad)
) Z
                    ON A.IdActividad = Z.IdActividad;

USE CampusTecDB;

SELECT Z.*
FROM (SELECT actividadpersona.IdActividad
      FROM persona
               INNER JOIN actividadpersona ON persona.IdPersona = actividadpersona.IdPersona
      AND persona.IdPersona = ?) A
         INNER JOIN (
    SELECT actividad.*
    FROM actividad
    WHERE actividad.IdActividad NOT IN (
        SELECT actividad.IdActividad
        FROM actividad
                 INNER JOIN actividadretoacademico a on actividad.IdActividad = a.IdActividad)
) Z
                    ON A.IdActividad = Z.IdActividad WHERE Z.NumSemana = ?;

SELECT F.*,curso.Nombre FROM curso INNER JOIN (
    SELECT Z.*
FROM (SELECT actividadpersona.IdActividad
      FROM persona
               INNER JOIN actividadpersona ON persona.IdPersona = actividadpersona.IdPersona
      AND persona.IdPersona = ?) A
         INNER JOIN (
    SELECT actividad.*
    FROM actividad
    WHERE actividad.IdActividad NOT IN (
        SELECT actividad.IdActividad
        FROM actividad
                 INNER JOIN actividadretoacademico a on actividad.IdActividad = a.IdActividad)
) Z
                    ON A.IdActividad = Z.IdActividad WHERE Z.NumSemana = ?
    ) F ON F.IdCurso = curso.IdCurso;


