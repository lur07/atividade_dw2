import Sequelize from "sequelize"
import connection from "../config/sequelize.js";

const Participacao = connection.define('participacoes', {
    detalhes: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, { timestamps: true })

export default Participacao