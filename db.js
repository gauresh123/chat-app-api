import { Sequelize } from "sequelize";
import dotenv from "dotenv/config";

const sequelize = new Sequelize(process.env.CONNECTION, {
  dialect: "postgres",
  port: 5432,
});

export default sequelize;
