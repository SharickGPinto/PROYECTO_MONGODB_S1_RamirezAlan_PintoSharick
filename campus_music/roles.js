use admin;

// Administrador
db.createRole({
    role: "administrador",
    privileges: [
      {
        resource: { db: "CampusMusic", collection: "" }, // todas las colecciones
        actions: ["find", "insert", "update", "remove"]
      }
    ],
    roles: [
      { role: "readWrite", db: "CampusMusic" },
      { role: "userAdminAnyDatabase", db: "admin" } // puede crear usuarios y roles
    ]
  });
  
  
  // Empleado
  db.createRole({
    role: "empleadoSede",
    privileges: [
      // Puede leer estudiantes, profesores y cursos
      {
        resource: { db: "CampusMusic", collection: "Estudiantes" },
        actions: ["find"]
      },
      {
        resource: { db: "CampusMusic", collection: "Profesores" },
        actions: ["find"]
      },
      {
        resource: { db: "CampusMusic", collection: "Cursos" },
        actions: ["find"]
      },
      // Puede registrar inscripciones
      {
        resource: { db: "CampusMusic", collection: "Inscripciones" },
        actions: ["insert", "find"]
      },
      // Puede registrar reservas
      {
        resource: { db: "CampusMusic", collection: "ReservaInstrumentos" },
        actions: ["insert", "find"]
      }
    ],
    roles: []
  });
  
  
  // Estudiante
  db.createRole({
    role: "estudiante",
    privileges: [
      // Leer su propia información
      {
        resource: { db: "CampusMusic", collection: "Estudiantes" },
        actions: ["find"]
      },
      // Consultar cursos disponibles
      {
        resource: { db: "CampusMusic", collection: "Cursos" },
        actions: ["find"]
      },
      // Consultar su historial de inscripciones
      {
        resource: { db: "CampusMusic", collection: "Inscripciones" },
        actions: ["find"]
      },
      // Reservar instrumentos
      {
        resource: { db: "CampusMusic", collection: "ReservaInstrumentos" },
        actions: ["insert", "find"]
      }
    ],
    roles: []
  });