import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({message: 'Empty authentication header'});
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.PRIVATE_KEY, (error, credentials) => {
        
        if (error) {
            return res.status(403).send({error: 'Authentication error'});
        }
        req.user = credentials.user;
        next();
    })
    // return res.status(401).send({message: 'Authorization Error'});



    // if (req.session?.user?.email) {
    //     return next()
    // }

    // return res.status(401).send({ message: 'Error de autorización!' })
}

export default auth;
