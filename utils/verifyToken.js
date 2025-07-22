import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.send({ status: "error", msg: "You are not authenticated" });
    }
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return res.json({ status: "error", msg: "Token is not valid" });
        req.user = user;
        next()
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            if (err) return res.json({ status: "error", msg: "You are not authorized" });

        }
    });
}

export const verifyAdmin = (req, res, next) => {
    return verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.json({ status: "error", msg: "You are not an admin" });
        }
    });
}
