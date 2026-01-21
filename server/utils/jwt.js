import jwt from 'jsonwebtoken';

export function GenerateToken (user) {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
    return token;
}