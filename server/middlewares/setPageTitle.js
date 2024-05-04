
/**
 * Page title setter
 */
module.exports = function setPageTitle(title) {
    return (req, res, next) => {
        res.locals.pageTitle = title;
        next();
    };
}