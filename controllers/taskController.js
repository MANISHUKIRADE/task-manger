/** 
 * @swagger
 * tags:
 *    - name: Task
 *      description: everything about Task
 * /api/v1/users/{userid}/tasks/:
 *   get:
 *     tags: 
 *       - Task
 *     summary: return the tasks of user by id
 *     produces:
 *       - application/json 
 *     parameters:
 *       - in: path
 *         name: userid
 *         schema:
 *           type: string
 *         required: true
 *         description: string ID of the contact to get
 *     responses:
 *        default:
 *          description: Default error sample response
 * 
 * /api/v1/users/{userid}/addtasks/:
 *   post: 
 *     tags: 
 *       - Task
 *     summary: Add the Task into user of id above
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               tasktitle:          
 *                 type: string
 *               taskdiscription:    
 *                 type: string
 *               taskDate:
 *                 type: string
 *             required:
 *               - tasktitle
 *               - taskdiscription
 *               - taskDate
 *     parameters:
 *       - in: path
 *         name: userid
 *         schema:
 *           type: string
 *         required: true
 *         description: string ID of the contact to get
 *
 * /api/v1/users/{userid}/deleteTask/{taskid}/:
 *   delete:
 *     tags: 
 *       - Task 
 *     summary: delete the task
 *     produces:
 *       - application/json 
 *     parameters:
 *       - in: path
 *         name: userid
 *         schema:
 *           type: string
 *         required: true
 *         description: string ID of the users
 *       - in: path
 *         name: taskid
 *         schema:
 *           type: string
 *         required: true
 *         description: string ID of the task 
 *     responses:
 *        default:
 *          description: Default error sample response
 * /api/v1/users/{userid}/tasks/{taskid}/:
 *   get:
 *     tags: 
 *       - Task 
 *     summary: get the single task
 *     produces:
 *       - application/json 
 *     parameters:
 *       - in: path
 *         name: userid
 *         schema:
 *           type: string
 *         required: true
 *         description: string ID of the users
 *       - in: path
 *         name: taskid
 *         schema:
 *           type: string
 *         required: true
 *         description: string ID of the task 
 *     responses:
 *        default:
 *          description: Default error sample response
 *
 * /api/v1/users/{userid}/edittasks/{taskid}/:
 *   put: 
 *     tags: 
 *       - Task
 *     summary: edit User  Task into the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               tasktitle:          
 *                 type: string
 *               taskdiscription:    
 *                 type: string
 *               taskDate:
 *                 type: string
 *               
 *             required:
 *               - tasktitle
 *               - taskdiscription
 *               - taskDate
 *                             
 *     parameters:
 *       - in: path
 *         name: userid
 *         schema:
 *           type: string
 *         required: true
 *         description: string ID of the users
 *       - in: path
 *         name: taskid
 *         schema:
 *           type: string
 *         required: true
 *         description: string ID of the task  
 *  
 */
const service = require('../serviceses/taskServices')
const dto = require('../DTO/taskDto')
async function getUserTask(id) {
    let data = await service.getTaskByUserId(id)
    data = dto.taskConverter(data)
    return data

}
async function getTask(id) {
    let data = await service.getSingleTask(id)
    data = dto.singleTaskConverter(data)
    return data;
}
async function addTask(id, tasktitle, taskdiscription, taskDate,priority) {
    let res = service.addUserTask(id, tasktitle, taskdiscription, taskDate,priority);
    return res
}
async function deleteTask(id) {
    let res = service.deleteUserTask(id)
    return res;
}
module.exports = class TaskController {
    constructor(app) {
        this.app = app;
        this.routes()
    }
    routes() {
        this.app.get('/api/v1/users/:userid/tasks/', async (request, response) => {
            let id = request.params.userid
            let data = await getUserTask(id)
            response.send(data)
        })
        this.app.post('/api/v1/users/:userid/addtasks/', async (request, response) => {
            let id = request.params.userid;
            let tasktitle = request.body.tasktitle
            let taskdiscription = request.body.taskdiscription
            let taskDate = request.body.taskDate
            let priority = request.body.priority


            
            let res = addTask(id, tasktitle, taskdiscription, taskDate,priority )
            
            response.send(res)
        })
        this.app.delete('/api/v1/users/:userid/deleteTask/:taskid/', async (request, response) => {
            let taskid = request.params.taskid;
            response.send(deleteTask(taskid))
        })
        this.app.get('/api/v1/users/:userid/tasks/:taskid/', async (request, response) => {
            let tid = request.params.taskid;
            let data = await getTask(tid)
            response.send(data)
        })
        this.app.put('/api/v1/users/:userid/edittasks/:taskid/', async (request, response) => {
            let id = request.params.userid;
            let tid = request.params.taskid;
            let tasktitle = request.body.tasktitle;
            let taskdiscription = request.body.taskdiscription
            let taskDate = request.body.taskDate
            let data = service.editUserTasks(tid, tasktitle, taskdiscription, taskDate)
            response.send(data)
        })

    }
}