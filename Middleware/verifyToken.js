const jwt = require("jsonwebtoken");

const tokenVerify = async (req, res, next) => {
    try {

        const token = await req.headers.authorization.split(" ")[1];


        // const decoded = await jwt.verify(token, "123");

        console.log(jwt.verify(token, "123"));

        if (!decoded) {
            return res.status(400).json({
                message: "Unthorized", ddd
            });
        }
        res.status(200).json({
            message: "Verify Sucessfuly",
        });
    } catch (error) {
        return res.status(400).json({ message: "Authentication failed" });
    }
};

module.exports = tokenVerify;