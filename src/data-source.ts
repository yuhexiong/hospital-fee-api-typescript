import "reflect-metadata"
import { DataSource } from "typeorm"
import { Fee } from "./entity/Fee"
import { Nation } from "./entity/Nation"
import { Patient } from "./entity/Patient"
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mariadb",
    host: process.env.DB_HOST || "127.0.0.1",
    port: (process.env.DB_PORT as unknown) as number || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "password",
    database: process.env.DB_NAME || "hospital-fee-api",
    synchronize: true,
    logging: false,
    entities: [Fee, Patient, Nation],
    migrations: [],
    subscribers: [],
})
