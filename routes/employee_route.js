const express = require("express");
const {
  getAllEmployees,
  createEmployee,
  deleteEmployee,
  editEmployee,
} = require("../controllers/employee_controller");
const router = express.Router();

router.route("/").get(getAllEmployees).post(createEmployee);
router.route("/:id").delete(deleteEmployee).patch(editEmployee);

module.exports = router;
