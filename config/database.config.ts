import { registerAs } from "@nestjs/config";

export default registerAs('database', () => {
    const databaseUrl = process.env.DATABASE_URL;
    const sslEnabled = process.env.DATABASE_SSL === 'true';

    return {
        type: 'postgres',
        ...(databaseUrl
            ? { url: databaseUrl }
            : {
                host: process.env.DATABASE_HOST,
                port: +`${process.env.DATABASE_PORT || 5432}`,
                username: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
              }
        ),
        entities: ['**/entity/*.entity{.ys,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        ssl: sslEnabled ? { rejectUnauthorized: false } : undefined,
    };
});