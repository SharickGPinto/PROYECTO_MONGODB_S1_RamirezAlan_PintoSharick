use CampusMusic;

/* =========================================================
   POBLADO COMPLETO (insertMany) + USUARIOS VINCULADOS
   Colecciones: Sedes, Profesores, Estudiantes, Empleados,
                Administradores, Cursos, Instrumentos,
                Inscripciones, ReservaInstrumentos, Usuarios
   ========================================================= */

// =======================
// 1) SEDES (3)
// =======================
const sedesRes = db.Sedes.insertMany([
  { nombreSede: "Campus Bogotá Norte",  ciudad: "Bogotá",   direccion: "Cra 15 # 123-45", telefono: "3001110000" },
  { nombreSede: "Campus Medellín Sur",  ciudad: "Medellín", direccion: "Cl 10 # 20-30",  telefono: "3002220000" },
  { nombreSede: "Campus Cali Pacífico", ciudad: "Cali",     direccion: "Av 4N # 40-22",  telefono: "3003330000" }
]);
const s0 = sedesRes.insertedIds[0]; // Bogotá
const s1 = sedesRes.insertedIds[1]; // Medellín
const s2 = sedesRes.insertedIds[2]; // Cali

// =======================
// 2) PROFESORES (10)
// =======================
const profesRes = db.Profesores.insertMany([
  // Bogotá (4)
  { nombre:"Ana Torres",     numDocumento:10010001, tipoDocumento:"CC",        telefono:"3001110001", estudios:["Lic. Música","Diplomado Jazz"],        especialidades:["piano","canto"],             sede_id:s0 },
  { nombre:"Luis Pérez",     numDocumento:10010002, tipoDocumento:"TI",        telefono:"3001110002", estudios:["Maestría Pedagogía"],                  especialidades:["guitarra"],                  sede_id:s0 },
  { nombre:"Carlos Ríos",    numDocumento:10010003, tipoDocumento:"CE",        telefono:"3001110003", estudios:["Lic. Música"],                         especialidades:["batería"],                   sede_id:s0 },
  { nombre:"Paula Díaz",     numDocumento:10010004, tipoDocumento:"Pasaporte", telefono:"3001110004", estudios:["Diplomado Didáctica"],                 especialidades:["composición"],              sede_id:s0 },

  // Medellín (3)
  { nombre:"María Gómez",    numDocumento:10010005, tipoDocumento:"CC",        telefono:"3002220005", estudios:["Lic. Música","Arreglo Musical"],       especialidades:["violín"],                    sede_id:s1 },
  { nombre:"Javier León",    numDocumento:10010006, tipoDocumento:"TI",        telefono:"3002220006", estudios:["Lic. Música"],                         especialidades:["trompeta"],                  sede_id:s1 },
  { nombre:"Sofía Medina",   numDocumento:10010007, tipoDocumento:"CE",        telefono:"3002220007", estudios:["Maestría Interpretación"],             especialidades:["saxofón"],                   sede_id:s1 },

  // Cali (3)
  { nombre:"Diego Sánchez",  numDocumento:10010008, tipoDocumento:"CC",        telefono:"3003330008", estudios:["Curso Producción"],                    especialidades:["producción musical"],        sede_id:s2 },
  { nombre:"Laura Castillo", numDocumento:10010009, tipoDocumento:"TI",        telefono:"3003330009", estudios:["Maestría Dirección"],                  especialidades:["piano"],                     sede_id:s2 },
  { nombre:"Andrés Mora",    numDocumento:10010010, tipoDocumento:"CE",        telefono:"3003330010", estudios:["Lic. Música"],                         especialidades:["guitarra"],                  sede_id:s2 }
]);
const p0=profesRes.insertedIds[0], p1=profesRes.insertedIds[1], p2=profesRes.insertedIds[2], p3=profesRes.insertedIds[3];
const p4=profesRes.insertedIds[4], p5=profesRes.insertedIds[5], p6=profesRes.insertedIds[6];
const p7=profesRes.insertedIds[7], p8=profesRes.insertedIds[8], p9=profesRes.insertedIds[9];

// =======================
// 3) ESTUDIANTES (15)
// =======================
const estRes = db.Estudiantes.insertMany([
  { nombre:"Mateo López",        numDocumento:20020001, tipoDocumento:"CC",        telefono:"3101110001", nivelMusical:"principiante", sede_id:s0 },
  { nombre:"Valentina Ruiz",     numDocumento:20020002, tipoDocumento:"TI",        telefono:"3101110002", nivelMusical:"intermedio",   sede_id:s1 },
  { nombre:"Santiago Herrera",   numDocumento:20020003, tipoDocumento:"CE",        telefono:"3101110003", nivelMusical:"avanzado",     sede_id:s2 },
  { nombre:"Isabella Ortiz",     numDocumento:20020004, tipoDocumento:"Pasaporte", telefono:"3101110004", nivelMusical:"principiante", sede_id:s0 },
  { nombre:"Samuel Ramírez",     numDocumento:20020005, tipoDocumento:"PPT",       telefono:"3101110005", nivelMusical:"intermedio",   sede_id:s1 },
  { nombre:"Mariana Cárdenas",   numDocumento:20020006, tipoDocumento:"PEP",       telefono:"3101110006", nivelMusical:"avanzado",     sede_id:s2 },
  { nombre:"Emiliano Vargas",    numDocumento:20020007, tipoDocumento:"CC",        telefono:"3101110007", nivelMusical:"principiante", sede_id:s0 },
  { nombre:"Luciana Peña",       numDocumento:20020008, tipoDocumento:"TI",        telefono:"3101110008", nivelMusical:"intermedio",   sede_id:s1 },
  { nombre:"Juan José Castro",   numDocumento:20020009, tipoDocumento:"CE",        telefono:"3101110009", nivelMusical:"avanzado",     sede_id:s2 },
  { nombre:"Salomé Rincón",      numDocumento:20020010, tipoDocumento:"Pasaporte", telefono:"3101110010", nivelMusical:"principiante", sede_id:s0 },
  { nombre:"Tomás Quintero",     numDocumento:20020011, tipoDocumento:"PPT",       telefono:"3101110011", nivelMusical:"intermedio",   sede_id:s1 },
  { nombre:"Paulina Gil",        numDocumento:20020012, tipoDocumento:"PEP",       telefono:"3101110012", nivelMusical:"avanzado",     sede_id:s2 },
  { nombre:"Miguel Ángel Prada", numDocumento:20020013, tipoDocumento:"CC",        telefono:"3101110013", nivelMusical:"principiante", sede_id:s0 },
  { nombre:"Sara Chacón",        numDocumento:20020014, tipoDocumento:"TI",        telefono:"3101110014", nivelMusical:"intermedio",   sede_id:s1 },
  { nombre:"Daniela Díaz",       numDocumento:20020015, tipoDocumento:"CE",        telefono:"3101110015", nivelMusical:"avanzado",     sede_id:s2 }
]);
const e0=estRes.insertedIds[0], e1=estRes.insertedIds[1], e2=estRes.insertedIds[2], e3=estRes.insertedIds[3], e4=estRes.insertedIds[4];
const e5=estRes.insertedIds[5], e6=estRes.insertedIds[6], e7=estRes.insertedIds[7], e8=estRes.insertedIds[8], e9=estRes.insertedIds[9];
const e10=estRes.insertedIds[10], e11=estRes.insertedIds[11], e12=estRes.insertedIds[12], e13=estRes.insertedIds[13], e14=estRes.insertedIds[14];

// =======================
// 4) EMPLEADOS (3)
// =======================
const empRes = db.Empleados.insertMany([
  { nombre: "Julio Castaño",  numDocumento: 92000001, tipoDocumento: "CC", telefono: "3015552001", sede_id: s0 },
  { nombre: "Ximena Pardo",   numDocumento: 92000002, tipoDocumento: "TI", telefono: "3015552002", sede_id: s1 },
  { nombre: "Fernando Hoyos", numDocumento: 92000003, tipoDocumento: "CE", telefono: "3015552003", sede_id: s2 }
]);
const emp0=empRes.insertedIds[0], emp1=empRes.insertedIds[1], emp2=empRes.insertedIds[2];

// =======================
// 5) ADMINISTRADORES (3)
// =======================
const adminRes  = db.Administradores.insertMany([
  { nombre: "Carolina Duarte", numDocumento: 91000001, tipoDocumento: "CC",        telefono: "3004441001" },
  { nombre: "Esteban Aguilar", numDocumento: 91000002, tipoDocumento: "TI",        telefono: "3004441002" },
  { nombre: "Nora Velásquez",  numDocumento: 91000003, tipoDocumento: "Pasaporte", telefono: "3004441003" }
]);
const a0=adminRes.insertedIds[0], a1=adminRes.insertedIds[1], a2=adminRes.insertedIds[2];

// =======================
// 6) CURSOS (15 = 5 por sede) — valores diferentes
// =======================
const cursosRes = db.Cursos.insertMany([
  // Bogotá (s0) – profs p0..p3
  { nombreCurso:"Piano Básico",        area:"piano",        nivel:"principiante", profesor_id:p0, sede_id:s0, cupoMaximo:14, cuposDisponibles:6,  costo:480000, fechaInicio:new Date("2025-11-10"), fechaFin:new Date("2026-01-20"),
    horario:[{dia:"Lunes",horaInicio:"18:00",horaFin:"20:00"},{dia:"Miércoles",horaInicio:"18:00",horaFin:"20:00"}] },
  { nombreCurso:"Guitarra Intermedia", area:"guitarra",     nivel:"intermedio",   profesor_id:p1, sede_id:s0, cupoMaximo:12, cuposDisponibles:5,  costo:540000, fechaInicio:new Date("2025-11-12"), fechaFin:new Date("2026-01-22"),
    horario:[{dia:"Martes",horaInicio:"18:00",horaFin:"20:00"},{dia:"Jueves",horaInicio:"18:00",horaFin:"20:00"}] },
  { nombreCurso:"Teoría Musical",      area:"composición",  nivel:"principiante", profesor_id:p3, sede_id:s0, cupoMaximo:20, cuposDisponibles:12, costo:420000, fechaInicio:new Date("2025-11-15"), fechaFin:new Date("2026-01-25"),
    horario:[{dia:"Viernes",horaInicio:"17:00",horaFin:"20:00"}] },
  { nombreCurso:"Canto Inicial",       area:"canto",        nivel:"intermedio",   profesor_id:p0, sede_id:s0, cupoMaximo:15, cuposDisponibles:8,  costo:460000, fechaInicio:new Date("2025-11-11"), fechaFin:new Date("2026-01-21"),
    horario:[{dia:"Sábado",horaInicio:"14:00",horaFin:"18:00"}] },
  { nombreCurso:"Batería Groove I",    area:"batería",      nivel:"principiante", profesor_id:p2, sede_id:s0, cupoMaximo:13, cuposDisponibles:4,  costo:500000, fechaInicio:new Date("2025-11-13"), fechaFin:new Date("2026-01-23"),
    horario:[{dia:"Miércoles",horaInicio:"16:00",horaFin:"18:00"}] },

  // Medellín (s1) – profs p4..p6
  { nombreCurso:"Violín Avanzado",     area:"violín",       nivel:"avanzado",     profesor_id:p4, sede_id:s1, cupoMaximo:10, cuposDisponibles:3,  costo:610000, fechaInicio:new Date("2025-11-16"), fechaFin:new Date("2026-01-26"),
    horario:[{dia:"Sábado",horaInicio:"08:00",horaFin:"12:00"}] },
  { nombreCurso:"Trompeta Ensamble",   area:"trompeta",     nivel:"intermedio",   profesor_id:p5, sede_id:s1, cupoMaximo:12, cuposDisponibles:6,  costo:530000, fechaInicio:new Date("2025-11-18"), fechaFin:new Date("2026-01-28"),
    horario:[{dia:"Martes",horaInicio:"18:00",horaFin:"20:00"}] },
  { nombreCurso:"Saxofón Impro I",     area:"saxofón",      nivel:"intermedio",   profesor_id:p6, sede_id:s1, cupoMaximo:12, cuposDisponibles:7,  costo:550000, fechaInicio:new Date("2025-11-20"), fechaFin:new Date("2026-01-30"),
    horario:[{dia:"Jueves",horaInicio:"18:00",horaFin:"20:00"}] },
  { nombreCurso:"Guitarra Fingerstyle",area:"guitarra",     nivel:"avanzado",     profesor_id:p5, sede_id:s1, cupoMaximo:11, cuposDisponibles:5,  costo:590000, fechaInicio:new Date("2025-11-22"), fechaFin:new Date("2026-02-01"),
    horario:[{dia:"Viernes",horaInicio:"16:00",horaFin:"19:00"}] },
  { nombreCurso:"Armonía Funcional",   area:"composición",  nivel:"intermedio",   profesor_id:p4, sede_id:s1, cupoMaximo:18, cuposDisponibles:10, costo:500000, fechaInicio:new Date("2025-11-24"), fechaFin:new Date("2026-02-03"),
    horario:[{dia:"Lunes",horaInicio:"18:00",horaFin:"20:00"}] },

  // Cali (s2) – profs p7..p9
  { nombreCurso:"Producción Musical I",area:"producción musical", nivel:"principiante", profesor_id:p7, sede_id:s2, cupoMaximo:16, cuposDisponibles:9, costo:620000, fechaInicio:new Date("2025-11-17"), fechaFin:new Date("2026-01-27"),
    horario:[{dia:"Martes",horaInicio:"19:00",horaFin:"21:00"}] },
  { nombreCurso:"Piano Jazz I",        area:"piano",        nivel:"intermedio",   profesor_id:p8, sede_id:s2, cupoMaximo:12, cuposDisponibles:5,  costo:570000, fechaInicio:new Date("2025-11-19"), fechaFin:new Date("2026-01-29"),
    horario:[{dia:"Jueves",horaInicio:"18:00",horaFin:"20:00"}] },
  { nombreCurso:"Guitarra Acústica",   area:"guitarra",     nivel:"principiante", profesor_id:p9, sede_id:s2, cupoMaximo:15, cuposDisponibles:11, costo:480000, fechaInicio:new Date("2025-11-21"), fechaFin:new Date("2026-01-31"),
    horario:[{dia:"Sábado",horaInicio:"09:00",horaFin:"12:00"}] },
  { nombreCurso:"Violín de Cámara",    area:"violín",       nivel:"intermedio",   profesor_id:p8, sede_id:s2, cupoMaximo:10, cuposDisponibles:2,  costo:560000, fechaInicio:new Date("2025-11-23"), fechaFin:new Date("2026-02-02"),
    horario:[{dia:"Miércoles",horaInicio:"16:00",horaFin:"18:00"}] },
  { nombreCurso:"Saxofón Fusión",      area:"saxofón",      nivel:"avanzado",     profesor_id:p7, sede_id:s2, cupoMaximo:10, cuposDisponibles:4,  costo:600000, fechaInicio:new Date("2025-11-25"), fechaFin:new Date("2026-02-04"),
    horario:[{dia:"Viernes",horaInicio:"18:00",horaFin:"20:00"}] }
]);
const c0=cursosRes.insertedIds[0],  c1=cursosRes.insertedIds[1],  c2=cursosRes.insertedIds[2],  c3=cursosRes.insertedIds[3],  c4=cursosRes.insertedIds[4];
const c5=cursosRes.insertedIds[5],  c6=cursosRes.insertedIds[6],  c7=cursosRes.insertedIds[7],  c8=cursosRes.insertedIds[8],  c9=cursosRes.insertedIds[9];
const c10=cursosRes.insertedIds[10],c11=cursosRes.insertedIds[11],c12=cursosRes.insertedIds[12],c13=cursosRes.insertedIds[13],c14=cursosRes.insertedIds[14];

// =======================
// 7) INSTRUMENTOS (20)
// =======================
const instRes = db.Instrumentos.insertMany([
  // Bogotá (7)
  { tipo:"piano",    sede_id:s0 }, { tipo:"guitarra", sede_id:s0 }, { tipo:"bajo",      sede_id:s0 },
  { tipo:"batería",  sede_id:s0 }, { tipo:"violín",   sede_id:s0 }, { tipo:"saxofón",   sede_id:s0 },
  { tipo:"trompeta", sede_id:s0 },

  // Medellín (7)
  { tipo:"piano",    sede_id:s1 }, { tipo:"guitarra", sede_id:s1 }, { tipo:"bajo",      sede_id:s1 },
  { tipo:"batería",  sede_id:s1 }, { tipo:"violín",   sede_id:s1 }, { tipo:"saxofón",   sede_id:s1 },
  { tipo:"trompeta", sede_id:s1 },

  // Cali (6)
  { tipo:"piano",    sede_id:s2 }, { tipo:"guitarra", sede_id:s2 }, { tipo:"bajo",      sede_id:s2 },
  { tipo:"batería",  sede_id:s2 }, { tipo:"violín",   sede_id:s2 }, { tipo:"trompeta",  sede_id:s2 }
]);
const i0=instRes.insertedIds[0],  i1=instRes.insertedIds[1],  i2=instRes.insertedIds[2],  i3=instRes.insertedIds[3],  i4=instRes.insertedIds[4];
const i5=instRes.insertedIds[5],  i6=instRes.insertedIds[6],  i7=instRes.insertedIds[7],  i8=instRes.insertedIds[8],  i9=instRes.insertedIds[9];
const i10=instRes.insertedIds[10],i11=instRes.insertedIds[11],i12=instRes.insertedIds[12],i13=instRes.insertedIds[13],i14=instRes.insertedIds[14];
const i15=instRes.insertedIds[15],i16=instRes.insertedIds[16],i17=instRes.insertedIds[17],i18=instRes.insertedIds[18],i19=instRes.insertedIds[19];

// =======================
// 8) INSCRIPCIONES (30 únicas) — 2 por curso
// =======================
db.Inscripciones.insertMany([
  { estudiante_id:e0,  curso_id:c0,  fecha:new Date("2025-11-12") },
  { estudiante_id:e5,  curso_id:c0,  fecha:new Date("2025-11-13") },

  { estudiante_id:e1,  curso_id:c1,  fecha:new Date("2025-11-12") },
  { estudiante_id:e6,  curso_id:c1,  fecha:new Date("2025-11-13") },

  { estudiante_id:e2,  curso_id:c2,  fecha:new Date("2025-11-14") },
  { estudiante_id:e7,  curso_id:c2,  fecha:new Date("2025-11-15") },

  { estudiante_id:e3,  curso_id:c3,  fecha:new Date("2025-11-14") },
  { estudiante_id:e8,  curso_id:c3,  fecha:new Date("2025-11-16") },

  { estudiante_id:e4,  curso_id:c4,  fecha:new Date("2025-11-15") },
  { estudiante_id:e9,  curso_id:c4,  fecha:new Date("2025-11-17") },

  { estudiante_id:e10, curso_id:c5,  fecha:new Date("2025-11-16") },
  { estudiante_id:e0,  curso_id:c5,  fecha:new Date("2025-11-18") },

  { estudiante_id:e11, curso_id:c6,  fecha:new Date("2025-11-17") },
  { estudiante_id:e1,  curso_id:c6,  fecha:new Date("2025-11-18") },

  { estudiante_id:e12, curso_id:c7,  fecha:new Date("2025-11-18") },
  { estudiante_id:e2,  curso_id:c7,  fecha:new Date("2025-11-19") },

  { estudiante_id:e13, curso_id:c8,  fecha:new Date("2025-11-19") },
  { estudiante_id:e3,  curso_id:c8,  fecha:new Date("2025-11-20") },

  { estudiante_id:e14, curso_id:c9,  fecha:new Date("2025-11-20") },
  { estudiante_id:e4,  curso_id:c9,  fecha:new Date("2025-11-21") },

  { estudiante_id:e5,  curso_id:c10, fecha:new Date("2025-11-21") },
  { estudiante_id:e10, curso_id:c10, fecha:new Date("2025-11-22") },

  { estudiante_id:e6,  curso_id:c11, fecha:new Date("2025-11-22") },
  { estudiante_id:e11, curso_id:c11, fecha:new Date("2025-11-23") },

  { estudiante_id:e7,  curso_id:c12, fecha:new Date("2025-11-23") },
  { estudiante_id:e12, curso_id:c12, fecha:new Date("2025-11-24") },

  { estudiante_id:e8,  curso_id:c13, fecha:new Date("2025-11-24") },
  { estudiante_id:e13, curso_id:c13, fecha:new Date("2025-11-25") },

  { estudiante_id:e9,  curso_id:c14, fecha:new Date("2025-11-25") },
  { estudiante_id:e14, curso_id:c14, fecha:new Date("2025-11-26") }
]);

// =======================
// 9) RESERVAS DE INSTRUMENTOS (10)
// =======================
db.ReservaInstrumentos.insertMany([
  { instrumento_id:i0,  estudiante_id:e0,  fechaInicio:new Date("2025-11-01"), fechaFin:new Date("2025-11-05"), costo:15000 },
  { instrumento_id:i1,  estudiante_id:e1,  fechaInicio:new Date("2025-11-02"), fechaFin:new Date("2025-11-06"), costo:20000 },
  { instrumento_id:i2,  estudiante_id:e2,  fechaInicio:new Date("2025-11-03"), fechaFin:new Date("2025-11-07"), costo:25000 },
  { instrumento_id:i3,  estudiante_id:e3,  fechaInicio:new Date("2025-11-04"), fechaFin:new Date("2025-11-08"), costo:18000 },
  { instrumento_id:i4,  estudiante_id:e4,  fechaInicio:new Date("2025-11-05"), fechaFin:new Date("2025-11-09"), costo:22000 },
  { instrumento_id:i5,  estudiante_id:e5,  fechaInicio:new Date("2025-11-06"), fechaFin:new Date("2025-11-10"), costo:17000 },
  { instrumento_id:i6,  estudiante_id:e6,  fechaInicio:new Date("2025-11-07"), fechaFin:new Date("2025-11-11"), costo:30000 },
  { instrumento_id:i7,  estudiante_id:e7,  fechaInicio:new Date("2025-11-08"), fechaFin:new Date("2025-11-12"), costo:26000 },
  { instrumento_id:i8,  estudiante_id:e8,  fechaInicio:new Date("2025-11-09"), fechaFin:new Date("2025-11-13"), costo:24000 },
  { instrumento_id:i9,  estudiante_id:e9,  fechaInicio:new Date("2025-11-10"), fechaFin:new Date("2025-11-14"), costo:28000 }
]);

// =======================
// 10) USUARIOS (31) — TODOS VINCULADOS por ref_id
// =======================
// Administradores (3)
const usuariosAdmins = [
  { user:"admin.carolina", email:"carolina.duarte@campusmusic.com", password:"Adm!n2025#cd", rol:"administrador", ref_id:a0 },
  { user:"admin.esteban",  email:"esteban.aguilar@campusmusic.com", password:"Adm!n2025#ea", rol:"administrador", ref_id:a1 },
  { user:"admin.nora",     email:"nora.velasquez@campusmusic.com",  password:"Adm!n2025#nv", rol:"administrador", ref_id:a2 }
];

// Empleados (3)
const usuariosEmpleados = [
  { user:"empleado.julio",    email:"julio.castano@campusmusic.com",   password:"Empl2025#jc", rol:"empleado", ref_id:emp0 },
  { user:"empleado.ximena",   email:"ximena.pardo@campusmusic.com",    password:"Empl2025#xp", rol:"empleado", ref_id:emp1 },
  { user:"empleado.fernando", email:"fernando.hoyos@campusmusic.com",  password:"Empl2025#fh", rol:"empleado", ref_id:emp2 }
];

// Profesores (10)
const usuariosProfes = [
  { user:"prof.ana.torres",     email:"prof.ana.torres@campusmusic.com",     password:"Prof2025#01", rol:"profesor", ref_id:p0 },
  { user:"prof.luis.perez",     email:"prof.luis.perez@campusmusic.com",     password:"Prof2025#02", rol:"profesor", ref_id:p1 },
  { user:"prof.carlos.rios",    email:"prof.carlos.rios@campusmusic.com",    password:"Prof2025#03", rol:"profesor", ref_id:p2 },
  { user:"prof.paula.diaz",     email:"prof.paula.diaz@campusmusic.com",     password:"Prof2025#04", rol:"profesor", ref_id:p3 },
  { user:"prof.maria.gomez",    email:"prof.maria.gomez@campusmusic.com",    password:"Prof2025#05", rol:"profesor", ref_id:p4 },
  { user:"prof.javier.leon",    email:"prof.javier.leon@campusmusic.com",    password:"Prof2025#06", rol:"profesor", ref_id:p5 },
  { user:"prof.sofia.medina",   email:"prof.sofia.medina@campusmusic.com",   password:"Prof2025#07", rol:"profesor", ref_id:p6 },
  { user:"prof.diego.sanchez",  email:"prof.diego.sanchez@campusmusic.com",  password:"Prof2025#08", rol:"profesor", ref_id:p7 },
  { user:"prof.laura.castillo", email:"prof.laura.castillo@campusmusic.com", password:"Prof2025#09", rol:"profesor", ref_id:p8 },
  { user:"prof.andres.mora",    email:"prof.andres.mora@campusmusic.com",    password:"Prof2025#10", rol:"profesor", ref_id:p9 }
];

// Estudiantes (15)
const usuariosEst = [
  { user:"est.mateo.lopez",       email:"est.mateo.lopez@campusmusic.com",       password:"Est2025#01", rol:"estudiante", ref_id:e0 },
  { user:"est.valentina.ruiz",    email:"est.valentina.ruiz@campusmusic.com",    password:"Est2025#02", rol:"estudiante", ref_id:e1 },
  { user:"est.santiago.herrera",  email:"est.santiago.herrera@campusmusic.com",  password:"Est2025#03", rol:"estudiante", ref_id:e2 },
  { user:"est.isabella.ortiz",    email:"est.isabella.ortiz@campusmusic.com",    password:"Est2025#04", rol:"estudiante", ref_id:e3 },
  { user:"est.samuel.ramirez",    email:"est.samuel.ramirez@campusmusic.com",    password:"Est2025#05", rol:"estudiante", ref_id:e4 },
  { user:"est.mariana.cardenas",  email:"est.mariana.cardenas@campusmusic.com",  password:"Est2025#06", rol:"estudiante", ref_id:e5 },
  { user:"est.emiliano.vargas",   email:"est.emiliano.vargas@campusmusic.com",   password:"Est2025#07", rol:"estudiante", ref_id:e6 },
  { user:"est.luciana.pena",      email:"est.luciana.pena@campusmusic.com",      password:"Est2025#08", rol:"estudiante", ref_id:e7 },
  { user:"est.juanjose.castro",   email:"est.juanjose.castro@campusmusic.com",   password:"Est2025#09", rol:"estudiante", ref_id:e8 },
  { user:"est.salome.rincon",     email:"est.salome.rincon@campusmusic.com",     password:"Est2025#10", rol:"estudiante", ref_id:e9 },
  { user:"est.tomas.quintero",    email:"est.tomas.quintero@campusmusic.com",    password:"Est2025#11", rol:"estudiante", ref_id:e10 },
  { user:"est.paulina.gil",       email:"est.paulina.gil@campusmusic.com",       password:"Est2025#12", rol:"estudiante", ref_id:e11 },
  { user:"est.miguel.prada",      email:"est.miguel.prada@campusmusic.com",      password:"Est2025#13", rol:"estudiante", ref_id:e12 },
  { user:"est.sara.chacon",       email:"est.sara.chacon@campusmusic.com",       password:"Est2025#14", rol:"estudiante", ref_id:e13 },
  { user:"est.daniela.diaz",      email:"est.daniela.diaz@campusmusic.com",      password:"Est2025#15", rol:"estudiante", ref_id:e14 }
];

db.Usuarios.insertMany([
  ...usuariosAdmins,
  ...usuariosEmpleados,
  ...usuariosProfes,
  ...usuariosEst
]);
