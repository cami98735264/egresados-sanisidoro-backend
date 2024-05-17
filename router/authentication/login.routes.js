const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const bcrypt = require("bcrypt");
const parametros = ["documento", "contraseña"];
const jwt = require("jsonwebtoken");

const login = (req, res) => {
    if(parametros.some(param => !req.body[param])) {
        return res.status(400).json({
            success: false,
            message: "Faltan campos por llenar",
            errorType: "DATA_MISSING"
        });
    }
    if(!req.foundUser) {
        return res.status(401).json({
            success: false,
            message: "Usuario no encontrado",
            errorType: "USER_NOT_FOUND"
        });
    }
    try {
        const user = req.foundUser;
        if(!bcrypt.compareSync(req.body.contraseña, user.contraseña)) {
            return res.status(401).json({
                success: false,
                message: "Contraseña incorrecta",
                errorType: "WRONG_PASSWORD"
            });
        }
        const payload = {
            id_usuario: user.id_usuario,
            documento: user.documento,
            nombres: user.nombres,
            apellidos: user.apellidos,
            telefono: user.telefono,
            acepta_cookies: user.acepta_cookies,
            direccion: user.direccion
        }
        const token = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: "1h"});
        res.cookie("authorization", token, {httpOnly: true, sameSite: "strict"});
        return res.status(200).json({
            success: true,
            message: "El usuario ha sido autenticado correctamente",
            token
        });
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Ha ocurrido un error en el servidor",
            errorType: "SERVER_ERROR"
        });
    }
}


module.exports = login;