// Crear bases de datos //
use(campusMusic);

// CREAR LAS COLECCIONES 

//CREANDO LAS SEDES 

db.createCollection("sedes", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nombreSede", "ciudad", "direccion"],
            properties: {
                _id: { bsonType: "objectId" },
                nombreSede: { bsonType: "string" },
                ciudad: { bsonType: "string" },
                direccion: { bsonType: "string" }
            }
        }
    }
});
//CREANDO INDICE A SEDES
db.sedes.createIndex({nombreSede: 1}, {unique:true});
db.sedes.createIndex({ciudad:1});


//CREANDO CURSOS

db.createCollection("cursos", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "tipo",
                "sede_id",
                "nombreCurso",
                "cupos",
                "nivelReque",
                "costo",
                "fechaInicio",
                "fechaFin",
                "horario"
            ],
            properties: {
                _id: { bsonType: "objectId" },
                tipo: { bsonType: "string" },
                sede_id: { bsonType: "objectId" },
                nombreCurso: { bsonType: "string" },
                cupos: { bsonType: "int" },
                nivelReque: { bsonType: "string" },
                costo: { bsonType: "int" },
                fechaInicio: { bsonType: "date" },
                fechaFin: { bsonType: "date" },
                horario: { bsonType: "string" }
            }
        }
    }
});
// CREANDO INDICES DE CURSOS

db.cursos.createIndex({sede_id: 1, nombreCurso: 1}, {unique: true});
db.cursos.createIndex({sede_id: 1});
db.cursos.createIndex({fechaInicio: 1});

//CREANDO PROFESORES
db.createCollection("profesores", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "nombre",
                "numDocumento",
                "tipoDocumento",
                "numCelular",
                "estudios",
                "sede"
            ],
            properties: {
                _id: { bsonType: "objectId" },
                nombre: { bsonType: "string" },
                numDocumento: { bsonType: "int" },
                tipoDocumento: { bsonType: "string", enum: ["CC", "TI", "CE", "PASS"] },
                numCelular: { bsonType: "int" },
                estudios: {
                    bsonType: "array",
                    items: { bsonType: "string" },
                    minItems: 1
                },
                sede: { bsonType: "objectId" }
            }
        }
    }
});

// CREANDO INDICES DE PROFESORES

db.profesores.createIndex({numDocumento: 1}, {unique: true});
db.profesores.createIndex({sede: 1});

//CREANDO COLECCION ESTUDIANTES
db.createCollection("estudiantes", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "nombre",
                "numDocumento",
                "tipoDocumento",
                "numCelular",
                "nivelMusical",
                "sede"
            ],
            properties: {
                _id: { bsonType: "objectId" },
                nombre: { bsonType: "string" },
                numDocumento: { bsonType: "int" },
                tipoDocumento: { bsonType: "string", enum: ["CC", "TI", "CE", "PASS"] },
                numCelular: { bsonType: "int" },
                nivelMusical: { bsonType: "string" },
                sede: { bsonType: "objectId" }
            }
        }
    }
});

// CREANDO INDICES DE ESTUDIANTES
db.estudiantes.createIndex({numDocumento:1},{unique: true});
db.estudiantes.createIndex({sede: 1});


//CREAR COLECCION INSTRUMENTO
db.createCollection("instrumento", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "tipo",
                "sede_id",
                "estado"
            ],
            properties: {
                _id: { bsonType: "objectId" },
                tipo: {
                    bsonType: "string", enum: ["guitarra", "piano", "violin", "bateria", "bajo",
                        "flauta", "clarinete", "saxofon", "trompeta", "trombon",
                        "oboe", "fagot", "ukelele", "mandolina", "arpa",
                        "teclado", "acordeon", "chelo", "contrabajo", "cajon"]
                },
                sede_id: { bsonType: "objectId" },
                estado: { bsonType: "string", enum: ["activo", "desactivado"] }
            }
        }
    }
});

// CREANDO INDICES DE INSTRUMENTO

db.instrumento.createIndex({sede_id: 1}, {unique: true});
db.instrumento.createIndex({estado: 1});

//CREAR COLECCION DE INSCRIPCIOES
db.createCollection("inscripciones", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "curso_id",
                "estudiante_id"
            ],
            properties: {
                _id: { bsonType: "objectId" },
                curso_id: { bsonType: "objectId" },
                estudiante_id: { bsonType: "objectId" }
            }
        }
    }
});
// CREANDO INDICES DE INSCRIPCIONES
db.inscripciones.createIndex({cursos_id: 1, estudiante_id:1 }, {unique:1});
db.inscripciones.createIndex({cursos_id: 1 });
db.inscripciones.createIndex({estudiante_id: 1 });

// CREAR COLECCION DE RESERVA INSTRUMENTO
db.createCollection("reservaInstrumento", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "instrumento_id",
                "user_id",
                "fechaInicio",
                "fechaFin",
                "costo"
            ],
            properties: {
                _id: { bsonType: "objectId" },
                instrumento_id: { bsonType: "objectId" },
                user_id: { bsonType: "objectId" },
                fechaInicio: { bsonType: "date" },
                fechaFin: { bsonType: "date" },
                costo: { bsonType: "int" }
            }
        }
    }
});
// CREANDO INDICES DE INSTRUMENTO
db.reservaInstrumento.createIndex({instrumento_id:1});
db.reservaInstrumento.createIndex({user_id:1, fechaInicio: 1});

// CREAR COLECCION DE ADMINISTRADOR
db.createCollection("administrador", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "nombre",
                "numDocumento",
                "tipoDocumento"
            ],
            properties: {
                _id: { bsonType: "objectId" },
                nombre: { bsonType: "string" },
                numDocumento: { bsonType: "int" },
                tipoDocumento: { bsonType: "string", enum: ["CC", "TI", "CE", "PASS"] },

            }
        }
    }
});
// CREANDO INDICES DE ADMINISTRADOR
db.administrador.createIndex({numDocumento:1});


//CREAR COLECCION DE USUARIOS
db.createCollection("usuarios", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "user",
                "email",
                "password",
                "rol",
                "rol_id"
            ],
            properties: {
                _id: { bsonType: "objectId" },
                user: { bsonType: "string" },
                email: { bsonType: "string" },
                password: { bsonType: "string" },
                rol: { bsonType: "string", enum: ["ADMIN", "EMPLEADO", "ESTUDIANTE", "PROFESOR"] },
                rol_id: { bsonType: "objectId" }
            }
        }
    }
});
// CREANDO INDICES DE USUARIOS
db.usuarios.createIndex({email: 1}, {unique: true});
db.usuarios.createIndex({user:1}, {unique: true});
db.usuarios.createIndex({rol: 1});
db.usuarios.createIndex({ rol_id: 1 });

// CREAR COLECCION EMPLEADOS
db.createCollection("empleados", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "nombre",
                "numDocumento",
                "tipoDocumento",
                "numCelular",
                "sede"
            ],
            properties: {
                _id: { bsonType: "objectId" },
                nombre: { bsonType: "string" },
                numDocumento: { bsonType: "int" },
                tipoDocumento: { bsonType: "string", enum: ["CC", "TI", "CE", "PASS"] },
                numCelular: { bsonType: "int" },
                sede: { bsonType: "objectId" }
            }
        }
    }
});

// CREANDO INDICES DE EMPLEADO
db.empleado.createIndex({numDocumento: 1}, {unique:true});
db.empleado.createIndex({sede: 1});

// CREAR COLECCION ESPECIALIDAD
db.createCollection("especialidad", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "especialidad",
                "profesor_id"
            ],
            properties: {
                _id: { bsonType: "objectId" },
                especialidad: { bsonType: "string", enum: ["PIANO", "GUITARRA", "VIOLIN", "BATERIA", "BAJO", "CANTO", "TEORIA"] },
                profesor_id: { bsonType: "objectId" }
            }
        }
    }
});

// CREANDO INDICES DE ESPECIALIDAD
db.especialidad.createIndex({profesor_id: 1}, { unique: true});
