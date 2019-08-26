const service = require('../serviceses/userServices')
const expressJWT = require('express-jwt')
const jwt = require('jsonwebtoken')
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

module.exports = class AuthUser {
    constructor(app) {
        this.app = app
        this.route();
    }
    route() {
        this.app.use(expressJWT({
            secret: jwtSecret,
            credentialsRequired: false
        }));
        this.app.post('/login/', async (request, response) => {
            let password = request.body.password;
            let username = request.body.username;
            let data = await service.getUsersService();
            for(let index =0;index<data.length;index++){
                if((data[index].username == username)&&(data[index].password= password) ){
                    const token = jwt.sign({
                        sub:data[index]._id
                    },jwtSecret);
                    response.send({
                        token
                    })
                }
            }
        })
    }
}