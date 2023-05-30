
const errorHandler = (err, req, res, next) => {
  if (err?.message.includes('Error')) {
    return res.status(400).json({ message: err.message });
  } else if (err?.name.includes('CastError')) {
    return res.status(400).send({ err, message: 'Mandaste fruta en el ID' });
  } else if (err?.name.includes('ZodError')) {
    return handleZodError(err, res);
  }

  res.status(500).json({ status: 'error', message: err.message, err });
};

const handleZodError = (err, res) => {
  if (err.issues && err.issues.length > 0) {
    const validationErrors = err.issues.map((issue) => {
      return {
        validation: issue.validation,
        code: issue.code,
        message: issue.message,
        path: issue.path,
      };
    });

    return res.status(400).json({ status: 'error', message: validationErrors });
  }

  res.status(400).json({ status: 'error', message: err.message });
};

export default errorHandler;