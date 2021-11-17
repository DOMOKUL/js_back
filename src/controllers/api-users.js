const { Router } = require("express");
const User = require("../database/models/user.model");
const { asyncHandler, requireToken } = require("../middlewares/middlewares");

const router = Router();

function initRoutes() {
    router.get("/me", asyncHandler(requireToken), asyncHandler(getInfo)); // Get info
    router.patch("/me", asyncHandler(requireToken), asyncHandler(updateInfo)); // Update info
    router.post("/logout", asyncHandler(requireToken), asyncHandler(logout)); // Logout
}

async function getInfo(req, res, next) {
    const user = await User.findByPk(req.token.userId);
    res.json(user);
}

async function updateInfo(req, res, next) {
    const user = await User.findByPk(req.token.userId);

    // Update specific set of fields  
    await user.update(req.body);
    res.json(user);
}

async function logout(req, res, next) {
    await req.token.destroy();
    res.json({ message: "OK" });
}

initRoutes();

module.exports = router;