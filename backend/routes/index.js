const express = require("express");
const { getData, updateData, addData, deleteData } = require("../controllers/index.js");
const router = express.Router();

router.get('/', getData);
router.post('/', addData);
router.put('/:id', updateData);
router.delete('/:id', deleteData);

module.exports = router;