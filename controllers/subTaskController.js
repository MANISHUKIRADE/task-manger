


let service = require('../serviceses/subtaskServices')

module.exports= class subTaskController{
    constructor(app) {
        this.app= app
        this.routs()
    }
    routs(){
        this.app.get('/api/v1/users/:userid/tasks/:taskid/subtasks/',async (request,response)=>{
              let taskid=request.params.taskid
              let data= await service.getSubTasks(taskid) ;
              console.log(data)
              response.send(data)      
        })

    }
}