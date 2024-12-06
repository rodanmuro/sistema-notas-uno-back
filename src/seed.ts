import { DataSource } from "typeorm";
import { Role } from "./entity/Role";
import { Usuario } from "./entity/Usuario";
import { Asignatura } from "./entity/Asignatura";
import { Calificacion } from "./entity/Calificacion";
import { Grupo } from "./entity/Grupo";
import { Periodo } from "./entity/Periodo";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "12345678",
    database: "sistema-notas-uno",
    synchronize: true,
    logging: false,
    entities: [Grupo, Periodo, Role, Usuario, Asignatura, Calificacion],
    migrations: [],
    subscribers: [],
})

const seedDatabase = async () => {
    await AppDataSource.initialize();

    const roleRepo = AppDataSource.getRepository(Role);
    const usuarioRepo = AppDataSource.getRepository(Usuario);
    const asignaturaRepo = AppDataSource.getRepository(Asignatura);
    const calificacionRepo = AppDataSource.getRepository(Calificacion);
    const grupoRepo = AppDataSource.getRepository(Grupo);
    const periodoRepo = AppDataSource.getRepository(Periodo);

    // Roles
    const teacherRole = roleRepo.create({ role: "teacher" });
    const studentRole = roleRepo.create({ role: "student" });
    await roleRepo.save([teacherRole, studentRole]);

    // Periodos
    const periodos = ["Periodo 1", "Periodo 2", "Periodo 3", "Periodo 4"].map((name) =>
        periodoRepo.create({ periodo: name })
    );
    await periodoRepo.save(periodos);

    // Grupos
    const grupos = ["Grupo A", "Grupo B", "Grupo C"].map((name) =>
        grupoRepo.create({ grupo: name })
    );
    await grupoRepo.save(grupos);

    // Asignaturas
    const asignaturas = ["Mathematics", "Science", "History", "Art"].map((name) =>
        asignaturaRepo.create({ asignatura: name })
    );
    await asignaturaRepo.save(asignaturas);

    // Usuarios (Teachers)
    const teachers = Array.from({ length: 5 }, (_, i) =>
        usuarioRepo.create({
            nombres: `Teacher ${i + 1}`,
            apellidos: `LastName ${i + 1}`,
            correo: `teacher${i + 1}@example.com`,
            roles: [teacherRole],
        })
    );
    await usuarioRepo.save(teachers);

    // Usuarios (Students)
    const students = Array.from({ length: 20 }, (_, i) =>
        usuarioRepo.create({
            nombres: `Student ${i + 1}`,
            apellidos: `LastName ${i + 1}`,
            correo: `student${i + 1}@example.com`,
            roles: [studentRole],
        })
    );
    await usuarioRepo.save(students);

    // Assign Teachers to Asignaturas and Grupos
    for (let i = 0; i < teachers.length; i++) {
        const teacher = teachers[i];
        // Each teacher gets 2 Asignaturas and 1 Grupo
        const teacherAsignaturas = [asignaturas[i % asignaturas.length], asignaturas[(i + 1) % asignaturas.length]];
        const teacherGrupo = grupos[i % grupos.length];

        teacher.asignaturas = teacherAsignaturas;
        teacher.grupos = [teacherGrupo];
        await usuarioRepo.save(teacher);
    }

    // Assign Students to Grupos
    for (let i = 0; i < students.length; i++) {
        const student = students[i];
        // Each student is assigned to one Grupo
        const studentGrupo = grupos[i % grupos.length];
        student.grupos = [studentGrupo];
        await usuarioRepo.save(student);
    }

    // Calificaciones
    const calificaciones = [];
    for (const student of students) {
        for (const asignatura of asignaturas) {
            for (const periodo of periodos) {
                // Find a teacher responsible for the Asignatura
                const teacher = teachers.find((t) =>
                    t.asignaturas.some((a) => a.id === asignatura.id)
                );

                if (teacher) {
                    calificaciones.push(
                        calificacionRepo.create({
                            idDocente: teacher.id,
                            idEstudiante: student.id,
                            idAsignatura: asignatura.id,
                            year: 2024,
                            idPeriodo: periodo.id,
                            calificacion: Math.floor(Math.random() * 41) + 60, // Random grade between 60 and 100
                        })
                    );
                }
            }
        }
    }
    await calificacionRepo.save(calificaciones);

    console.log("Database seeded successfully!");
    await AppDataSource.destroy();
};

seedDatabase().catch((error) => {
    console.error("Error seeding database", error);
});