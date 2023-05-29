
const errorHandler = (err, req, res, next) => {
    // console.log(err)
    // console.log(err);
    // if (err?.message.includes('Not Found')) {
    // if (err?.message.includes('Error de Prueba, No ID')) {
        // console.log(Object.entries(err))
        // console.log(err.name)
        // console.log(err.value)
    if (err?.message.includes('Error')) {
        // console.error(err.stack);
        return res.status(400).json({message: err.message});
    
    }   else if (err?.name.includes('CastError')) {
        // console.error(err.stack);
        return res.status(400).send({err, message: 'Mandaste fruta en el ID'});
        // return res.status(400).send(err).json({message: 'Mandaste fruta en el ID'});
    }

    if (err?.name.includes('ZodError')) {
        // console.error(err.stack);
        if (err.message.includes('Invalid')) {
            return res.status(400).json({status: 'error', message: 'ID Invalido'});
        }
        return res.status(400).json({status: 'error', message: err.issues});
    };

    // console.error(err.stack);
    // res.status(500).json({message: 'Ocurrio un error'});
    res.status(500).json({status: 'erroro', message: err.message, err});
};

export default errorHandler;