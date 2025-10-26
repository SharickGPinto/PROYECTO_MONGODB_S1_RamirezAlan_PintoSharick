
// insertar las sedes 

db.sedes.insertMany([
    { nombreSede: "Campus Norte", ciudad: "Bogotá", direccion: "Cra 7 # 123-45" },
    { nombreSede: "Campus Sur", ciudad: "Medellín", direccion: "Cl 10 # 20-30" },
    { nombreSede: "Campus Pacífico", ciudad: "Cali", direccion: "Av 4N # 40-22" }
])