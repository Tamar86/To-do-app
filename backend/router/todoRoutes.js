const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')
const{validateTaskLength, ensureJSONContentType} = require('../middleware/todoMiddleware')
const{verifyToken} = require('../middleware/authMiddleware')


router.get('/tasks/',verifyToken,todoController.getAllTasks)

router.post('/new-tasks/',verifyToken, validateTaskLength, ensureJSONContentType, todoController.addTask  )

router.put('/update-task/:id',verifyToken, validateTaskLength, ensureJSONContentType, todoController.updateTask)

router.put('/task-completed/:id',verifyToken, todoController.taskCompleted)

router.delete('/delete-tasks/:id',verifyToken, todoController.deleteTask)





module.exports = router

