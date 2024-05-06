const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const verifyCaptcha = async (req, res) => {
    console.log(process.env.CAPTCHA_SECRET_KEY);
    const recaptcha = req.body.recaptcha;
    console.log(req.body)
    if(!recaptcha) {
        return res.json({
            success: false,
            message: 'Captcha no enviado'
        });
    }
    try {
        const googleResponse = await axios.post("https://www.google.com/recaptcha/api/siteverify?secret=" + process.env.CAPTCHA_SECRET_KEY + "&response=" + recaptcha, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log(googleResponse.data);
        return res.json({
            message: "Captcha verificado",
            success: googleResponse.data.success,
            errors: googleResponse.data['error-codes']
        });
    } catch(err) {
        return res.json({
            message: "Ocurrió un error en el servidor al verificar el captcha",
            success: false
        });
    }

}

module.exports = verifyCaptcha;