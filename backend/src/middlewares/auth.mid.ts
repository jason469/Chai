import {NextFunction, Request, Response} from "express";
const jwt = require('jsonwebtoken');

const authMid = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("x-auth-token");
        if (!token)
            return res.status(401).json({ msg: "No authMid token, access denied" });

        const verified = jwt.verify(token, "passwordKey");
        if (!verified)
            return res
                .status(401)
                .json({ msg: "Token verification failed, authorization denied." });
        req.body.user = verified.id;
        req.body.token = token;
        next();
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = authMid;