const isDoctor = (req,res,next) => {
    console.log(req.payload)
    if(req.payload.role === 'doctor')  {
        next();
    }
}

module.exports = {
    isDoctor
}