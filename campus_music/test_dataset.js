use CampusMusic;

// =======================
// 1. Insertar Sedes
// =======================
const sedes = db.Sedes.insertMany([
  { nombreSede: "Campus Bogotá", ciudad: "Bogotá", direccion: "Calle 123 #45-67", telefono: "3012345678" },
  { nombreSede: "Campus Medellín", ciudad: "Medellín", direccion: "Carrera 45 #12-34", telefono: "3045678901" },
  { nombreSede: "Campus Cali", ciudad: "Cali", direccion: "Avenida 5 #67-89", telefono: "3023456789" }
]);

const sedesIds = sedes.insertedIds;

// =======================
// 2. Insertar Profesores
// =======================
const profesores = db.Profesores.insertMany([
  { nombre: "Juan Pérez", numDocumento: 12345, tipoDocumento: "CC", telefono: "3101234567", estudios: ["Lic. Música"], especialidades: ["piano","canto"], sede_id: sedesIds[0] },
  { nombre: "María Gómez", numDocumento: 23456, tipoDocumento: "CC", telefono: "3112345678", estudios: ["Maestría en Música"], especialidades: ["guitarra"], sede_id: sedesIds[0] },
  { nombre: "Carlos Rodríguez", numDocumento: 34567, tipoDocumento: "CC", telefono: "3123456789", estudios: ["Lic. Música"], especialidades: ["violín"], sede_id: sedesIds[1] },
  { nombre: "Laura Martínez", numDocumento: 45678, tipoDocumento: "CC", telefono: "3134567890", estudios: ["Maestría en Composición"], especialidades: ["composición"], sede_id: sedesIds[1] },
  { nombre: "Andrés López", numDocumento: 56789, tipoDocumento: "CC", telefono: "3145678901", estudios: ["Lic. Música"], especialidades: ["bajo","producción musical"], sede_id: sedesIds[2] },
  { nombre: "Sofía Torres", numDocumento: 67890, tipoDocumento: "CC", telefono: "3156789012", estudios: ["Maestría en Música"], especialidades: ["batería"], sede_id: sedesIds[2] },
  { nombre: "Miguel Ramírez", numDocumento: 78901, tipoDocumento: "CC", telefono: "3167890123", estudios: ["Lic. Música"], especialidades: ["piano"], sede_id: sedesIds[0] },
  { nombre: "Natalia Rojas", numDocumento: 89012, tipoDocumento: "CC", telefono: "3178901234", estudios: ["Lic. Música"], especialidades: ["canto"], sede_id: sedesIds[1] },
  { nombre: "Diego Herrera", numDocumento: 90123, tipoDocumento: "CC", telefono: "3189012345", estudios: ["Lic. Música"], especialidades: ["saxofón"], sede_id: sedesIds[2] },
  { nombre: "Camila Vargas", numDocumento: 101234, tipoDocumento: "CC", telefono: "3190123456", estudios: ["Lic. Música"], especialidades: ["trompeta"], sede_id: sedesIds[0] }
]);

const profesoresIds = profesores.insertedIds;

// =======================
// 3. Insertar Estudiantes
// =======================
const estudiantes = db.Estudiantes.insertMany([
  { nombre: "Estudiante 1", numDocumento: 111, tipoDocumento: "CC", telefono: "3201111111", nivelMusical: "principiante", sede_id: sedesIds[0] },
  { nombre: "Estudiante 2", numDocumento: 112, tipoDocumento: "CC", telefono: "3201111112", nivelMusical: "intermedio", sede_id: sedesIds[0] },
  { nombre: "Estudiante 3", numDocumento: 113, tipoDocumento: "CC", telefono: "3201111113", nivelMusical: "avanzado", sede_id: sedesIds[0] },
  { nombre: "Estudiante 4", numDocumento: 114, tipoDocumento: "CC", telefono: "3201111114", nivelMusical: "principiante", sede_id: sedesIds[1] },
  { nombre: "Estudiante 5", numDocumento: 115, tipoDocumento: "CC", telefono: "3201111115", nivelMusical: "intermedio", sede_id: sedesIds[1] },
  { nombre: "Estudiante 6", numDocumento: 116, tipoDocumento: "CC", telefono: "3201111116", nivelMusical: "avanzado", sede_id: sedesIds[1] },
  { nombre: "Estudiante 7", numDocumento: 117, tipoDocumento: "CC", telefono: "3201111117", nivelMusical: "principiante", sede_id: sedesIds[2] },
  { nombre: "Estudiante 8", numDocumento: 118, tipoDocumento: "CC", telefono: "3201111118", nivelMusical: "intermedio", sede_id: sedesIds[2] },
  { nombre: "Estudiante 9", numDocumento: 119, tipoDocumento: "CC", telefono: "3201111119", nivelMusical: "avanzado", sede_id: sedesIds[2] },
  { nombre: "Estudiante 10", numDocumento: 120, tipoDocumento: "CC", telefono: "3201111120", nivelMusical: "principiante", sede_id: sedesIds[0] },
  { nombre: "Estudiante 11", numDocumento: 121, tipoDocumento: "CC", telefono: "3201111121", nivelMusical: "intermedio", sede_id: sedesIds[1] },
  { nombre: "Estudiante 12", numDocumento: 122, tipoDocumento: "CC", telefono: "3201111122", nivelMusical: "avanzado", sede_id: sedesIds[2] },
  { nombre: "Estudiante 13", numDocumento: 123, tipoDocumento: "CC", telefono: "3201111123", nivelMusical: "principiante", sede_id: sedesIds[0] },
  { nombre: "Estudiante 14", numDocumento: 124, tipoDocumento: "CC", telefono: "3201111124", nivelMusical: "intermedio", sede_id: sedesIds[1] },
  { nombre: "Estudiante 15", numDocumento: 125, tipoDocumento: "CC", telefono: "3201111125", nivelMusical: "avanzado", sede_id: sedesIds[2] }
]);

const estudiantesIds = estudiantes.insertedIds;

// =======================
// 4. Insertar Cursos (5 por sede) CORREGIDO
// =======================

const cursosData = [
    { nombreCurso: "Piano Básico", area: "piano", nivel: "principiante" },
    { nombreCurso: "Guitarra Intermedia", area: "guitarra", nivel: "intermedio" },
    { nombreCurso: "Violín Avanzado", area: "violín", nivel: "avanzado" },
    { nombreCurso: "Teoría Musical", area: "composición", nivel: "principiante" },
    { nombreCurso: "Canto", area: "canto", nivel: "intermedio" }
  ];
  
  let cursosInsert = [];
  
  Object.values(sedesIds).forEach((sedeId, index) => {
    cursosData.forEach((curso, i) => {
      cursosInsert.push({
        nombreCurso: curso.nombreCurso,
        area: curso.area,
        nivel: curso.nivel,
        profesor_id: profesoresIds[(index*2 + i) % 10],
        sede_id: sedeId,
        cupoMaximo: 5,
        cuposDisponibles: 5,
        costo: 100000,
        fechaInicio: new Date("2025-11-01"),
        fechaFin: new Date("2025-12-31"),
        horario: [
          { dia: "Lunes", horaInicio: "16:00", horaFin: "18:00" },
          { dia: "Miércoles", horaInicio: "16:00", horaFin: "18:00" }
        ]
      });
    });
  });
  
  const cursos = db.Cursos.insertMany(cursosInsert);
  const cursosIds = cursos.insertedIds;

// =======================
// 5. Insertar Instrumentos (20 instrumentos en total)
// =======================
const instrumentosData = [
  "piano","piano","piano","guitarra","guitarra","guitarra",
  "violín","violín","violín","bajo","bajo","batería","batería",
  "saxofón","saxofón","trompeta","trompeta","piano","guitarra","violín"
];

let instrumentosInsert = [];
Object.values(sedesIds).forEach((sedeId, index) => {
  for (let i = 0; i < instrumentosData.length / 3; i++) {
    instrumentosInsert.push({ tipo: instrumentosData[index*3+i], sede_id: sedeId });
  }
});

const instrumentos = db.Instrumentos.insertMany(instrumentosInsert);
const instrumentosIds = instrumentos.insertedIds;

// =======================
// 6. Insertar Inscripciones (30 combinaciones únicas)
// =======================

let inscripcionesInsert = [];
let combinaciones = new Set();

while (inscripcionesInsert.length < 30) {
  let estudianteIndex = Math.floor(Math.random() * 15);  // 15 estudiantes
  let cursoIndex = Math.floor(Math.random() * cursosInsert.length); // todos los cursos
  let key = estudianteIndex + "-" + cursoIndex;

  if (!combinaciones.has(key)) {
    combinaciones.add(key);
    inscripcionesInsert.push({
      estudiante_id: estudiantesIds[estudianteIndex],
      curso_id: cursosIds[cursoIndex],
      fecha: new Date("2025-10-27")
    });
  }
}

db.Inscripciones.insertMany(inscripcionesInsert);

// =======================
// 7. Insertar Reservas de Instrumentos (10 reservas)
// =======================
let reservasInsert = [];
for (let i = 0; i < 10; i++) {
  reservasInsert.push({
    instrumento_id: instrumentosIds[i],
    estudiante_id: estudiantesIds[i % 15],
    fechaInicio: new Date("2025-11-01"),
    fechaFin: new Date("2025-11-05"),
    costo: 5000
  });
}

db.ReservaInstrumentos.insertMany(reservasInsert);

print("Datos insertados correctamente.");