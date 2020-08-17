DROP DATABASE IF EXISTS CampusTecDB;
CREATE DATABASE IF NOT EXISTS CampusTecDB;
USE CampusTecDB;
CREATE TABLE IF NOT EXISTS Persona
(
    IdPersona   INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    Nombre      CHAR(20)                           NOT NULL,
    Apellido    CHAR(20)                           NOT NULL,
    Activo      BOOLEAN                            NOT NULL DEFAULT TRUE,
    NumTelefono INTEGER                            NOT NULL DEFAULT 0,
    Email1      CHAR(50)                           NOT NULL DEFAULT 'None',
    Email2      CHAR(50)                           NOT NULL DEFAULT 'None',
    PpUrl       CHAR(100)                          NOT NULL,
    Puesto      BOOLEAN                            NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS LogInInfo
(
    IdLoginInfo INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    IdPersona   INTEGER                            NOT NULL,
    Pin         CHAR(50)                           NOT NULL,
    Carne       CHAR(20)                           NOT NULL,
    Type        BOOLEAN                            NOT NULL DEFAULT FALSE,
    FOREIGN KEY (IdPersona) REFERENCES Persona (IdPersona)
);

CREATE TABLE IF NOT EXISTS RetoPsicologico
(
    IdRetoPsicologico INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    TecColones        INTEGER                            NOT NULL DEFAULT 0,
    Titulo            CHAR(50)                           NOT NULL

);
CREATE TABLE IF NOT EXISTS PreguntaPsico
(
    IdPreguntaPsico   INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    IdRetoPsicologico INTEGER                            NOT NULL,
    Pregunta          CHAR(50)                           NOT NULL,
    FOREIGN KEY (IdRetoPsicologico) REFERENCES RetoPsicologico (IdRetoPsicologico)
);
CREATE TABLE IF NOT EXISTS Respuesta
(
    IdRespuesta     INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    IdPreguntaPsico INTEGER                            NOT NULL,
    Respuesta       CHAR(50)                           NOT NULL,
    FOREIGN KEY (IdPreguntaPsico) REFERENCES PreguntaPsico (IdPreguntaPsico)
);
CREATE TABLE IF NOT EXISTS Resultado
(
    IdResultado       INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    IdRetoPsicologico INTEGER                            NOT NULL,
    FOREIGN KEY (IdRetoPsicologico) REFERENCES RetoPsicologico (IdRetoPsicologico)
);
CREATE TABLE IF NOT EXISTS RespuestaPregunta
(
    IdResultado     INTEGER NOT NULL,
    IdPreguntaPsico INTEGER NOT NULL,
    IdRespuesta     INTEGER NOT NULL,
    FOREIGN KEY (IdResultado) REFERENCES Resultado (IdResultado),
    FOREIGN KEY (IdPreguntaPsico) REFERENCES PreguntaPsico (IdPreguntaPsico),
    FOREIGN KEY (IdRespuesta) REFERENCES Respuesta (IdRespuesta)
);
CREATE TABLE IF NOT EXISTS ResultadoPersona
(
    IdPersona   INTEGER NOT NULL,
    IdResultado INTEGER NOT NULL,
    FOREIGN KEY (IdPersona) REFERENCES Persona (IdPersona),
    FOREIGN KEY (IdResultado) REFERENCES Resultado (IdResultado)
);
CREATE TABLE IF NOT EXISTS Cuenta
(
    IdCuenta   INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    TecColones INTEGER                            NOT NULL DEFAULT 0,
    IdPersona  INTEGER                            NOT NULL,
    FOREIGN KEY (IdPersona) REFERENCES Persona (IdPersona)
);

CREATE TABLE IF NOT EXISTS Sede
(
    IdSede INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    Nombre CHAR(50)                           NOT NULL
);

CREATE TABLE IF NOT EXISTS SedePersona
(
    IdPersona INTEGER NOT NULL,
    IdSede    INTEGER NOT NULL,
    Valid     BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (IdPersona) REFERENCES Persona (IdPersona),
    FOREIGN KEY (IdSede) REFERENCES Sede (IdSede)
);

CREATE TABLE IF NOT EXISTS Universidad
(
    IdUniversidad INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    Nombre        CHAR(50)                           NOT NULL
);
CREATE TABLE IF NOT EXISTS UniversidadPersona
(
    IdPersona     INTEGER NOT NULL,
    FOREIGN KEY (IdPersona) REFERENCES Persona (IdPersona),
    IdUniversidad INTEGER NOT NULL,
    FOREIGN KEY (IdUniversidad) REFERENCES Universidad (IdUniversidad)
);
CREATE TABLE IF NOT EXISTS Semestre
(
    IdSemestre INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    Nombre     CHAR(50)                           NOT NULL
);
CREATE TABLE IF NOT EXISTS Curso
(
    IdCurso    INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    Nombre     CHAR(50)                           NOT NULL,
    Numero     INTEGER                            NOT NULL,
    TecColones INTEGER                            NOT NULL DEFAULT 0,
    IdSemestre INTEGER                            NOT NULL,
    FOREIGN KEY (IdSemestre) REFERENCES Semestre (IdSemestre)
);

CREATE TABLE IF NOT EXISTS CursoPersona
(
    IdCurso   INTEGER NOT NULL,
    IdPersona INTEGER NOT NULL,
    Valid     BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (IdPersona) REFERENCES Persona (IdPersona),
    FOREIGN KEY (IdCurso) REFERENCES Curso (IdCurso)
);
CREATE TABLE IF NOT EXISTS Objetivo
(
    IdObjetivo  INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    Descripcion CHAR(200)                          NOT NULL,
    IdCurso     INTEGER                            NOT NULL,
    FOREIGN KEY (IdCurso) REFERENCES Curso (IdCurso)
);
CREATE TABLE IF NOT EXISTS RetoAcademico
(
    IdRetoAcademico INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    Descripcion     TEXT(500)                          NOT NULL,
    Titulo          CHAR(50)                           NOT NULL,
    TecColones      INTEGER DEFAULT 0,
    IdCurso         INTEGER                            NOT NULL,
    FOREIGN KEY (IdCurso) REFERENCES Curso (IdCurso)
);
CREATE TABLE IF NOT EXISTS File
(
    IdFile   INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    FileURL  CHAR(100)                          NOT NULL,
    Filename CHAR(100)                          NOT NULL,
    Valid    BOOLEAN                            NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS ObjetivoReto
(
    IdObjetivo INTEGER NOT NULL,
    IdReto     INTEGER NOT NULL,
    FOREIGN KEY (IdObjetivo) REFERENCES Objetivo (IdObjetivo),
    FOREIGN KEY (IdReto) REFERENCES RetoAcademico (IdRetoAcademico)

);

CREATE TABLE IF NOT EXISTS Actividad
(
    IdActividad INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    IdFile      INTEGER                            NOT NULL,
    NumSemana   INTEGER                            NOT NULL DEFAULT 1,
    TecColones  INTEGER                            NOT NULL DEFAULT 0,
    Fecha       CHAR(30)                           NOT NULL DEFAULT '12/12/2020',
    Titulo      CHAR(100)                          not null,
    Descripcion TEXT(500)                          NOT NULL,
    IdCurso     INTEGER                            NOT NULL,
    FOREIGN KEY (IdCurso) REFERENCES Curso (IdCurso),
    FOREIGN KEY (IdFile) REFERENCES File (IdFile)
);

CREATE TABLE IF NOT EXISTS ActividadPersona
(
    IdActividad INTEGER NOT NULL,
    IdPersona   INTEGER NOT NULL,
    Completado  BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (IdActividad) REFERENCES Actividad (IdActividad),
    FOREIGN KEY (IdPersona) REFERENCES Persona (IdPersona)
);

CREATE TABLE IF NOT EXISTS RetoAcademicoPersona
(
    IdRetoAcademico INTEGER NOT NULL,
    IdPersona       INTEGER NOT NULL,
    Completado      BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (IdRetoAcademico) REFERENCES RetoAcademico (IdRetoAcademico),
    FOREIGN KEY (IdPersona) REFERENCES Persona (IdPersona)
);

CREATE TABLE IF NOT EXISTS ActividadRetoAcademico
(
    IdRetoAcademico INTEGER NOT NULL,
    IdActividad     INTEGER NOT NULL,
    FOREIGN KEY (IdRetoAcademico) REFERENCES RetoAcademico (IdRetoAcademico),
    FOREIGN KEY (IdActividad) REFERENCES Actividad (IdActividad)
);

CREATE TABLE IF NOT EXISTS Tarea
(
    IdTarea     INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    IdPersona   INTEGER                            NOT NULL,
    IdActividad INTEGER                            NOT NULL,
    Titulo      CHAR(50)                           NOT NULL,
    semana      INTEGER                            NOT NULL,
    NumDia      INTEGER                            NOT NULL,
    Descripcion TEXT(300)                          NOT NULL,
    Completado  BOOLEAN                            NOT NULL DEFAULT FALSE,
    Hora        INTEGER                            NOT NULL,
    FOREIGN KEY (IdPersona) REFERENCES Persona (IdPersona),
    FOREIGN KEY (IdActividad) REFERENCES Actividad (IdActividad)
);

CREATE TABLE IF NOT EXISTS Comentario
(
    IdComentairo INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    IdFile       INTEGER,
    IdActividad  INTEGER                            NOT NULL,
    Comentario   TEXT(300)                          NOT NULL,
    IdPersona    INTEGER                            NOT NULL,
    Fecha        CHAR(10)                           NOT NULL DEFAULT '12/12/2020',
    Hora         CHAR(10)                           NOT NULL,
    FOREIGN KEY (IdActividad) REFERENCES Actividad (IdActividad),
    FOREIGN KEY (IdPersona) REFERENCES Persona (IdPersona),
    FOREIGN KEY (IdFile) REFERENCES File (IdFile)
);

CREATE TABLE IF NOT EXISTS PersonaReto
(
    IdRetoAcademico INTEGER NOT NULL,
    IdPersona       INTEGER NOT NULL,
    Completado      BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (IdRetoAcademico) REFERENCES RetoAcademico (IdRetoAcademico),
    FOREIGN KEY (IdPersona) REFERENCES Persona (IdPersona)
);
