
/*
1.​ ¿Cuántos estudiantes se inscribieron por sede en el último mes?
2.​ ¿Cuáles son los cursos más demandados en cada sede?
3.​ ¿Cuál es el ingreso total generado por inscripciones en cada sede?
4.​ ¿Qué profesor tiene más estudiantes asignados?
5.​ ¿Qué instrumento es el más reservado?
6.​ Mostrar el historial de cursos de un estudiante (fecha, sede, curso, profesor, nivel,
costo).
7.​ Listar los cursos actualmente en ejecución en cada sede.
8.​ Detectar cursos que excedieron el cupo permitido en algún momento.
*/

//1.​ ¿Cuántos estudiantes se inscribieron por sede en el último mes?

db.Inscripciones.aggregate([
    {
        $addFields: {
            mes: { $month: "$fecha" },
        }
    },
    {
        $match: {
            mes: { $eq: 11 }
        }
    },
    {
        $group: {
            _id: 0,
            estudiantesInscriptos: { $sum: 1 }
        }
    }
]);

//2.​ ¿Cuáles son los cursos más demandados en cada sede?

