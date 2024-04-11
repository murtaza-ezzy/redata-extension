const jwt = require('jsonwebtoken');
let User = require('../models/user.model');

module.exports = {
    auth(req, res, next) {
        const token = req.headers.token;
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.sendStatus(401);
                }
                else if (decoded) {
                    req.session.user = {
                        _id: decoded._id
                    }
                    next();
                }
                else {
                    res.sendStatus(401);
                }
            });
        }
        else {
            res.sendStatus(401);
        }
    },
    checkRoles(requiredRights) {
        return (req, res, next) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let user = await User.findOne({
                        _id: req.session.user._id
                    }).select('role').populate('role').exec();

                    let userRights = user.role.rights;

                    const hasRequiredRight = requiredRights.some(right => userRights.includes(right));
                    req.session.user.role = user.role.name;
                    if (hasRequiredRight) {
                        resolve(next());
                    } else {
                        res.sendStatus(401);
                        reject();
                    }
                } catch (error) {
                    console.error(error);
                    res.sendStatus(500);
                    reject(error);
                }
            });
        };
    }
}