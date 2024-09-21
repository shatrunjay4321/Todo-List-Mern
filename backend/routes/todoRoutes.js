const express = require("express");
const { getData, updateData, addData, deleteData } = require("../controllers/todoController.js");
const router = express.Router();
const { verifyToken } = require('../controllers/auth.js')

router.get('/', verifyToken, getData);
router.post('/', verifyToken, addData);
router.put('/:id', verifyToken, updateData);
router.delete('/:id', verifyToken, deleteData);

module.exports = router;