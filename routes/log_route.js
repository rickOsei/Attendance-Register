const {
  createLog,
  getAllLogs,
  deleteLog,
} = require("../controllers/log_controller");
const router = require("express").Router();

router.route("/").get(getAllLogs).post(createLog);
router.route("/:id").delete(deleteLog);
module.exports = router;
