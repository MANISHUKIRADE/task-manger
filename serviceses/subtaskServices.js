const mongoose = require('mongoose')
const taskservice = require('./taskServices')
let schema = new mongoose.Schema({
  name: {
    fname: String,
    lname: String
  },
  username: String,
  password: String,
  mobileno: String,
  registerdate: Date,
  userStatus: {
    type: Boolean,
    default: true
  },
  Task: [{
    priority: String,
    tasktitle: String,
    taskdiscription: String,
    taskcreated: Date,
    taskDate: Date,
    //  status: Boolean,

    subtask: [{
      priority: String,
      tasktitle: String,
      taskdiscription: String,
      taskcreated: Date,
      taskDate: Date,
      //    status: Boolean
    }]
  }]

})

class SubTaskServices {
    constructor() {
        let uri = "mongodb+srv://MANISH:MANISH%409797@cluster0-qdzy9.mongodb.net/task-manager";
        mongoose.set('useCreateIndex', true);
        mongoose.connect(uri, { useNewUrlParser: true }, (err) => {
            if (err)
                throw err;
          //  console.log('sub task services : mongoDb connected!');

        });
        this._myModel = mongoose.model('user', schema);
    }
    addSubTask(userId, taskId, subTask) {
        if (!subTask.isComplated)
            subTask.isComplated = false;
        return new Promise((resolve, reject) => {
            this._myModel.updateOne({ '_id': userId, 'Task._id': taskId }, { $push: { 'Task.$.subtask': subTask } }, { upsert: true },
                (err, result) => {
                    if (err)
                        reject(err);
                    if (result)
                        resolve(result);
                });
        });
    }
    getSubTasks(userId, taskId) {
        return new Promise(async(resolve, reject) => {
          let data = await taskservice.getSingleTask(taskId)
          //   console.log(data[0].Task.subtask)
             
             resolve(data[0].Task.subtask)
        });
    }
    getSubTaskById(userId, taskId, subTaskId) {
        return new Promise(async(resolve, reject) => {
          let subtasksraw= await taskservice.getSingleTask(taskId)
          let data ;

         let subtasks =subtasksraw[0].Task.subtask
//          console.log(subtasksraw[0].Task.subtask)
          for(let index=0;index<subtasks.length;index++){
              if(subtasks[index]._id==subTaskId){
                  data = subtasks[index]
                  resolve(data)
                  
           //  console.log(data)
                  break;
              }
          }
          
             
        });
    }
    updateSubtask(userId, taskId, subTaskId, newData) {
        newData._id = subTaskId;
        return new Promise((resolve, reject) => {
            this.deleteSubTask(userId, taskId, subTaskId)
                .then((result) => {
                    this.addSubTask(userId, taskId, newData)
                        .then((result) => {
                            resolve(result);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    deleteSubTask(userId, taskId, subTaskId) {
        return new Promise((resolve, reject) => {
            this._myModel.updateOne({ '_id': userId, 'Task._id': taskId }, { $pull: { 'Task.$.subtask': { _id: subTaskId } } }, { upsert: true }, (err, result) => {
                if (err)
                    reject(err);
                if (result)
                    resolve(result);
            });
        });
    }
}
module.exports = SubTaskServices;
