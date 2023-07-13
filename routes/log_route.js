const {
  createEmployeeLogIn,
  createEmployeeLogOut,
  getAllLogs,
  getAllLogsForToday,
  deleteLog,
} = require("../controllers/log_controller");
const router = require("express").Router();

router.route("/").get(getAllLogs);
router.route("/:date").get(getAllLogsForToday);
router.route("/logged-in").post(createEmployeeLogIn);
router.route("/logged-out").post(createEmployeeLogOut);
router.route("/:id").delete(deleteLog);
module.exports = router;
