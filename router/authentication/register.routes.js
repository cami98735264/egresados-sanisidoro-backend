const register = (req, res) => {
    const longitudes = {
        documento: 10,
        telefono: 10,
    };
    console.log(req.body);
    if(!req.body.contraseña || !req.body.documento || !req.body.nombres || !req.body.primer_apellido || !req.body.segundo_apellido || !req.body.telefono) {
        return res.status(400).json({
            success: false,
            message: "Faltan campos por llenar",
            errorType: "DATA_MISSING"
        });
    }
    if(Object.keys(req.body).some(key => req.body[key].length > longitudes[key])) {
        const filteredErrors = Object.keys(req.body).filter(key => req.body[key].length > longitudes[key]);
        console.log(filteredErrors);
        return res.status(400).json({
            success: false,
            message: "Alguno de los campos excede la longitud máxima",
            errors: filteredErrors,
            errorType: "DATA_LENGTH"
        });
    }
    if(req.body.contraseña.length < 8) {
        return res.status(400).json({
            success: false,
            message: "La contraseña debe tener al menos 8 caracteres",
            errorType: "DATA_LENGTH",
        });
    }
}


module.exports = register;