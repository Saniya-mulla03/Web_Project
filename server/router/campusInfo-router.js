const express = require("express");
const router = express.Router();
const campusInfos = require("../controllers/campusInfo-controller");

router.route('/campusInfo').get(campusInfos);

module.exports = router;