const express = require('express');
const controller = require('../controllers/todos.js');

const router = express.Router();

router.get('/', controller.getAllTodos);
router.get('/:id', controller.getTodo);

router.post('/', controller.postTodo);
router.patch('/:id', controller.patchTodo);

router.delete('/', controller.deleteAllTodos);
router.delete('/:id', controller.deleteTodo);

module.exports = router;
