import { Sequelize, DataTypes } from "sequelize";
import databaseConnection from "../Config/connection.js";

export const Participante = databaseConnection.define("participantes", {
    idParticipante: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idparticipante'  
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    twitter: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ocupacion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avatar:{
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    terminos:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    tableName: "participantes",
    freezeTableName: true,
    timestamps: false, 

});