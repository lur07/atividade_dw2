import { Sequelize } from "sequelize";

const connection = new Sequelize('site_02patinhas', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

export default connection;