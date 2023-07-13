const loginUser = require("../controllers/auth_controller");
const router = require("express").Router();

router.route("/").post(loginUser);

module.exports = router;
