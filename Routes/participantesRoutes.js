import { Router } from 'express';

import { getAllParticipantes } from '../Controllers/participantesController.js';
import { searchParticipantes } from '../Controllers/participantesController.js';
import { getParticipanteById } from '../Controllers/participantesController.js';
import { registrarParticipante } from '../Controllers/participantesController.js';
// Definición de rutas para participantes
const participantesRouter = Router();

participantesRouter.get('/listado', getAllParticipantes);

participantesRouter.get('/listado/search', searchParticipantes);

participantesRouter.get('/participante/:idParticipante', getParticipanteById);

participantesRouter.post('/registro', registrarParticipante);

export default participantesRouter;