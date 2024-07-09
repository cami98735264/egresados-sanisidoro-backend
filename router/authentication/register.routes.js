const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const { DataTypes } = require("sequelize");
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const sequelize = require("../../connection/connectToDB.js");
const bcrypt = require("bcrypt");
const Usuarios = require("../../models/usuarios.js")(sequelize, DataTypes);
const parametros = ["documento", "nombres", "primer_apellido", "segundo_apellido", "telefono", "contraseña", "cookies_checkbox"];
const longitudes = [
    {key: "documento", max: 15, min: 5},
    {key: "nombres", max: 50, min: 5},
    {key: "primer_apellido", max: 50, min: 5},
    {key: "segundo_apellido", max: 50, min: 5},
    {key: "telefono", max: 10, min: 10},
    {key: "contraseña", max: 50, min: 8}
];

const register = async (req, res) => {
    if(req.foundUser) {
        return res.status(400).json({
            success: false,
            message: "El usuario ya existe",
            errorType: "USER_EXISTS"
        });
    }
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
        const { nombres, primer_apellido, segundo_apellido, telefono, contraseña, cookies_checkbox, documento } = req.body;
        const newUser = await Usuarios.create({
            documento,
            nombres,
            direccion: req.body.direccion || null,
            apellidos: `${primer_apellido} ${segundo_apellido}`,
            acepta_cookies: cookies_checkbox === "on" ? true : false,
            telefono,
            contraseña: bcrypt.hashSync(contraseña, 10)
        });
        const payload = {
            id_usuario: newUser.id_usuario,
            documento: newUser.documento,
            nombres: newUser.nombres,
            apellidos: newUser.apellidos,
            telefono: newUser.telefono,
            acepta_cookies: newUser.acepta_cookies,
            direccion: newUser.direccion,
            isAdmin: newUser.isAdmin
        }
        // Falta crear la tabla usuarios en la base de datos
        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "1h"});
        res.cookie("authorization", token, {httpOnly: true, secure: true, maxAge: 3600000, sameSite: "strict"});
        res.status(201).json({
            success: true,
            message: "Usuario creado exitosamente",
            token
        });
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