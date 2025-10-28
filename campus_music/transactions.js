/*El primer paso para trabajar con transacciones es iniciar una sesión, 
lo cual se hace utilizando startSession(). 
A través de la variable session, se accede a la base de datos y su
colección, ahora asociadas a esa sesión en particular. Una vez establecida 
la sesión, el siguiente paso es iniciar la transacción propiamente dicha, 
utilizando el método startTransaction(): */

const session = db.getMongo().startSession();
const sessionDb = session.getDatabase("CampusMusic");

try {
    session.startTransaction();

    //Con la transacción activa, se procede a ejecutar las operaciones deseadas.
    const cursoId = ObjectId("ID DEL CURSO"); // <-- reemplazar

    // Insertar estudiante
    const estudianteInsert = sessionDb.Estudiantes.insertOne({
        nombre: "Juan Núñez",
        numDocumento: 30030016,
        tipoDocumento: "CC",
        telefono: "31024563344",
        nivelMusical: "intermedio",
        sede_id: ObjectId("ID DE LA SEDE") // <-- reemplazar
    });

    const estudianteId = estudianteInsert.insertedId;

    // Insertar inscripción del estudiante en el curso
    sessionDb.Inscripciones.insertOne({
        estudiante_id: estudianteId,
        curso_id: cursoId,
        fecha: new Date()
    });

    // Actualizar curso: reducir cupos disponibles si aún hay espacio
    const updateRes = sessionDb.Cursos.updateOne(
        { _id: cursoId },
        { $inc: { cuposDisponibles: -1 } }
    );

    if (updateRes.matchedCount === 0) {
        throw new Error("No se pudo actualizar el curso (sin cupos o curso inexistente).");
    }

    /*Estas operaciones, al estar dentro de una transacción, 
    aún no se reflejan en la base de datos hasta que se confirme la operación. 
    Por ello, el siguiente paso es confirmar la transacción mediante 
    commitTransaction(), lo que garantiza que los cambios sean aplicados de forma
    permanente y segura: */
    session.commitTransaction();
    print("Transacción completada correctamente: estudiante inscrito y cupo actualizado.");

} catch (error) {
    //En caso de que ocurra un error —por ejemplo, un fallo en la red o una violación de restricciones de unicidad— 
    //se puede revertir todo lo que se haya hecho dentro de la transacción mediante el método abortTransaction():
    print("Error detectado:", error.message);
    session.abortTransaction();
    print("Transacción revertida correctamente.");
} finally {
    //Finalmente, al concluir la operación (ya sea con éxito o abortada), es buena práctica cerrar la sesión para liberar recursos:
    session.endSession();
    print("Sesión finalizada.");
}