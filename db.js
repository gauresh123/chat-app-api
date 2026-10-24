import { Sequelize } from "sequelize";
import dotenv from "dotenv/config";
import pg from "pg";


const sequelize = new Sequelize(process.env.CONNECTION, {
  dialect: "postgres",
    dialectModule: pg,
  port: 5432,
});

export default sequelize;
