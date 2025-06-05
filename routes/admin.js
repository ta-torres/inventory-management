const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");

router.get("/login", adminAuth.getAdminLogin);
router.post("/login", adminAuth.postAdminLogin);

module.exports = router;
