const mongoose = require('mongoose')
const mongo = require('mongodb');
const url = "mongodb+srv://MANISH:MANISH%409797@cluster0-qdzy9.mongodb.net/task-manager"
mongoose.connect(url,{useNewUrlParser:true})

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
//      status: Boolean,

      subtask: [{
          priority: String,
          tasktitle: String,
          taskdiscription: String,
          taskcreated: Date,
          taskDate: Date,
  //        status: Boolean
      }]
  }]

})
let userModel = mongoose.model('User', userSchema)

async function getUsers() {
  let data;
  let complete = await userModel.find({},{'username':true,'password':true}, (err, res) => {
    if (err) throw err;
    data = res;
    //console.log(data)
  })
  return data
}
async function autheticateUser(username,password){
  let data;
  await userModel.find({username:username,password:password},{'_id':true,'userStatus':true},(err,res)=>{
    if(err) throw err;
    //console.log(res)
    data=res;
  })
  return data;
}


async function getUserlogin(id) {
  let data;
  const o_id = new mongo.ObjectID(id);
  let complete = await userModel.find({
    _id:o_id
  }, {
    'name': true,
    'username': true,
    'mobileno': true
  }, (err, res) => {
    data = res;
  })
  //console.log(data)
  return data
}
module.exports = {
      getUsersService: async () => {
    let data = await getUsers()
    return data;
  },
  LoginUser: async (id) => {
    let data = await getUserlogin(id)
    return data;
  },
   addUser: async (fname, lname, username, password, mobileno)=> {
    let user1 = new userModel({
      name: {
        fname: fname,
        lname: lname
      },
      username: username,
      password: password,
      mobileno: mobileno,
      Task: []
  
    })
    let data;
    user1.save().then(doc => {
        data=doc
      })
  
      .catch(err => {
        console.log(err)
      })
      return(data+"stored")
  },
  updateUser:async (id,fname, lname, username, password, mobileno) =>{
    const o_id = new mongo.ObjectID(id); 
    let name={
      fname:fname,
      lname:lname
    }
  let data;
    await userModel.updateOne({_id:o_id},{$set:{name:name,username:username,password:password,mobileno:mobileno}},(err,res)=>{
      if(err) throw err;
      data = res
    })
    return data
  },
  getAutheticateUser: async(username,password)=>{
     let data = await autheticateUser(username,password)
    // console.log(data)
     return data
  }

 

}