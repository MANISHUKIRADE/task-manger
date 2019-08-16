const mongoose = require('mongoose')
const mongo = require('mongodb');
const taskservice = require('./taskServices')
const url = "mongodb+srv://MANISH:MANISH%409797@cluster0-qdzy9.mongodb.net/task-manager"
mongoose.connect(url, {
    useNewUrlParser: true
})
let userSchema = new mongoose.Schema({
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
  
let userModel = mongoose.model('Users1', userSchema)
async function getSubtasks(id){
    let data = await taskservice.getSingleTask(id)
 //   console.log(data[0].Task.subtask)
    return data[0].Task.subtask
}

async function addsubTask(taskid,subtaskobj){
    let subtasks = await getSubtasks(taskid)
    subtasks.push(subtaskobj)
    updateTaskWithSubtask(taskid,subtasks)
}
async function deleteSubtask(taskid,subtaskid){
    let subtasks = await getSubtasks(taskid)
    for(index=0;index<subtasks.length;index++){
        if(subtasks[index]._id==subtaskid){
            subtasks.splice(index,1)
            break;
        }
    }
    updateTaskWithSubtask(taskid,subtasks)
}

async function getSingleSubTask(taskid,subtaskid){
  let subtasks = await getSubtasks(taskid)
  let data ;
  for(index=0;index<subtasks.length;index++){
      if(subtasks[index]._id==subtaskid){
          data = subtasks[index]
          break;
      }
  }
  //console.log(data)
     return data
}
//getSingleSubTask('5d53a34af2d91b2654091007','5d53a34af2d91b2654091008')

//getSubtasks('5d53a34af2d91b2654091007')
async function editSubtask(tasktitle,taskdiscription,priority,taskDate,taskid,subtaskid){

    let subtasks = await getSubtasks(taskid)
    let data = {
        _id:subtaskid,
        tasktitle:tasktitle,
        taskdiscription:taskdiscription,
        priority:priority,
        taskDate:taskDate
    }

    for(index=0;index<subtasks.length;index++){
        if(subtasks[index]._id==subtaskid){
          subtasks[index]= data;
            break;
        }
    }
    updateTaskWithSubtask(taskid,subtasks)
}
//editSubtask('change123','change123','LOW','1997-09-06T18:30:00.000+00:00','5d53a34af2d91b2654091007','5d53a34af2d91b2654091008')

async function updateTaskWithSubtask(id,subtasks){
    const o_id = new mongo.ObjectID(id);

    let data;
    await userModel.updateOne({
      Task: {
        $elemMatch: {
          _id: id
        }
      }
    }, {
      $set: {
        'Task.$.subtask':subtasks,
        
      }
    }, (err, res) => {
      if (err) throw err;
      data = res;

    })
    return data;
}
module.exports = {
    getSubTasks: async function (id) {
        let data = await getSubtasks(id)
        return data;
    },
    getSingleSubtaskService: async function(taskid,subtaskid){
        let data = await getSingleSubTask(taskid,subtaskid)
        return data
    },
    updateSubtask: async function (tasktitle,taskdiscription,priority,taskDate,taskid,subtaskid){
        editSubtask(tasktitle,taskdiscription,priority,taskDate,taskid,subtaskid)
    },
    deleteSubtaskServive: async  function(taskid,subtaskid){
        deleteSubtask(taskid,subtaskid)
    },
    addSubtaskService: async function (taskid,subtaskobj){
        addsubTask(taskid,subtaskobj)
    }

}


 