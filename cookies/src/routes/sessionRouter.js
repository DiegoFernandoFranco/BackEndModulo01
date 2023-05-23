import {Router} from 'express';
import {login, logout, signup} from '../controllers/sessionController.js';
import auth from '../middlewares/auth.js';

const sessionRouter = Router();

sessionRouter.post('/login', login);
sessionRouter.post('/logout', logout);
sessionRouter.post('/signup', signup);

export default sessionRouter;

// sessionRouter.get('/public', (req, res) => {
//     if (!req.session?.counter) {
//         req.session.counter = 1;
//         return res.send({message: 'Bienvenido!'});
//     }

//     req.session.counter++;
//     res.send({message: `Se ha visitado el sitio ${req.session.counter} veces.`})
// });

// sessionRouter.get('/private', auth, (req, res) => {
//     if (!req.session?.counter) {
//         req.session.counter = 1;
//         return res.send({message: 'Bienvenido!'});
//     }

//     req.session.counter++;
//     res.send({message: `Se ha visitado el sitio ${req.session.counter} veces.`})
// });
