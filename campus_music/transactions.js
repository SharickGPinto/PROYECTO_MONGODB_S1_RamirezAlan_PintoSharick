/*El primer paso para trabajar con transacciones es iniciar una sesión, 
lo cual se hace utilizando startSession() 
A través de la variable session, se accede a la base de datos y su
colección, ahora asociadas a esa sesión en particular. Una vez establecida 
la sesión, el siguiente paso es iniciar la transacción propiamente dicha, 
utilizando el método startTransaction(): */

const session = db.getMongo().startSession();
const Cursos = session.getDatabase("CampusMusic");

session.startTransaction();
//Con la transacción activa, se procede a ejecutar las operaciones deseadas.

db.Estudiantes.insertOne({
    nombre: "Brenda Núñez",
    numDocumento: 30030016,
    tipoDocumento: "CC",
    telefono: "3102223344",
    nivelMusical: "intermedio",
    sede_id: ObjectId("690026a30a153e5ca959cf65")
});

db.Inscripciones.insertOne({
    estudiante_id: ('6900be33e85e12074a464535'),
    curso_id: ObjectId("690026a40a153e5ca959cf87"),
    fecha: new Date("2025-11-15")
});
db.Cursos.updateOne({
    
})

/*Estas operaciones, al estar dentro de una transacción, 
aún no se reflejan en la base de datos hasta que se confirme la operación. 
Por ello, el siguiente paso es confirmar la transacción mediante 
commitTransaction(), lo que garantiza que los cambios sean aplicados de forma
permanente y segura: */

session.commitTransaction();


//En caso de que ocurra un error —por ejemplo, un fallo en la red o una violación de restricciones de unicidad— 
//se puede revertir todo lo que se haya hecho dentro de la transacción mediante el método abortTransaction():


session.abortTransaction();


//Finalmente, al concluir la operación (ya sea con éxito o abortada), es buena práctica cerrar la sesión para liberar recursos:

session.endSession();