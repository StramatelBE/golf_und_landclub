import { PrismaClient } from "@prisma/client";
import "reflect-metadata";
import { Container } from "typedi";
import { AuthService } from "../src/components/auth/auth.service"; // Assurez-vous que le chemin est correct

const prisma = new PrismaClient();

async function main() {
    const authService = Container.get(AuthService);

    // 1. Créer un premier utilisateur
    const user = await authService.register({
        username: "user",
        password: "stramatel123",
    });

    // 2. Créer un second utilisateur, basé sur des variables d'environnement
    await authService.register({
        username: String(process.env.APP_USERNAME),
        password: String(process.env.APP_PASSWORD),
    });

    // 3. Créer une playlist pour le premier utilisateur
    const playlist1 = await prisma.playlist.create({
        data: {
            name: "Playlist 1",
            user_id: user.id,
        },
    });

    // 4. Créer un mode
    await prisma.mode.create({
        data: {
            name: "data",
            playlist_id: null,
        },
    });

    // 5. Créer des paramètres (settings)
    await prisma.settings.create({
        data: {
            standby: true,
            standby_start_time: "22:00",
            standby_end_time: "06:00",
            restart_at: "03:00",
            language: "fr",
            theme: "dark",
        },
    });

    // 6. Forcer la création d'une Data avec id=1 (pour la température)
    //    Cette approche utilise une requête brute (raw) et suppose que votre SGBD
    //    autorise l'insertion manuelle d'un id auto-incrementé.
    //    Exemple ci-dessous pour PostgreSQL.

    await prisma.$executeRawUnsafe(
        `INSERT INTO "Data" (id, name, value, type)
     VALUES (1, 'temperature', '---', 'STRING')
     ON CONFLICT (id) DO NOTHING`
    );

    // 7. Créer quelques autres données d'exemple
    for (let i = 0; i < 8; i++) {
        await prisma.data.create({
            data: {
                name: `Exemple string ${i}`,
                value: "Exemple string",
                type: "STRING",
            },
        });
    }

    // 8. Créer la table accident par défaut
    await prisma.accident.create({
        data: {
            days_without_accident: 0,
            reset_on_new_year: false,
            record_days_without_accident: 0,
            accidents_this_year: 0,
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });