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

update