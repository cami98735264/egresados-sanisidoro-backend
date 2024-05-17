const logout = async (req, res) => {
    try {
        res.clearCookie("authorization", { httpOnly: true, sameSite: "strict", secure: true });
        return res.status(200).json({
            success: true,
            message: "Sesión cerrada"
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

module.exports = logout;