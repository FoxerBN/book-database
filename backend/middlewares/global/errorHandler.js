const errorHandler = (err, req, res, next) =>{
    console.error('Global error handler:', err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
}
export default errorHandler;