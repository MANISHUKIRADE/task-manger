
let service = require('../serviceses/subtaskServices')
module.exports = class subTaskController {
    constructor(app) {
        this.app = app
        this.routs()
    }
    routs() {
        this.app.get('/api/v1/users/:userid/tasks/:taskid/subtasks/', async (request, response) => {
            let taskid = request.params.taskid
            let data = await service.getSubTasks(taskid);
            console.log(data)
            response.send(data)
        })
        this.app.get('/api/v1/users/:userid/tasks/:taskid/subtasks/:subtaskid', async (request, response) => {
            let taskid = request.params.taskid;
            let subtaskid = request.params.subtaskid;
            let data = await service.getSingleSubtaskService(taskid, subtaskid)
            console.log(data)
            response.send(data)
        })
        this.app.delete('/api/v1/users/:userid/tasks/:taskid/deletesubtasks/:subtaskid', async (request, response) => {
            let subtaskid = request.params.subtaskid;
            let taskid = request.params.taskid
            service.deleteSubtaskServive(taskid, subtaskid).then(function (result) {
                console.log(result)
            })

        })
        this.app.post('/api/v1/users/:userid/tasks/:taskid/addsubtasks', async (request, response) => {
            let taskid = request.params.taskid
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
            service.addSubtaskService(taskid, subtaskobj).then(function (result) {
                    console.log('added')
                })
                .catch(function (err) {
                    console.log('some error occuredd')
                })
        })

        this.app.put('/api/v1/users/:userid/tasks/:taskid/editsubtasks/:subtaskid', (request, response) => {
            let taskid = request.params.taskid
            let subtaskid = request.params.subtaskid
           
            let tasktitle = request.body.tasktitle
            let taskdiscription = request.body.taskdiscription
            let priority = request.body.priority
            let taskDate = request.body.taskDate
            service.updateSubtask(tasktitle, taskdiscription, priority, taskDate, taskid, subtaskid).then(function (result) {
                console.log(result)
            })
            response.send('updated')
        })
    }
}