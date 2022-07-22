import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isSeller: user.isSeller,
            adminLevel: user.adminLevel,
        },
        "thrifteasy",
        {
            expiresIn: "30d",
        }
    );
};

export const isLogged = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length);
        jwt.verify(token, "thrifteasy", (err, decode) => {
            if (err) {
                res.status(401).send({ message: "Invalid token" });
            } else {
                req.user = decode; // Get jwt.sign details
                next();
            }
        });
    } else {
        res.status(401).send({ message: "No token" });
    }
};

export const hasAdminPerms = (req, res, next) => {
    if (req.user && (req.user.adminLevel >= 1)) {
        next();
    } else {
        res.status(401).send({ message: "You are not authorized" });
    }
};

export const hasSellerPerms = (req, res, next) => {
    if (req.user && req.user.isSeller) {
        next();
    } else {
        res.status(401).send({ message: "You are not authorized" });
    }
};
