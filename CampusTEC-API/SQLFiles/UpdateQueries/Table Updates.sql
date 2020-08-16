UPDATE persona  SET
    Nombre      =?,
    Apellido    =?,
    NumTelefono =?,
    Email1      =?,
    Email2      =?,
    PpUrl       =?
    WHERE  IdPersona=?;

UPDATE actividadpersona SET
Completado = ? WHERE IdActividad = ? AND IdPersona=?;


UPDATE personareto SET
Completado = ? WHERE IdRetoAcademico = ? AND IdPersona=?;

UPDATE tarea SET
Hora = ?, semana = ?, NumDia = ?
WHERE tarea.IdTarea =?;
