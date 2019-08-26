/** 
 * @swagger
 * tags:
 *    - name: SubTask
 *      description: everything about SubTask
 * /api/v1/users/{userid}/tasks/{taskid}/subtasks:
 *   get:
 *     tags: 
 *       - SubTask
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
 *       - in: path
 *         name: taskid
 *         schema:
 *           type: string
 *         required: true
 *         description: string ID of the contact to get
 * 
 *     responses:
 *        default:
 *          description: Default error sample response
 * 
 * /api/v1/users/{userid}/tasks/{taskid}/subtasks/{subtasksid}/:
 *   get: 
 *     tags: 
 *       - SubTask
 *     summary: Add the Task into user of id above
 *     parameters:
 *       - in: path
 *         name: userid
 *         schema:
 *           type: string
 *         required: true
 *         description: string ID of the contact to get
 *       - in: path
 *         name: subtasksid
 *         schema:
 *           type: string
 *         required: true
 *         description: string ID of the contact to get
 *       - in: path
 *         name: taskid
 *         schema:
 *           type: string
 *         required: true
 *         description: string ID of the contact to get
 *     responses:
 *        default:
 *          description: Default error sample response
 *
 * /api/v1/users/{userid}/tasks/{taskid}/deletesubtasks/{subtasksid}:
 *   delete:
 *     tags: 
 *       - SubTask 
 *     summary: delete the task
 *     produces:
 *       - application/json 
 *     parameters:
 *       - in: path
 *         name: userid
 *         schema:
 *           type: string
 *         required: true
 *         description: string ID of the contact to get
 *       - in: path
 *         name: subtasksid
 *         schema:
 *           type: string
 *         required: true
 *         description: string ID of the contact to get
 *       - in: path
 *         name: taskid
 *         schema:
 *           type: string
 *         required: true
 *         description: string ID of the contact to get 
 *     responses:
 *        default:
 *          description: Default error sample response
 */

let Service = require('../serviceses/subtaskServices')
let service = new Service();
module.exports = class subTaskController {
    constructor(app) {
        this.app = app
        this.routs()
    }
    routs() {
        this.app.get('/api/v1/users/:userid/tasks/:taskid/subtasks/', async (request, response) => {
            let taskid = request.params.taskid
            let userid = request.params.userid
            let data = await service.getSubTasks(userid, taskid)
            // console.log(data)
            response.send(data)
        })
        this.app.get('/api/v1/users/:userid/tasks/:taskid/subtasks/:subtaskid', async (request, response) => {
            let userid = request.params.userid
            let taskid = request.params.taskid;
            let subtaskid = request.params.subtaskid;
            let data = await service.getSubTaskById(userid, taskid, subtaskid)
            console.log(data)
            response.send(data)
        })
        this.app.delete('/api/v1/users/:userid/tasks/:taskid/deletesubtasks/:subtaskid', async (request, response) => {
            let userid = request.params.userid
            let subtaskid = request.params.subtaskid;
            let taskid = request.params.taskid
            service.deleteSubTask(userid, taskid, subtaskid).then(function (result) {
                response.send(result)
            })

        })
        this.app.post('/api/v1/users/:userid/tasks/:taskid/addsubtasks', async (request, response) => {
            let userid = request.params.userid
            let taskid = request.params.taskid
            let tasktitle = request.body.tasktitle
            let taskdiscription = request.body.taskdiscription
            let priority = request.body.priority
            let taskDate = request.body.taskDate
            //  console.log(request.body)
            let subtaskobj = {
                tasktitle: tasktitle,
                taskdiscription: taskdiscription,
                priority: priority,
                taskDate: taskDate
            }
            //console.log(subtaskobj)

            service.addSubTask(userid, taskid, subtaskobj).then(function (result) {
                    response.send(result)
                })
                .catch(function (err) {
                    console.log('some error occuredd')
                })
        })

        this.app.put('/api/v1/users/:userid/tasks/:taskid/editsubtasks/:subtaskid', (request, response) => {
            let taskid = request.params.taskid
            let subtaskid = request.params.subtaskid
            let userid = request.params.userid
            let tasktitle = request.body.tasktitle
            let taskdiscription = request.body.taskdiscription
            let priority = request.body.priority
            let taskDate = request.body.taskDate
            let subtaskobj = {
                tasktitle: tasktitle,
                taskdiscription: taskdiscription,
                priority: priority,
                taskDate: taskDate
            }
            service.updateSubtask(userid, taskid, subtaskid, subtaskobj).then(function (result) {
                    response.send(result)
                })
                .catch(function (err) {
                    response.send(err)
                })

        })
    }
}