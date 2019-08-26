const express = require('express')
const bodyParser = require('body-parser')
const usercontroller = require('./controllers/userController')
const taskController = require('./controllers/taskController')
const subtaskController = require('./controllers/subTaskController')
const cors = require('cors')
const Auth = require('./Auth/jwtToken')

//const port = 9000;
const port = process.env.PORT || 9000 ;
let app = express();
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static('public'))
let server = require('http').createServer(app)
let auth = new Auth(app)
let usercontrol = new usercontroller(app)
let taskcontrol = new taskController(app)
let subtaskcontrol = new subtaskController(app)
let swaggerJSDoc = require('swagger-jsdoc');
let swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'TaskManager API documentation',
    version: '0.0.1',
    description: '<h2>CopyRight &copy; SwabhavTechlabs<h2>',
  },
  host: `localhost:${port}`,
  basePath: '/',
};

let options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./controllers/*.js'],
};
let swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
//swagger ends
app.get('/spa/',(req,res)=>{
  res.sendFile('./public/index.html')
})
server.listen(port)