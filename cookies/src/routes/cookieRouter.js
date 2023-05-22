import {Router} from 'express';

const cookieRouter = Router();

cookieRouter.get('/', (req, res) => {
    const {key, value, maxAge} = req.body;
    // res.cookie(key, value, {maxAge}).send({key, value, maxAge});
    res.cookie('CoderCookie', 'Esta es una cookie muy poderosa', {maxAge: 10000}).send('Cookie');
})

cookieRouter.get('/', (req, res) => {
    res.send(req.cookies);
})

cookieRouter.get('/:key', (req, res) => {
    const {key} = req.params;
    const value = req.cookies[key];
    res.send({value});
})

cookieRouter.delete('/:key', (req, res) => {
    const {key} = req.params;

    res.clearCookie(key).send({message: 'Cookie removed'});
})

// signed
// cookieRouter.post('/signedCookies', (req, res) => {
//     const {key, value, maxAge} = req.body;
//     res.cookie(key, value, {maxAge, signed: true}).send({key, value, maxAge});
// })

// cookieRouter.get('/signedCookies', (req, res) => {
//     res.send(req.signedCookies);
// })

// cookieRouter.get('/signedCookies/:key', (req, res) => {
//     const {key} = req.params;
//     const value = req.signedCookies[key];
//     res.send({value});
// })

export default cookieRouter;