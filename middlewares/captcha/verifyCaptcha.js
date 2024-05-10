const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const verifyCaptcha = async (req, res, next) => {
    console.log(process.env.CAPTCHA_SECRET_KEY);
    const recaptcha = req.body.recaptcha;
    console.log(req.body)
    if(!recaptcha) {
        return res.json({
            success: false,
            message: 'Captcha no enviado',
            errorType: 'NO_CAPTCHA'
        });
    }
    try {
        const googleResponse = await axios.post("https://www.google.com/recaptcha/api/siteverify?secret=" + process.env.CAPTCHA_SECRET_KEY + "&response=" + recaptcha, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log(googleResponse.data);
        if(!googleResponse.data.success) {
            return res.status(403).json({
                message: "No se ha podido verificar el captcha",
                success: false,
                errors: googleResponse.data['error-codes'],
                errorType: 'CAPTCHA_ERROR'
            });
        }
    } catch(err) {
        return res.status(501).json({
            message: "Ocurrió un error en el servidor al verificar el captcha",
            success: false,
            errorType: 'INTERNAL_ERROR'
        });
    }
    next();

}

module.exports = verifyCaptcha;