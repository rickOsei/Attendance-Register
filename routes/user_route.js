const express = require("express");
const {
  getAllUsers,
  createUser,
  deleteUser,
  editUser,
} = require("../controllers/user_controller");
const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").delete(deleteUser).patch(editUser);

module.exports = router;
