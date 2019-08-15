const url = "mongodb+srv://MANISH:MANISH%409797@cluster0-qdzy9.mongodb.net/task-manager"
const mongoose = require('mongoose')
let connection = mongoose.createConnection(url, {
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
        status: Boolean,

        subtask: [{
            priority: String,
            tasktitle: String,
            taskdiscription: String,
            taskcreated: Date,
            taskDate: Date,
            status: Boolean
        }]
    }]

})
let User = connection.model('User', userSchema)
let user1 = new User({
    name: {
        fname: 'Manish',
        lname: 'UKiar'
    },
    username: 'Manish123',
    password: '1234',
    mobileno: '8691983106',
    Task: [{
        priority: 'High',
        status: 'true',
        tasktitle: "testScema",
        taskdiscription: "TestingSchmea",
        taskDate: '09/07/1997',
        subtask: [{
            tasktitle: 'subtasktest',
            taskdiscription: 'tasktest',
            priority: 'High',
            status: 'true',
            taskDate: '09/07/1997'
        }]
    }]

})
user1.save().then(doc => {
        console.log(doc)
    })

    .catch(err => {
        console.log(err)
    })

connection.collection('users').createIndex({
    username: 1
}, {
    unique: true
})