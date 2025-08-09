function errorHandler (err, req, res, next) {
  console.error(err.message);
  const status = err.status ? err.status : 500;
  res.status(status).json({ error: err.message });
}

export default errorHandler;
