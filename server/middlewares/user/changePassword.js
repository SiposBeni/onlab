const bcrypt = require('bcrypt');
const UserModel = require('../../models/user');

/**
 * Change the users password to a newly given one
 */
module.exports = async function changePassword(req, res, next) {
    const password = req.body.password;
    const oldPassword = req.body.oldPassword;
    const passwordAgain = req.body.passwordAgain;
    //console.log(req.user);
    if(password != passwordAgain){
        res.locals.error = "The passwords does not match";
         next();
    }
    try {
        const user = await UserModel.findOne({ name: req.user.name });
        if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
            res.locals.error = "Invalid username or password.";
            return next();
        }
        const hashedPwd = await bcrypt.hash(password, 10);
        user.password = hashedPwd;
        await user.save();
        next();
    } catch (error) {
        next(error);
    }
}
