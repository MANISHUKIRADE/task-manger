/** 
 * @swagger
 * tags:
 *    - name: Task
 *      description: everything about Task
 * /api/v1/users/{userid}/tasks/{taskid}/subtasks/:
 *   get:
 *     tags: 
 *       - SubTask
 *     summary: return the subtasks of user by the taskid
 *     produces:
 *       - application/json 
 *     parameters:
 *       - in: path
 *         name: userid
 *         schema:
 *           type: string
 *         required: true
 *         description: string ID of the contact to get
 *       -in: path
 *        name:taskid
 *        schema:
 *          type: string  
 *        required: true
 *        description: strg iD of task        
 *     responses:
 *        default:
 *          description: Default error sample response  
 */



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