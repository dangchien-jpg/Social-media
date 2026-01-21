import jwt from 'jsonwebtoken'

export function validateRegister (req, res, next) {
    const {email, password} = req.body;
    const errors = {};
    if(!email) {
        errors.email = "Email is required";
    }else {
        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailFormat.test(email)) {
            errors.email = "Invalid format email";
        }
    }

    if(!password) {
        errors.password = "Password is required"
    }else if(password.length < 6 ) {
        errors.password = "Password must be at least 6 characters"
    }

    if(Object.keys(errors).length > 0) {
        res.status(400).json({errors});
    }

    next();
}

export function authenticate (req, res, next) {
    const token = req.cookies.accessToken;
    if(!token) {
        return res.status(400).json({message: "Unauthorized"})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if(err) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = payload;
        next();
    })
}