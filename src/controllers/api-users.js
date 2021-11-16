const { Router } = require("express");
const User = require("../database/models/user.model");
const { asyncHandler, requireToken } = require("../middlewares/middlewares");

const router = Router();

function initRoutes() {
    router.get("/me", asyncHandler(requireToken), asyncHandler(getInfo));
    router.patch("/me", asyncHandler(requireToken), asyncHandler(updateInfo));
    router.post("/logout", asyncHandler(requireToken), asyncHandler(logout));
}

async function getInfo(req, res, next) {
    const user = await User.findByPk(req.token.userId);
    res.json(user);
}

async function updateInfo(req, res, next) {
    const user = await User.findByPk(req.token.userId);
    await user.update(req.body);
    res.json(user);
}

async function logout(req, res, next) {
    await req.token.destroy();
    res.json({ message: "OK" });
}

initRoutes();

module.exports = router;