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


SELECT X.*,logininfo.Carne
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


SELECT logininfo.Carne FROM logininfo WHERE logininfo.IdPersona = ?;