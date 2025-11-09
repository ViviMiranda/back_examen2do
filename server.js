import express from 'express';
import cors from 'cors';
import participantesRouter from './Routes/participantesRoutes.js';
import databaseConnection from './Config/connection.js'; 
import { Sequelize } from 'sequelize';
import { Participante } from './Models/Participante.js';

export class Server {
  constructor() {
    this.app = express();
    this.port = 3000;
    this.connection();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  async connection() {
    try {
      await databaseConnection.authenticate();
      await Participante.sync();
      console.log('Conectado ');
    } catch (e) {
      console.log('Error de conexión ', e);
    }
  }

  routes() {
    this.app.use('/api/participantes', participantesRouter);
  }

  startServer() {
    this.app.listen(this.port, () => {
      console.log(` Servidor corriendo en el puerto:${this.port}`);
    });
  }
}