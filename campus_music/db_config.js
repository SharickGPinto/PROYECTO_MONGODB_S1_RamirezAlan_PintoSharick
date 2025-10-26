// Crear bases de datos //
use(campusMusic);

// CREAR LAS COLECCIONES //
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
