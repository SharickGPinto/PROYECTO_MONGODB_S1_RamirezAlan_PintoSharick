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

//CREANDO PROFESORES
db.createCollection("profesores", {
    validator:{
        $jsonSchema:{
            bsonType: "object",
            required: [
                "nombre",
                "numDocumento",
                "tipoDocumento",
                "numCelular",
                "estudios",
                "sede"
            ],
            properties:{
                _id: { bsonType: "objectId"},
                nombre: { bsonType: "string"},
                numDocumento: { bsonType: "int"},
                tipoDocumento: { bsonType: "string", enum:["CC", "TI", "CE", "PASS"]},
                numCelular: { bsonType: "int"},
                estudios: { 
                    bsonType: "array",
                    items: {bsonType: "string"},
                    minItems: 1
                },
                sede: { bsonType: "objectId"}
            }
        }
    }
});
//CREANDO COLECCION ESTUDIANTES
db.createCollection("estudiantes", {
    validator:{
        $jsonSchema:{
            bsonType: "object",
            required:[
                "nombre",
                "numDocumento",
                "tipoDocumento",
                "numCelular",
                "nivelMusical",
                "sede"
            ],
            properties:{
                _id: { bsonType: "objectId"},
                nombre: { bsonType: "string"},
                numDocumento: {bsonType: "int"},
                tipoDocumento: { bsonType: "string", enum:["CC", "TI", "CE", "PASS"]},
                numCelular: { bsonType: "int"},
                nivelMusical: { bsonType: "string"},
                sede: { bsonType: "objectId"}
            }
        }
    }
});

db.createCollection("instrumento", {
    validator:{
        $jsonSchema:{
            bsonType: "object",
            required: [
                "tipo",
                "sede_id",
                "estado"
            ],
            properties:{
                _id: { bsonType: "objectId"},
                tipo: {bsonType: "string", enum: [ "guitarra","piano","violin","bateria","bajo",
            "flauta","clarinete","saxofon","trompeta","trombon",
            "oboe","fagot","ukelele","mandolina","arpa",
            "teclado","acordeon","chelo","contrabajo","cajon"]},
                sede_id: { bsonType: "objectId"},
                estado: { bsonType: "string", enum:["activo", "desactivado"]}
            }
        }
    }
});