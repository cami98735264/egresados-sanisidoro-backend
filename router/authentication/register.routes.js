const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const parametros = ["documento", "nombres", "primer_apellido", "segundo_apellido", "telefono", "contraseña"];
const longitudes = [
    {key: "documento", max: 15, min: 5},
    {key: "nombres", max: 50, min: 5},
    {key: "primer_apellido", max: 50, min: 5},
    {key: "segundo_apellido", max: 50, min: 5},
    {key: "telefono", max: 10, min: 10},
    {key: "contraseña", max: 50, min: 8}
];

const register = (req, res) => {
    console.log(req.body);
    if(parametros.some(param => !req.body[param])) {
        return res.status(400).json({
            success: false,
            message: "Faltan campos por llenar",
            errorType: "DATA_MISSING"
        });
    }
    if(longitudes.find(({key, min, max}) => req.body[key].length < min || req.body[key].length > max)) {
        const filteredErrors = longitudes.filter(({key, min, max}) => req.body[key].length < min || req.body[key].length > max).map(({key, min, max}) => `${key} debe tener entre ${min} y ${max} caracteres`);
        console.log(filteredErrors);
        return res.status(400).json({
            success: false,
            message: "Alguno de los campos excede la longitud máxima",
            errors: filteredErrors,
            errorType: "DATA_LENGTH"
        });
    }
    try {
        const payload = {
            documento: req.body.documento,
            nombres: req.body.nombres,
            primer_apellido: req.body.primer_apellido,
            segundo_apellido: req.body.segundo_apellido,
            telefono: req.body.telefono,
            contraseña: bcrypt.hashSync(req.body.contraseña, 10),
            acepta_cookies: req.body.cookies_checkbox
        }
        // Falta crear la tabla usuarios en la base de datos
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.cookie("authorization", token, {httpOnly: true, secure: true, maxAge: 3600000, sameSite: "strict"});
    } catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            errorType: "INTERNAL_ERROR"
        });
    }

}


module.exports = register;