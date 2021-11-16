const ErrorResponse = require("../classes/errorResponse");
const Token = require("../database/models/token.model");

const syncHandler = (fn) => (req, res, next) => {
    try {
        fn(req, res, next);
    } catch (error) {
        next(error);
    }
};

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const notFound = (req, _res, next) => {
    next(new ErrorResponse(`Not found - ${req.originalUrl}`, 404));
};

const errorHandler = (e, request, res, _) => {
    let code = 500;
    if (typeof e.code === 'number') {
        code = e.code;
    };

    return res.status(code || 500).json({
        message: e.message
    });
};

const requireToken = async(req, res, next) => {
    const accessToken = req.get("x-access-token");
    if (!accessToken) {
        throw new ErrorResponse("Token wasn't sent", 400);
    }
    const tokenFromDB = await Token.findOne({
        where: {
            value: accessToken,
        },
    });
    if (!tokenFromDB) {
        throw new ErrorResponse("Wrong token", 401);
    }
    req.token = tokenFromDB;

    next();
};

module.exports = {
    asyncHandler,
    syncHandler,
    errorHandler,
    requireToken,
    notFound
}