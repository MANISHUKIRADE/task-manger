/**
 * @swagger
 * tags:
 *    - name: User
 *      description: everything about Users
 * /api/v1/users/:
 *   get:
 *     tags: 
 *       - User
 *     summary: Get a Users JSON array
 *     description: get the detail of user username,id,password,mobileno
 *     produces:
 *       - application/json
 *     responses:
 *        default:  
 *          description: Default error sample response 
 *     
 * 
 * 
 * 
 *  
 * /api/v1/user/{userid}/:
 *   get:
 *     tags: 
 *       - User
 *     summary: Get a user by ID
 *     produces:
 *       - application/json 
 *     parameters:
 *       - in: path
 *         name: userid
 *         schema:
 *           type: string
 *         required: true
 *         description: string ID of the contact to get
 *     responses:
 *        default:
 *          description: Default error sample response
 * 
 * /api/v1/adduser/:
 *   post: 
 *     tags: 
 *       - User
 *     summary: Add the Users into the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               fname:          
 *                 type: string
 *               lname:    
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               mobileno:
 *                 type: string
 *             required:
 *               - fname
 *               - lname
 *               - username
 *               - password
 *               -  mobileno
 * /api/v1/edituser/{userid}/:
 *   put: 
 *     tags: 
 *       - User
 *     summary: Add the Users into the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               fname:          
 *                 type: string
 *               lname:    
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               mobileno:
 *                 type: string
 *             required:
 *               - fname
 *               - lname
 *               - username
 *               - password
 *               -  mobileno               
 *     parameters:
 *       - in: path
 *         name: userid
 *         schema:
 *           type: string
 *         required: true
 *         description: string ID of the contact to get
 * 
 * /api/v1/authenticate/:
 *   post: 
 *     tags: 
 *       - User
 *     summary: check the user of valid password and username
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               username:          
 *                 type: string
 *               password:    
 *                 type: string
 *               
 *               
 *             required:
 *               - username
 *               - password
 *     responses:
 *        default:
 *          description: Default error sample response
 *               
 *       
 */


const service = require('../serviceses/userServices')
async function getUser(id) {
    let data = await service.LoginUser(id)
    return data
}
async function getUsers() {
    let data = await service.getUsersService()
    return data
}
module.exports = class Usercontroller {
    constructor(app) {
        this.app = app
        this.route()
    }
    route() {
        this.app.get('/api/v1/users/', async (request, response) => {
            let data = await getUsers()
            response.send(data)
        })
        this.app.get('/api/v1/user/:userid/', async (request, response) => {
            let id = request.params.userid;
            
            let data = await getUser(id)
            response.send(data)
        })
        this.app.post('/api/v1/adduser/', async (request, response) => {
            let fname = request.body.fname
            let lname = request.body.lname
            let username = request.body.username
            let password = request.body.password
            let mobileno = request.body.mobileno
         let data=service.addUser(fname, lname, username, password, mobileno)
         response.send(data)
        })
        this.app.put('/api/v1/edituser/:userid/',async(request,response)=>{
            let id = request.params.userid
            let fname = request.body.fname
            let lname = request.body.lname
            let username = request.body.username
            let password = request.body.password
            let mobileno = request.body.mobileno
           let data = service.updateUser(id,fname, lname, username, password, mobileno)
           response.send(data)
        })
        this.app.post('/api/v1/authenticate/',async(request,response)=>{
            let password = request.body.password;
            let username = request.body.username;
            let data = await service.getAutheticateUser(username,password)
           //console.log(data)
            response.send(data)
 
        })
        
    }
}