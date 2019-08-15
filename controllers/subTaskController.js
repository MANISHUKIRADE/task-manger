let service = require('../serviceses/subtaskServices')
let Dto = require('../DTO/subtaskDto')
async function getUserTasks(id) {
    let data = await service.getTheSubTaskByTaskId(id)
    data = await Dto.subTaskDto(data)
    return data
}
module.exports= class subTaskController{
    constructor(app) {
        this.app= app
        this.routs()
    }
    routs(){
        this.app.get('/api/v1/users/:userid/tasks/:taskid/subtasks/',async (request,response)=>{
              let taskid=request.params.taskid
              let data= await service.getSubTasks(taskid) ;
              response.send(data)      
        })

    }
}