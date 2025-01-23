import User from "../models/user.model.js";


export default {
    resource: User,
    options: {
        listProperties: ['username', 'email'],
    }
}