
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
use CampusMusic;

db.Inscripciones.aggregate([
    // inscripciones desde el ultimo mes
    {
        $match: {
            fecha: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) }  // new Date("2025-11-30")
        }
    },
    // traer el curso para conocer la sede
    {
        $lookup: {
            from: "Cursos",
            localField: "curso_id",
            foreignField: "_id",
            as: "curso"
        }
    },
    { $unwind: "$curso" },
    // agrupar por sede del curso
    {
        $group: {
            _id: "$curso.sede_id",
            totalInscritosUltimoMes: { $sum: 1 }
        }
    },
    // traer datos de la sede
    {
        $lookup: {
            from: "Sedes",
            localField: "_id",
            foreignField: "_id",
            as: "sede"
        }
    },
    { $unwind: "$sede" },
    {
        $project: {
            _id: 0,
            sedeId: "$_id",
            nombreSede: "$sede.nombreSede",
            ciudad: "$sede.ciudad",
            totalInscritosUltimoMes: 1
        }
    },
    { $sort: { totalInscritosUltimoMes: -1 } }
]);

//2.​ ¿Cuáles son los cursos más demandados en cada sede?

db.Inscripciones.aggregate([
    // unir curso
    {
        $lookup: {
            from: "Cursos",
            localField: "curso_id",
            foreignField: "_id",
            as: "curso"
        }
    },
    { $unwind: "$curso" },
    // contar por curso y sede
    {
        $group: {
            _id: { sede_id: "$curso.sede_id", curso_id: "$curso._id", nombreCurso: "$curso.nombreCurso" },
            inscritos: { $sum: 1 }
        }
    },
    // ordenar para luego sacar el primero por sede
    { $sort: { "_id.sede_id": 1, inscritos: -1 } },
    // agrupar por sede y quedarnos con el más demandado
    {
        $group: {
            _id: "$_id.sede_id",
            cursoMasDemandado: { $first: "$_id.nombreCurso" },
            cursoId: { $first: "$_id.curso_id" },
            inscritos: { $first: "$inscritos" }
        }
    },
    // traer info de sede
    {
        $lookup: {
            from: "Sedes",
            localField: "_id",
            foreignField: "_id",
            as: "sede"
        }
    },
    { $unwind: "$sede" },
    {
        $project: {
            _id: 0,
            sedeId: "$_id",
            nombreSede: "$sede.nombreSede",
            ciudad: "$sede.ciudad",
            cursoMasDemandado: 1,
            cursoId: 1,
            inscritos: 1
        }
    },
    { $sort: { inscritos: -1 } }
]);

// 3.​ ¿Cuál es el ingreso total generado por inscripciones en cada sede?

db.Inscripciones.aggregate([
    // unir curso para obtener costo y sede
    {
        $lookup: {
            from: "Cursos",
            localField: "curso_id",
            foreignField: "_id",
            as: "curso"
        }
    },
    { $unwind: "$curso" },
    // sumar el costo del curso por inscripcion agrupado por sede
    {
        $group: {
            _id: "$curso.sede_id",
            ingresoTotal: { $sum: "$curso.costo" },
            inscritas: { $sum: 1 }
        }
    },
    // unir sede
    {
        $lookup: {
            from: "Sedes",
            localField: "_id",
            foreignField: "_id",
            as: "sede"
        }
    },
    { $unwind: "$sede" },
    {
        $project: {
            _id: 0,
            sedeId: "$_id",
            nombreSede: "$sede.nombreSede",
            ciudad: "$sede.ciudad",
            ingresoTotal: 1,
            inscritas: 1
        }
    },
    { $sort: { ingresoTotal: -1 } }
]);

// 4.​ ¿Qué profesor tiene más estudiantes asignados?

db.Inscripciones.aggregate([
    // unir curso para saber el profesor
    {
        $lookup: {
            from: "Cursos",
            localField: "curso_id",
            foreignField: "_id",
            as: "curso"
        }
    },
    { $unwind: "$curso" },
    // agrupar por profesor_id
    {
        $group: {
            _id: "$curso.profesor_id",
            totalEstudiantes: { $sum: 1 }
        }
    },
    { $sort: { totalEstudiantes: -1 } },
    { $limit: 5 }, // top 5 
    // traer datos de profesor
    {
        $lookup: {
            from: "Profesores",
            localField: "_id",
            foreignField: "_id",
            as: "profesor"
        }
    },
    { $unwind: "$profesor" },
    {
        $project: {
            _id: 0,
            profesorId: "$_id",
            profesor: "$profesor.nombre",
            totalEstudiantes: 1
        }
    }
]);

// 5.​ ¿Qué instrumento es el más reservado?

db.ReservaInstrumentos.aggregate([
    // traer instrumento
    {
        $lookup: {
            from: "Instrumentos",
            localField: "instrumento_id",
            foreignField: "_id",
            as: "instrumento"
        }
    },
    { $unwind: "$instrumento" },

    // agrupar por tipo de instrumento
    {
        $group: {
            _id: "$instrumento.tipo",
            totalReservas: { $sum: 1 }
        }
    },
    { $sort: { totalReservas: -1 } },
    { $limit: 5 },
    {
        $project: {
            _id: 0,
            tipoInstrumento: "$_id",
            totalReservas: 1
        }
    }
]);

// 6.​ Mostrar el historial de cursos de un estudiante (fecha, sede, curso, profesor, nivel, costo).

db.Inscripciones.aggregate([
    {
        $match: {
            estudiante_id: ObjectId("ID DEL ESTUDIANTE") // <-- reemplazar
        }
    },
    {
        $lookup: {
            from: "Cursos",
            localField: "curso_id",
            foreignField: "_id",
            as: "curso"
        }
    },
    { $unwind: "$curso" },
    {
        $lookup: {
            from: "Profesores",
            localField: "curso.profesor_id",
            foreignField: "_id",
            as: "profesor"
        }
    },
    { $unwind: "$profesor" },
    {
        $lookup: {
            from: "Sedes",
            localField: "curso.sede_id",
            foreignField: "_id",
            as: "sede"
        }
    },
    { $unwind: "$sede" },
    {
        $project: {
            _id: 0,
            fechaInscripcion: "$fecha",
            sede: "$sede.nombreSede",
            ciudad: "$sede.ciudad",
            curso: "$curso.nombreCurso",
            profesor: "$profesor.nombre",
            nivel: "$curso.nivel",
            costo: "$curso.costo"
        }
    },
    { $sort: { fechaInscripcion: -1 } }
]);

// 7.​ Listar los cursos actualmente en ejecución en cada sede.

db.Cursos.aggregate([
    {
        $match: {
            fechaInicio: { $lte: new Date() }, // new Date("2025-11-30")
            fechaFin: { $gte: new Date() } // new Date("2025-11-30")
        }
    },
    // traer sede y profesor
    {
        $lookup: {
            from: "Sedes",
            localField: "sede_id",
            foreignField: "_id",
            as: "sede"
        }
    },
    { $unwind: "$sede" },
    {
        $lookup: {
            from: "Profesores",
            localField: "profesor_id",
            foreignField: "_id",
            as: "profesor"
        }
    },
    { $unwind: "$profesor" },
    {
        $project: {
            _id: 0,
            cursoId: "$_id",
            nombreCurso: 1,
            area: 1,
            nivel: 1,
            profesor: "$profesor.nombre",
            sede: "$sede.nombreSede",
            ciudad: "$sede.ciudad",
            fechaInicio: 1,
            fechaFin: 1,
            cupoMaximo: 1,
            cuposDisponibles: 1
        }
    },
    { $sort: { nombreCurso: 1 } }
]);

// 8.​ Detectar cursos que excedieron el cupo permitido en algún momento.

db.Inscripciones.aggregate([
    // contar inscritos por curso
    {
        $group: {
            _id: "$curso_id",
            inscritosTotales: { $sum: 1 }
        }
    },
    // traer info del curso
    {
        $lookup: {
            from: "Cursos",
            localField: "_id",
            foreignField: "_id",
            as: "curso"
        }
    },
    { $unwind: "$curso" },
    // filtrar donde inscritos > cupoMaximo
    {
        $match: {
            $expr: { $gt: ["$inscritosTotales", "$curso.cupoMaximo"] }
        }
    },
    {
        $project: {
            _id: 0,
            cursoId: "$_id",
            nombreCurso: "$curso.nombreCurso",
            sedeId: "$curso.sede_id",
            cupoMaximo: "$curso.cupoMaximo",
            inscritosTotales: 1
        }
    }
]);

// tambien se puede hacer la busqueda desde la misma propiedad cursosDisponibles de la coleccion Cursos

db.Cursos.aggregate([
    {
      $match: {
        cuposDisponibles: { $lt: 0 } // cursos que tienen menos de 0 cupos
      }
    },
    {
      $project: {
        _id: 0,
        cursoId: "$_id",
        nombreCurso: 1,
        cupoMaximo: 1,
        cuposDisponibles: 1
      }
    }
  ]);
  

//pipelineEstudiantesDestacados


db.Inscripciones.aggregate([
    {
        $lookup: {
            from: "Cursos",
            localField: "curso_id",
            foreignField: "_id",
            as: "cursos"
        }
    },
    { $unwind: "$cursos" },
    {
        $group: {
            _id: "$cursos.estudiante_id",
            totalEstudiantesInscritos: { $sum: 1 }
        }
    },
    {
        $lookup: {
            from: "Estudiantes",
            localField: "_id",
            foreignField: "_id",
            as: "estudiantes"
        }
    },
    { $unwind: "$estudiantes" },
    {
        $project: {
            _id: 0,
            nombreEstudiante: "$estudiantes.nombre",
            cantidadCursos: "$Inscripciones.curso_id",
            EstudiantesDestacados: 1
        }
    },
    { $sort: { EstudiantesDestacados: -1 } }
]);


// EXAMEN Alan Ramirez pipelineIngresosMensualesPorCurso

db.Inscripciones.aggregate([
    {
        $group: {
            _id: "$curso_id",
            mesAnio: new Date((new Date().setMonth(new Date("$fecha").getMonth())).setFullYear(new Date("$fecha").getFullYear())),
            cantidadInscripciones: { $sum: 1 }
        }
    },
    {
        $lookup: {
            from: "Cursos",
            localField: "_id",
            foreignField: "_id",
            as: "curso"
        }
    },
    { $unwind: "$curso" },
    {
        $project: {
            _id: 0,
            nombreCurso: "$curso.nombreCurso",
            IdCurso: "$_id",
            IdSede: "$curso.sede_id",
            mesAnio: 1,
            cantidadInscripciones: 1,
            totalIngresos: { $multiply : [ "$cantidad", "$curso.costo" ] }
        }
    },
    { $sort: { mesAnio: -1 } }
]);