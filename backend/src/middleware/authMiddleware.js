// verify user to access secure routes
import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    const token = req.cookies.agrimarketT;
    if (!token){
        return res.status(401).json({
            success:false,
            message:'Token Invalid',
        })
    }
    try {
        // verify
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decode.userId
        next();
    } catch (err) {
        res.status(500).json({
            success:false,
            message:'Internal Server Error!',
        })
    }
}

export default authMiddleware