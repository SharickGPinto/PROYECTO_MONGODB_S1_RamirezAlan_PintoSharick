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
const cursoId = ObjectId("690026a40a153e5ca959cf87");
db.Estudiantes.insertOne({
    nombre: "Juan Núñez",
    numDocumento: 30030016,
    tipoDocumento: "CC",
    telefono: "31024563344",
    nivelMusical: "intermedio",
    sede_id: ObjectId("690026a30a153e5ca959cf65")
});

const eId = ObjectId("6900c2afe85e12074a464537");

db.Inscripciones.insertOne({
    estudiante_id: eId,
    curso_id: cursoId,
    fecha: ISODate("2025-11-15T00:00:00Z")
});
db.Cursos.updateOne(
    { _id: cursoId, cuposDisponibles: { $gt: 0 } },
    { $inc: { cuposDisponibles: -1 } }
  );

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