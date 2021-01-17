const express = require("express");
const router = express.Router();
const moderatorController = require("../controllers/moderator");
//admin render
router.get("/", moderatorController.renderAdminIndex);
router.get("/create", moderatorController.renderAdminCreate);
router.get("/edit/:id", moderatorController.renderAdminEdit);

router.post("/", moderatorController.create);
router.get("/paginate", moderatorController.paginate);
router.put("/", moderatorController.edit);
router.delete("/:id", moderatorController.remove);

module.exports = router;
