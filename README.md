<h1 align=center>Base de Datos (DB) CAMPUS MUSIC</h1>
 

 <h6 align=center>Proyecto MongoDB: (Alan Thomas Ramírez Vargas & Sharick Giovanna Pinto Rodriguez)</h6>

---

# Tabla de Contenido
<h6 align=center> 1. Introducción </h6>

<h6 align=center> 2. Caso de Estudio </h6>

<h6 align=center> 3. Requerimientos </h6>

<h6 align=center> 4. Modelo Conceptual  </h6>

<h6 align=center> 5. Modelo Lógico  </h6>

<h6 align=center> 6. Normalización </h6>


---

# Introducción

Campus Music, organización que administra múltiples escuelas de música en distintas ciudades, emprende la migración de su operación desde hojas de cálculo hacia una base de datos robusta en MongoDB. El propósito es unificar la gestión de estudiantes, profesores, empleados, cursos, sedes e inscripciones en un repositorio único que elimine la duplicación de información, reduzca errores y permita controlar transacciones de matrícula (validación de cupos, registro de costos y fechas), así como habilitar consultas analíticas y la administración de reservas de instrumentos. Con esta implementación se fortalecerán la integridad y consistencia de los datos, la seguridad basada en roles y la disponibilidad de reportes confiables sobre ocupación, demanda e ingresos.

A continuación se documenta minuciosamente el proceso que se siguió para ejecutar la elaboración de la base de datos solicitada para el sistema enfocado a la escuela de musica (CAMPUS MUSIC), implementando modelo conceptual, lógico y finalmente físico (proceso de normalización hasta la 3ra Forma Normal que se debe llevar a cabo entre estas últimas dos fases).

Describiendo el flujo de trabajo lógico que se desarrolló, así como diagramas que muestran detalladamente los avances realizados en cada etapa del desarrollo de la BBDD, las entidades que derivaron de los requerimientos solicitados por el cliente y las relaciones entre estas definiendo las cardanilidades.

Finalmente, se realizan inserciones de datos dentro del sistema, se crean usuarios con diferentes permisos de acceso a la base de datos; ejecutando pruebas, como última medida, a través de consultas y funciones dentro de la BBDD que permitan a quienes tengan acceso a ella el poder manipular la forma en la que la información se presenta, pudiendo realizar diferentes tipos de filtrado de datos, entre otros tipos de consultas.

---

# 2. Caso de Estudio

En el presente caso de estudio, Campus Music enfrenta problemas organizacionales asociados a la falta de un sistema de base de datos eficiente y centralizado. Esta carencia se traduce en duplicidad de registros, errores de consistencia y limitaciones para organizar, analizar y utilizar la información de manera oportuna, afectando la gestión académica, operativa y la toma de decisiones.

La escuela requiere una base de datos robusta y centralizada para gestionar información de usuarios, inscripciones, sedes, instrumentos y administradores responsables de la operación. Además del simple almacenamiento, el cliente exigió una arquitectura de datos específica que garantizara claridad estructural, eliminación de duplicidades, consistencia en los registros, seguridad por roles y soporte para consultas y reportes; todo ello como fundamento para el posterior diseño lógico y físico de la base de datos.

Por un lado, se requería que los usuarios de Campus Music se clasificaran en tres roles: Administrador, Empleado de sede y Estudiante. Un Administrador puede gestionar una o varias sedes, mientras que cada sede debe estar asignada a un único Administrador. Los Empleados de sede tienen acceso limitado a la información de su sede —incluida la posibilidad de registrar inscripciones y reservas—, y los Estudiantes acceden a su propia información, consultan cursos disponibles y realizan inscripciones. La gestión del personal académico (profesores) se modela como entidad del dominio independiente de los roles de acceso.

Algunas de las entidades derivadas de los requerimientos ya contaban con una estructura inicial definida por el cliente, o al menos con un esquema base sobre el cual realizar ajustes para facilitar el mantenimiento y mejorar la organización de la base de datos.

En particular, sedes, estudiantes, profesores, cursos, inscripciones, instrumentos, reservas de instrumentos y usuarios/roles disponían de atributos fijos establecidos por el cliente. No obstante, dichos atributos podrían normalizarse posteriormente, separándolos en colecciones diferenciadas cuando resulte conveniente para la integridad y el rendimiento.

Se especifican también relaciones entre directores generales y hospitales, así como relaciones entre pacientes y visitas médicas (un mismo paciente puede solicitar múltiples visitas, pero cada visita está asociada a un único paciente). Las demás relaciones se tendrán que deducir por lógica y siguiendo la estructura y contexto en el que se desarrolla la base de datos.

Dado que el sistema está enfocado en varios Municipios, los datos ingresados, la cantidad de estos y los formatos que se definirán a través de `$jsonSchema` serán coherentes con dicho contexto, estableciendo una conexión con la realidad que representa la BBDD.

Problema: datos dispersos y sin control de cupos; reportes manuales poco confiables.

Solución: centralizar en MongoDB con reglas de negocio, transacciones y agregaciones.

Alcance: sedes, profesores, estudiantes, cursos, inscripciones, reservas, usuarios/roles.

---
# 3. Descripción del proyecto

Este proyecto tiene como objetivo el diseño metodológico de un sistema de base de datos para Campus Music, institución dedicada a la enseñanza musical. La propuesta abarca la definición del modelo conceptual, lógico y físico, así como las validaciones e índices necesarios para garantizar un almacenamiento de datos eficiente, coherente y seguro.

A partir de este modelo, se busca facilitar la gestión integral de la información académica y operativa —sedes, profesores, estudiantes, cursos, inscripciones, instrumentos y reservasInstrumentos, permitiendo una organización sistemática y consultas ágiles por parte del cliente. De este modo, el sistema se concibe como una solución escalable y funcional frente al crecimiento de los datos y a las necesidades de análisis y control propias de una escuela de música.

---
# 4. Requerimientos

CRUD de estudiantes, profesores, cursos, sedes, usuarios (roles).

Inscribir estudiantes con validación de cupos, registro de costo y fecha; decrementar cupo en transacción.

Reservar instrumentos físicos por sede.

Reportes: ocupación por sede (último mes), cursos más demandados, ingreso por sede, profesor con más estudiantes, instrumento más reservado, historial por estudiante, cursos en ejecución, exceso de cupo.  

# 5. Modelo Conceptual

Descripción   
Un modelo conceptual en bases de datos es una representación, que describe las entidades, atributos y relaciones entre ellas en un negocio determinado, sin entrar en detalles de implementación tecnológica más específica. Su objetivo es comunicar la estructura de datos de manera clara y comprensible para los stakeholders, incluso aquellos sin conocimientos técnicos, y servir como base para el diseño lógico y físico de la base de datos.  

![](./img/conceptual.drawio.png)

# 6. Modelo Lógico 
Descripción    
Un modelo lógico de base de datos es una representación más detallada y estructurada del modelo conceptual, en la que se definen de manera precisa las entidades, sus atributos, y las relaciones entre ellas, así como aspectos técnicos como los identificadores únicos (llaves primarias), llaves foráneas y restricciones de integridad. A diferencia del modelo conceptual, el modelo lógico ya toma en cuenta cómo los datos serán organizados y estructurados dentro de un sistema de gestión de bases de datos.

![](./img/logico.png)

## CODIGO DE DIAGRAMA LOGICO
	
    erDiagram
	direction TB
	Usuario {
		_id ObjectId PK ""  
		user String  ""  
		email String  ""  
		password String  ""  
		rol ENUM  ""  
		rol_id ObjectId FK ""  
	}
	Administrador {
		_id ObjectId PK ""  
		nombre String  ""  
		numDocumento INT  ""  
		tipoDocumento ENUM  ""  
	}
	Estudiante {
		_id ObjectID PK ""  
		numDocumento INT  ""  
		tipoDocumento ENUM  ""  
		numCelular INT  ""  
		nivelMusical ENUM  ""  
		sede ObjectId FK ""  
	}
	Profesor {
		_id ObjectId PK ""  
		nombre String  ""  
		numDocumento INT  ""  
		tipoDocumento ENUM  ""  
		numCelular INT  ""  
		estudios Array  ""  
		sede ObjectId FK ""  
	}
	Especialidad {
		_id ObjectId PK ""  
		especialidad ENUM  ""  
		profesor_id ObjectId FK ""  
	}
	Empleado {
		_id ObjectId  ""  
		nombre String  ""  
		numDocumento INT  ""  
		tipoDocumento ENUM  ""  
		numCelular INT  ""  
		sede ObjectId FK ""  
	}
	Sede {
		_id ObjectId PK ""  
		nombreSede String  ""  
		ciudad ENUM  ""  
		direccion String  ""  
	}
	Curso {
		_id ObjectId PK ""  
		tipo ENUM  ""  
		sede_id ObjectId FK ""  
		nombreCurso String  ""  
		cupos INT  ""  
		nivelReque ENUM  ""  
		costo INT  ""  
		fechaInicio ISODATE  ""  
		fechaFin ISODATE  ""  
		horario String  ""  
	}
	Inscripcion {
		_id ObjectId PK ""  
		curso_id ObjectId FK ""  
		estudiante_id ObjectId FK ""  
	}
	Instrumento {
		_id ObjetId PK ""  
		tipo ENUM  ""  
		sede_id ObjectId FK ""  
		estado ENUM  ""  
	}
	ReservaInstrumento {
		_id ObjectId PK ""  
		instrumento_id ObjectId FK ""  
		user_id ObjectId FK ""  
		fechaInicio ISODATE  ""  
		fechaFin ISODATE  ""  
		costo INT  ""  
	}

	Usuario||--o|Administrador:"es"
	Usuario||--o|Estudiante:"es"
	Usuario||--o|Profesor:"es"
	Usuario||--o|Empleado:"es"
	Estudiante||--o|Sede:"pertenece a"
	Profesor||--o|Sede:"pertenece a"
	Empleado||--o|Sede:"pertenece a"
	Curso||--o|Sede:"se ofrece en"
	Inscripcion||--o|Estudiante:"realiza"
	Inscripcion||--o|Curso:"pertenece a"
	Especialidad||--o|Profesor:"es impartida por"
	ReservaInstrumento||--o|Usuario:"es hecha por"
	ReservaInstrumento||--o|Instrumento:"es para"
	Instrumento||--o|Sede:"se encuentra en"



     

## Justificación del uso de MongoDB

## Diseño del modelo de datos:
## Colecciones creadas
## Decisiones de uso de referencias o embebidos
## Validaciones $jsonSchema
## Explicación de validaciones por colección
## Índices
## Lista de índices creados
## Justificación técnica de su uso
## Estructura de los datos de prueba
## Explicación de cada agregación
## Transacción MongoDB
## Escenario utilizado
## Código explicado paso a paso
## Roles
## Descripción de cada rol
## Ejemplo de creación de usuarios con esos roles
## Conclusiones y mejoras posibles