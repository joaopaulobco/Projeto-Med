const isDoctor = (req,res,next) => {
    if(req.payload.role === 'doctor')  {
        next();
    }
}

module.exports = {
    isDoctor
}