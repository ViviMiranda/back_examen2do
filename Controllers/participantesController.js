import { Participante } from "../Models/Participante.js";
import { Sequelize } from "sequelize";


export const getAllParticipantes = async (req, res) => {
    try {
        const participantes = await Participante.findAll({
            order: [['idparticipante', 'DESC']]
        });

        return res.status(200).send({
            message: "Participantes obtenidos correctamente",
            data: participantes
        });

    } catch (e) {
        console.log(e);
        return res.status(500).send({
            message: "Error al obtener los participantes"
        });
    }
};

export const searchParticipantes = async (req, res) => {
    const { q } = req.query;
    
    if (!q) {
        return res.status(400).send({
            message: "Query de búsqueda es requerido"
        });
    }

    try {
        const participantes = await Participante.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { nombre: { [Sequelize.Op.iLike]: `%${q}%` } },
                    { apellidos: { [Sequelize.Op.iLike]: `%${q}%` } },
                    { email: { [Sequelize.Op.iLike]: `%${q}%` } }
                ]
            },
            order: [['idparticipante', 'DESC']] 
        });

        return res.status(200).send({
            message: "Búsqueda completada",
            data: participantes
        });

    } catch (e) {
        console.log(e);
        return res.status(500).send({
            message: "Error al buscar participantes"
        });
    }
};

export const getParticipanteById = async (req, res) => {
    const { idParticipante } = req.params;
    
    if (!idParticipante) {
        return res.status(400).send({
            message: "ID del participante es requerido"
        });
    }

    try {
        const participante = await Participante.findByPk(idParticipante);
        
        if (!participante) {
            return res.status(404).send({
                message: "Participante no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            data: participante
        });
        
    } catch (error) {
        console.error("Error al obtener participante:", error);
        return res.status(500).json({
            success: false,
            message: "Error al obtener el participante"
        });
    }
};

export const registrarParticipante = async (req, res) => {
    const { participante } = req.body;
    
    try {
        if (!participante.nombre || !participante.apellidos || !participante.email || 
            !participante.twitter || !participante.ocupacion || !participante.avatar) {
            return res.status(400).send({
                message: "Todos los campos son requeridos"
            });
        }

        if (!participante.terminos) {
            return res.status(400).send({
                message: "Debe aceptar los términos y condiciones"
            });
        }

        const newParticipante = await Participante.create({
            nombre: participante.nombre,
            apellidos: participante.apellidos,
            email: participante.email,
            twitter: participante.twitter,
            ocupacion: participante.ocupacion,
            avatar: participante.avatar,
            terminos: participante.terminos
        });

        return res.status(201).send({
            message: "Participante registrado exitosamente",
            data: newParticipante
        });
        
    } catch (e) {
        console.log(e);
  
        if (e.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).send({
                message: "El email ya está registrado"
            });
        }
        
        return res.status(500).send({
            message: "Error al registrar el participante"
        });
    }
};


export const getListado = async (req, res) => {
    const { q } = req.query;
    
    if (q) {
        return searchParticipantes(req, res);
    } else {

        return getAllParticipantes(req, res);
    }
};