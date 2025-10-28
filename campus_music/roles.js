use CampusMusic;


// Administrador
db.createRole({
    role: "administrador",
    privileges: [],
    roles: [
        { role: "readWrite", db: "CampusMusic" }, // Leer y escribir
        { role: "dbAdmin", db: "CampusMusic" }, // Administrar estructura de las colecciones
        { role: "userAdmin", db: "CampusMusic" } // Administrar roles
    ]
});


// Empleado
db.createRole({
    role: "empleadoSede",
    privileges: [
        // Lecturas necesarias
        { resource: { db: "CampusMusic", collection: "Estudiantes" }, actions: ["find"] },
        { resource: { db: "CampusMusic", collection: "Profesores" }, actions: ["find"] },
        { resource: { db: "CampusMusic", collection: "Cursos" }, actions: ["find", "update"] }, // update para cuposDisponibles
        { resource: { db: "CampusMusic", collection: "Instrumentos" }, actions: ["find"] },

        // Registros que puede crear
        { resource: { db: "CampusMusic", collection: "Inscripciones" }, actions: ["insert", "find"] },
        { resource: { db: "CampusMusic", collection: "ReservaInstrumentos" }, actions: ["insert", "find"] }
    ],
    roles: []
});

// Estudiante
db.createRole({
    role: "estudiante",
    privileges: [
        { resource: { db: "CampusMusic", collection: "Estudiantes" }, actions: ["find"] }, // Leer su propia información
        { resource: { db: "CampusMusic", collection: "Cursos" }, actions: ["find"] }, // Consultar cursos disponibles
        { resource: { db: "CampusMusic", collection: "Inscripciones" }, actions: ["find"] }, // Consultar historial de inscripciones
        { resource: { db: "CampusMusic", collection: "Instrumentos" }, actions: ["find"] }, // Consultar instrumentos
        { resource: { db: "CampusMusic", collection: "ReservaInstrumentos" }, actions: ["insert", "find"] } // Reservar instrumentos
    ],
    roles: []
});

// Asignar Roles

// =====================
// ADMINISTRADORES (3)
// =====================
db.createUser({
  user: "admin.carolina",
  pwd:  "Adm!n2025#cd",
  roles: [{ role: "administrador", db: "CampusMusic" }]
});

db.createUser({
  user: "admin.esteban",
  pwd:  "Adm!n2025#ea",
  roles: [{ role: "administrador", db: "CampusMusic" }]
});

db.createUser({
  user: "admin.nora",
  pwd:  "Adm!n2025#nv",
  roles: [{ role: "administrador", db: "CampusMusic" }]
});

// =====================
// EMPLEADOS (3)
// =====================
db.createUser({
  user: "empleado.julio",
  pwd:  "Empl2025#jc",
  roles: [{ role: "empleadoSede", db: "CampusMusic" }]
});

db.createUser({
  user: "empleado.ximena",
  pwd:  "Empl2025#xp",
  roles: [{ role: "empleadoSede", db: "CampusMusic" }]
});

db.createUser({
  user: "empleado.fernando",
  pwd:  "Empl2025#fh",
  roles: [{ role: "empleadoSede", db: "CampusMusic" }]
});

// =====================
// PROFESORES (10)
// (por ahora: solo lectura en CampusMusic)
// =====================
db.createUser({
  user: "prof.ana.torres",
  pwd:  "Prof2025#01",
  roles: [{ role: "read", db: "CampusMusic" }]
});

db.createUser({
  user: "prof.luis.perez",
  pwd:  "Prof2025#02",
  roles: [{ role: "read", db: "CampusMusic" }]
});

db.createUser({
  user: "prof.carlos.rios",
  pwd:  "Prof2025#03",
  roles: [{ role: "read", db: "CampusMusic" }]
});

db.createUser({
  user: "prof.paula.diaz",
  pwd:  "Prof2025#04",
  roles: [{ role: "read", db: "CampusMusic" }]
});

db.createUser({
  user: "prof.maria.gomez",
  pwd:  "Prof2025#05",
  roles: [{ role: "read", db: "CampusMusic" }]
});

db.createUser({
  user: "prof.javier.leon",
  pwd:  "Prof2025#06",
  roles: [{ role: "read", db: "CampusMusic" }]
});

db.createUser({
  user: "prof.sofia.medina",
  pwd:  "Prof2025#07",
  roles: [{ role: "read", db: "CampusMusic" }]
});

db.createUser({
  user: "prof.diego.sanchez",
  pwd:  "Prof2025#08",
  roles: [{ role: "read", db: "CampusMusic" }]
});

db.createUser({
  user: "prof.laura.castillo",
  pwd:  "Prof2025#09",
  roles: [{ role: "read", db: "CampusMusic" }]
});

db.createUser({
  user: "prof.andres.mora",
  pwd:  "Prof2025#10",
  roles: [{ role: "read", db: "CampusMusic" }]
});

// =====================
// ESTUDIANTES (15)
// =====================
db.createUser({
  user: "est.mateo.lopez",
  pwd:  "Est2025#01",
  roles: [{ role: "estudiante", db: "CampusMusic" }]
});

db.createUser({
  user: "est.valentina.ruiz",
  pwd:  "Est2025#02",
  roles: [{ role: "estudiante", db: "CampusMusic" }]
});

db.createUser({
  user: "est.santiago.herrera",
  pwd:  "Est2025#03",
  roles: [{ role: "estudiante", db: "CampusMusic" }]
});

db.createUser({
  user: "est.isabella.ortiz",
  pwd:  "Est2025#04",
  roles: [{ role: "estudiante", db: "CampusMusic" }]
});

db.createUser({
  user: "est.samuel.ramirez",
  pwd:  "Est2025#05",
  roles: [{ role: "estudiante", db: "CampusMusic" }]
});

db.createUser({
  user: "est.mariana.cardenas",
  pwd:  "Est2025#06",
  roles: [{ role: "estudiante", db: "CampusMusic" }]
});

db.createUser({
  user: "est.emiliano.vargas",
  pwd:  "Est2025#07",
  roles: [{ role: "estudiante", db: "CampusMusic" }]
});

db.createUser({
  user: "est.luciana.pena",
  pwd:  "Est2025#08",
  roles: [{ role: "estudiante", db: "CampusMusic" }]
});

db.createUser({
  user: "est.juanjose.castro",
  pwd:  "Est2025#09",
  roles: [{ role: "estudiante", db: "CampusMusic" }]
});

db.createUser({
  user: "est.salome.rincon",
  pwd:  "Est2025#10",
  roles: [{ role: "estudiante", db: "CampusMusic" }]
});

db.createUser({
  user: "est.tomas.quintero",
  pwd:  "Est2025#11",
  roles: [{ role: "estudiante", db: "CampusMusic" }]
});

db.createUser({
  user: "est.paulina.gil",
  pwd:  "Est2025#12",
  roles: [{ role: "estudiante", db: "CampusMusic" }]
});

db.createUser({
  user: "est.miguel.prada",
  pwd:  "Est2025#13",
  roles: [{ role: "estudiante", db: "CampusMusic" }]
});

db.createUser({
  user: "est.sara.chacon",
  pwd:  "Est2025#14",
  roles: [{ role: "estudiante", db: "CampusMusic" }]
});

db.createUser({
  user: "est.daniela.diaz",
  pwd:  "Est2025#15",
  roles: [{ role: "estudiante", db: "CampusMusic" }]
});