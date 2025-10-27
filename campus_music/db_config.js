// Crear base de datos
use(CampusMusic);

// Crear colecciones con esquema validator y Índices

// Usuarios
db.createCollection("Usuarios", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["user", "email", "password", "rol", "ref_id"],
      properties: {
        _id: { bsonType: "objectId" },
        user: {
          bsonType: "string",
          description: "Nombre de usuario único"
        },
        email: {
          bsonType: "string",
          pattern: "^.+@.+\\..+$",
          description: "Correo electrónico válido"
        },
        password: {
          bsonType: "string",
          minLength: 8,
          description: "Contraseña en texto"
        },
        rol: {
          bsonType: "string",
          enum: ["administrador", "empleado", "profesor", "estudiante"],
          description: "Rol del usuario dentro del sistema"
        },
        ref_id: {
          bsonType: "objectId",
          description: "Referencia al documento en su colección correspondiente"
        }
      }
    }
  }
});

// Índices de usuarios
db.usuarios.createIndex({ email: 1 }, { unique: true });
db.usuarios.createIndex({ user: 1 }, { unique: true });
db.usuarios.createIndex({ rol: 1 });
db.usuarios.createIndex({ ref_id: 1 });

// Sedes
db.createCollection("Sedes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombreSede", "ciudad", "direccion", "telefono"],
      properties: {
        _id: { bsonType: "objectId" },
        nombreSede: {
          bsonType: "string",
          description: "Nombre de la sede"
        },
        ciudad: {  
          bsonType: "string",
          enum: ["Bogotá","Medellín","Cali"],
          description: "Ciudad donde se encuentra la sede"
        },
        direccion: {
          bsonType: "string",
          description: "Dirección física de la sede"
        },
        telefono: {
          bsonType: "string",
          description: "Número de contacto de la sede"
        }
      }
    }
  }
});

// Índices de sedes
db.sedes.createIndex({ nombreSede: 1, ciudad: 1 }, { unique: true }); // Evita duplicados en la misma ciudad
db.sedes.createIndex({ ciudad: 1 });
db.sedes.createIndex({ nombreSede: 1 });

// Profesores
db.createCollection("Profesores", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "nombre",
        "numDocumento",
        "tipoDocumento",
        "telefono",
        "estudios",
        "especialidades",
        "sede_id"
      ],
      properties: {
        _id: { bsonType: "objectId" },
        nombre: {
          bsonType: "string",
          description: "Nombre completo del profesor"
        },
        numDocumento: {
          bsonType: "int",
          description: "Número de documento del profesor"
        },
        tipoDocumento: {
          bsonType: "string",
          enum: ["CC", "TI", "CE", "PPT", "PEP", "Pasaporte"],
          description: "Tipo de documento de identidad"
        },
        telefono: {
          bsonType: "string",
          description: "Número de contacto"
        },
        estudios: {
          bsonType: "array",
          items: { bsonType: "string" },
          description: "Lista de títulos o certificaciones del profesor"
        },
        especialidades: {
          bsonType: "array",
          items: {
            bsonType: "string",
            enum: [
              "piano",
              "guitarra",
              "bajo",
              "batería",
              "violín",
              "canto",
              "saxofón",
              "trompeta",
              "composición",
              "producción musical"
            ]
          },
          description: "Instrumentos o áreas de especialización"
        },
        sede_id: {
          bsonType: "objectId",
          description: "Referencia a la sede donde trabaja"
        }
      }
    }
  }
});

// Índices de profesores
db.profesores.createIndex({ numDocumento: 1, tipoDocumento: 1 }, { unique: true });
db.profesores.createIndex({ nombre: 1 });
db.profesores.createIndex({ sede_id: 1 });
db.profesores.createIndex({ especialidades: 1 });

// Estudiantes
db.createCollection("Estudiantes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "nombre",
        "numDocumento",
        "tipoDocumento",
        "telefono",
        "nivelMusical",
        "sede_id"
      ],
      properties: {
        _id: { bsonType: "objectId" },
        nombre: {
          bsonType: "string",
          description: "Nombre completo del estudiante"
        },
        numDocumento: {
          bsonType: "int",
          description: "Número de documento del estudiante"
        },
        tipoDocumento: {
          bsonType: "string",
          enum: ["CC", "TI", "CE", "PPT", "PEP", "Pasaporte"],
          description: "Tipo de documento de identidad"
        },
        telefono: {
          bsonType: "string",
          description: "Número de contacto del estudiante"
        },
        nivelMusical: {
          bsonType: "string",
          enum: ["principiante", "intermedio", "avanzado"],
          description: "Nivel musical actual del estudiante"
        },
        sede_id: {
          bsonType: "objectId",
          description: "Referencia a la sede donde está inscrito"
        }
      }
    }
  }
});

// Índices de estudiantes
db.estudiantes.createIndex({ numDocumento: 1, tipoDocumento: 1 }, { unique: true });
db.estudiantes.createIndex({ nombre: 1 });
db.estudiantes.createIndex({ sede_id: 1 });
db.estudiantes.createIndex({ nivelMusical: 1 });

// Empleados
db.createCollection("Empleados", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "nombre",
        "numDocumento",
        "tipoDocumento",
        "telefono",
        "sede_id"
      ],
      properties: {
        _id: { bsonType: "objectId" },
        nombre: {
          bsonType: "string",
          description: "Nombre completo del empleado"
        },
        numDocumento: {
          bsonType: "int",
          description: "Número de documento del empleado"
        },
        tipoDocumento: {
          bsonType: "string",
          enum: ["CC", "TI", "CE", "PPT", "PEP", "Pasaporte"],
          description: "Tipo de documento de identidad"
        },
        telefono: {
          bsonType: "string",
          description: "Número de contacto del empleado"
        },
        sede_id: {
          bsonType: "objectId",
          description: "Referencia a la sede donde trabaja"
        }
      }
    }
  }
});

// Índices de empleados
db.empleados.createIndex({ numDocumento: 1, tipoDocumento: 1 }, { unique: true });
db.empleados.createIndex({ nombre: 1 });
db.empleados.createIndex({ sede_id: 1 });

// Administradores
db.createCollection("Administradores", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "numDocumento", "tipoDocumento", "telefono"],
      properties: {
        _id: { bsonType: "objectId" },
        nombre: {
          bsonType: "string",
          description: "Nombre completo del administrador"
        },
        numDocumento: {
          bsonType: "int",
          description: "Número de documento del administrador"
        },
        tipoDocumento: {
          bsonType: "string",
          enum: ["CC", "TI", "CE", "PPT", "PEP", "Pasaporte"],
          description: "Tipo de documento de identidad"
        },
        telefono: {
          bsonType: "string",
          description: "Número de contacto del administrador"
        }
      }
    }
  }
});

// Índices de administradores
db.administradores.createIndex({ numDocumento: 1, tipoDocumento: 1 }, { unique: true });
db.administradores.createIndex({ nombre: 1 });

// Colección Cursos
db.createCollection("Cursos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "nombreCurso",
        "instrumento",
        "nivel",
        "profesor_id",
        "sede_id",
        "cupoMaximo",
        "cuposDisponibles",
        "costo",
        "fechaInicio",
        "fechaFin",
        "horario"
      ],
      properties: {
        _id: { bsonType: "objectId" },
        nombreCurso: {
          bsonType: "string",
          description: "Nombre del curso"
        },
        instrumento: {
          bsonType: "string",
          enum: [
            "piano",
            "guitarra",
            "bajo",
            "batería",
            "violín",
            "canto",
            "saxofón",
            "trompeta",
            "composición",
            "producción musical"
          ],
          description: "Instrumento o área del curso"
        },
        nivel: {
          bsonType: "string",
          enum: ["principiante", "intermedio", "avanzado"],
          description: "Nivel requerido del curso"
        },
        profesor_id: {
          bsonType: "objectId",
          description: "Referencia al profesor que imparte el curso"
        },
        sede_id: {
          bsonType: "objectId",
          description: "Referencia a la sede donde se ofrece el curso"
        },
        cupoMaximo: {
          bsonType: "int",
          minimum: 1,
          description: "Número máximo de estudiantes por curso"
        },
        cuposDisponibles: {
          bsonType: "int",
          minimum: 0,
          description: "Número de cupos actualmente disponibles"
        },
        costo: {
          bsonType: "int",
          minimum: 0,
          description: "Costo del curso"
        },
        fechaInicio: {
          bsonType: "date",
          description: "Fecha de inicio del curso"
        },
        fechaFin: {
          bsonType: "date",
          description: "Fecha de finalización del curso"
        },
        horario: {
          bsonType: "array",
          minItems: 1,
          items: {
            bsonType: "object",
            required: ["dia", "horaInicio", "horaFin"],
            properties: {
              dia: {
                bsonType: "string",
                enum: ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"],
                description: "Día de la semana del curso"
              },
              horaInicio: {
                bsonType: "string",
                pattern: "^([01]\\d|2[0-3]):([0-5]\\d)$",
                description: "Hora de inicio (HH:MM)"
              },
              horaFin: {
                bsonType: "string",
                pattern: "^([01]\\d|2[0-3]):([0-5]\\d)$",
                description: "Hora de fin (HH:MM)"
              }
            }
          }
        }
      }
    }
  }
});

// Índices
db.cursos.createIndex({ sede_id: 1, fechaInicio: 1, fechaFin: 1, nombreCurso: 1 });
db.cursos.createIndex({ profesor_id: 1 });
db.cursos.createIndex({ instrumento: 1 });
db.cursos.createIndex({ nivel: 1 });

// Colección Inscripciones
db.createCollection("Inscripciones", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["estudiante_id", "curso_id", "fecha"],
      properties: {
        _id: { bsonType: "objectId" },
        estudiante_id: {
          bsonType: "objectId",
          description: "Referencia al estudiante que se inscribe"
        },
        curso_id: {
          bsonType: "objectId",
          description: "Referencia al curso en el que se inscribe"
        },
        fecha: {
          bsonType: "date",
          description: "Fecha de la inscripción"
        }
      }
    }
  }
});

// Índices
db.inscripciones.createIndex({ estudiante_id: 1 });
db.inscripciones.createIndex({ curso_id: 1 });
db.inscripciones.createIndex({ estudiante_id: 1, curso_id: 1 }, { unique: true });

// Colección Instrumentos
db.createCollection("Instrumentos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["tipo", "sede_id"],
      properties: {
        _id: { bsonType: "objectId" },
        tipo: {
          bsonType: "string",
          enum: [
            "piano",
            "guitarra",
            "bajo",
            "batería",
            "violín",
            "canto",
            "saxofón",
            "trompeta"
          ],
          description: "Tipo de instrumento"
        },
        sede_id: {
          bsonType: "objectId",
          description: "Referencia a la sede donde se encuentra el instrumento"
        }
      }
    }
  }
});

// Índices
db.instrumentos.createIndex({ tipo: 1 });
db.instrumentos.createIndex({ sede_id: 1 });

// Colección ReservaInstrumento
db.createCollection("ReservaInstrumentos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["instrumento_id", "estudiante_id", "fechaInicio", "fechaFin", "costo"],
      properties: {
        _id: { bsonType: "objectId" },
        instrumento_id: {
          bsonType: "objectId",
          description: "Referencia al instrumento reservado"
        },
        estudiante_id: {
          bsonType: "objectId",
          description: "Referencia al estudiante que realiza la reserva"
        },
        fechaInicio: {
          bsonType: "date",
          description: "Fecha de inicio de la reserva"
        },
        fechaFin: {
          bsonType: "date",
          description: "Fecha de fin de la reserva"
        },
        costo: {
          bsonType: "int",
          minimum: 0,
          description: "Costo de la reserva"
        }
      }
    }
  }
});

// Índices
db.reservaInstrumentos.createIndex({ instrumento_id: 1 });
db.reservaInstrumentos.createIndex({ estudiante_id: 1 });
db.reservaInstrumentos.createIndex({ fechaInicio: 1, fechaFin: 1 });