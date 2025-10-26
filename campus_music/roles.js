//ENTRAR A ADMIN EN MONGODB PARA DEFINIR LOS ROLES

use(admin);
// ADMINISTRADOR: ACCESO TOTAL
db.createRole({
    role: "administrador",
    privileges: [
        {
            resource: {
                db: "campusMusic", collection: ""
            },
            actions: [
                "find", "insert", "update", "remove", "createCollection", "dropCollection", "createIndex", "dropIndex"
            ]
        }
    ],
    roles: []
});
// ESTUDIANTE MIRAR INFORMACION: INSCRIBIRSE, RESERVAR
db.createRole({
    role: "estudiantes",
    privileges: [
        {
            resource: {
                db: "campusMusic", collection: "sedes"
            },
            actions: ["find"]
        },
        {
            resource: {
                db: "campusMusic", collection: "cursos"
            },
            actions: ["find"]
        },
        {
            resource: {
                db: "campusMusic", collection: "profesores"
            },
            actions: ["find"]
        },
        {
            resource: {
                db: "campusMusic", collection: "instrumento"
            },
            actions: ["find"]
        },
        {
            resource: {
                db: "campusMusic", collection: "usuarios"
            },
            actions: ["find"]
        },
        {
            resource: {
                db: "campusMusic", collection: "reservaInstrumento"
            },
            actions: ["find", "insert", "update"]
        },
        {
            resource: {
                db: "campusMusic", collection: "inscripciones"
            },
            actions: ["find", "insert"]
        }

    ],
    roles: []
});

db.createRole({
    role: "profesores",
    privileges: [
        {
            resource: {
                db: "campusMusic", collection: "cursos"
            },
            actions: ["find", "update"]
        },
        {
            resource: {
                db: "campusMusic", collection: "inscripciones"
            },
            actions: ["find"]
        },

        {
            resource: {
                db: "campusMusic", collection: "estudiantes"
            },
            actions: ["find"]
        }
    ],
    roles: []
});