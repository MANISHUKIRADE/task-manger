const mongoose = require('mongoose')
const mongo = require('mongodb');
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
let userModel = mongoose.model('Users', userSchema);

async function getTasksOfUser(id) {
  let data;
  const o_id = new mongo.ObjectID(id);
  await userModel.findOne({
    _id: o_id
  }, {
    'Task': 1,
    _id: 0
  }, (err, res) => {
    if (err) throw err;
    data = res
    //    console.log(data)
  })
  //   console.log(data)
  return data;
}

module.exports = {
  getTaskByUserId: async (id) => {
    let data = await getTasksOfUser(id)
    return data
  },
  addUserTask: async (id, tasktitle, taskdiscription, taskDate, priority) => {
    const o_id = new mongo.ObjectID(id)
    console.log(o_id)
    let taskobj = {
      tasktitle: tasktitle,
      taskdiscription: taskdiscription,
      taskDate: taskDate,
      priority: priority,
      subtask: []
    }
    userModel.updateOne({
      _id: o_id
    }, {
      $push: {
        Task: taskobj
      }
    }, (err, res) => {
      if (err) throw err
      return res
    })
  },
  deleteUserTask: async (id) => {
    const o_id = new mongo.ObjectID(id);
    await userModel.updateOne({}, {
      $pull: {
        Task: {
          _id: o_id
        }
      }
    }, {
      multi: true
    }, (err, res) => {
      if (err) throw err;
      return res;
    })
  },
  getSingleTask: async (id) => {
    let data;
    const o_id = new mongo.ObjectID(id);
    await userModel.aggregate([{
      $unwind: "$Task"
    }, {
      $match: {
        'Task._id': {
          $eq: o_id
        }
      }
    }, {
      $project: {
        Task: 1,
        _id: 0
      }
    }], (err, res) => {
      if (err) throw err

      data = res;
    })
    return data
  },
  editUserTasks: async (id, tasktitle, taskdiscription, taskDate) => {
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
        'Task.$.tasktitle': tasktitle,
        'Task.$.taskdiscription': taskdiscription,
        'Task.$.taskDate': taskDate
      }
    }, (err, res) => {
      if (err) throw err;
      data = res;

    })
    return data;
  }


}