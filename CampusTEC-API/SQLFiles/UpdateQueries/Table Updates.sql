UPDATE persona
SET Nombre      =?,
    Apellido    =?,
    NumTelefono =?,
    Email1      =?,
    Email2      =?,
    PpUrl       =?
WHERE IdPersona = ?;

UPDATE actividadpersona
SET Completado = ?
WHERE IdActividad = ?
  AND IdPersona = ?;


UPDATE personareto
SET Completado = ?
WHERE IdRetoAcademico = ?
  AND IdPersona = ?;

UPDATE tarea
SET Hora   = ?,
    semana = ?,
    NumDia = ?
WHERE tarea.IdTarea = ?;

UPDATE cuenta
SET TecColones= ? + TecColones
WHERE IdPersona = ?;
UPDATE personareto
SET Completado = ?
WHERE IdPersona = ?
  AND IdRetoAcademico = ?;
UPDATE presupuestoteccolones
SET TecColones = TecColones - ?
WHERE IdPresupuesto = ?;

SELECT actividad.*
FROM actividad
         INNER JOIN actividadretoacademico ar ON Actividad.IdActividad = ar.IdActividad
WHERE ar.IdRetoAcademico = ?;


SELECT *
FROM personareto
         INNER JOIN persona p on personareto.IdPersona = p.IdPersona
WHERE personareto.IdRetoAcademico = ?;
SELECT retoacademicopersona.IdRetoAcademico
FROM retoacademicopersona
         INNER JOIN persona p on retoacademicopersona.IdPersona = p.IdPersona
WHERE p.IdPersona = ?;



SELECT actividadretoacademico.IdActividad
FROM actividadretoacademico
         INNER JOIN (SELECT retoacademicopersona.IdRetoAcademico
                     FROM retoacademicopersona
                              INNER JOIN persona p on retoacademicopersona.IdPersona = p.IdPersona
                     WHERE p.IdPersona = ?
) A ON A.IdRetoAcademico = actividadretoacademico.IdRetoAcademico;
SELECT tarea.*, a.Titulo FROM tarea INNER JOIN actividad a on
                tarea.IdActividad = a.IdActividad WHERE tarea.IdTarea = ?;

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


SELECT objetivo.* FROM objetivo INNER join objetivoreto
             o on objetivo.IdObjetivo = o.IdObjetivo where o.IdReto = ?;

SELECT * FROM logininfo c WHERE c.Carne=? AND c.Pin = ?;

SELECT * FROM persona WHERE persona.IdPersona = ?;

SELECT * FROM cuenta where cuenta.IdPersona = ?;

SELECT s.*
                FROM sedepersona
                         INNER JOIN sede s on sedepersona.IdSede = s.IdSede
                WHERE sedepersona.IdPersona = ?;


