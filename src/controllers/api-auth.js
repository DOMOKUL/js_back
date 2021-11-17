const { Router } = require("express");
const { nanoid } = require("nanoid");
const ErrorResponse = require("../classes/errorResponse");
const User = require("../database/models/user.model");
const Token = require('../database/models/token.model');
const { asyncHandler } = require("../middlewares/middlewares");

const router = Router();

function initRoutes() {
    router.post("/reg", asyncHandler(register));
    router.post("/auth", asyncHandler(auth));
}

async function register(req, res, next) {
    checkUser = await User.findOne({
        where: {
            email: req.body.email,
        },
    });
    if (checkUser) {
        throw new ErrorResponse("This email already in use", 400);
    }
    //  const token = await Token.create({ userId: checkUser.id, value: nanoid() });
    //  res.setHeader("token", token.value);
    const newUser = await User.create(req.body);
    res.status(200).json({
        message: `OK, the new user info:\n${newUser}`,
    });
}

async function auth(req, res, next) { //Send email and pass
    //Find user with entered email and pass
    const checkUser = await User.findOne({
        where: {
            email: req.body.email,
            password: req.body.password,
        },
    });

    //Verification user on DB
    if (!checkUser) {
        throw new ErrorResponse("There is no user with this email", 404);
    }

    //If email and pass correct -> create Token in DB and return Token to front
    const token = await Token.create({
        userId: checkUser.id,
        value: nanoid(),
    });



    res.status(200).json({ accessToken: token.value });
}

initRoutes();

module.exports = router;