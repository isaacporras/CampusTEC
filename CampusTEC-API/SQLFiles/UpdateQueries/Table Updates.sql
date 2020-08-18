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

SELECT actividad.*
FROM actividad
         INNER JOIN (SELECT actividadretoacademico.IdActividad
                     FROM actividadretoacademico
                              INNER JOIN (SELECT retoacademicopersona.IdRetoAcademico
                                          FROM retoacademicopersona
                                                   INNER JOIN persona p on retoacademicopersona.IdPersona = p.IdPersona
                                          WHERE p.IdPersona = ?
                     ) A ON A.IdRetoAcademico = actividadretoacademico.IdRetoAcademico) Z
                    ON Z.IdActividad = actividad.IdActividad
WHERE actividad.NumSemana = ?;