const bcrypt = require('bcrypt');
const UserModel = require('../../models/user');

/**
 * Checks login credentials
 */
module.exports = async function login(req, res, next) {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ name: username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.locals.error = "Invalid username or password.";
        return res.render("login");
    }
    req.user = {
        _id: user._id,
        name: user.name,
        email: user.email,
        commendations: user.commendations
    }
    next();
}