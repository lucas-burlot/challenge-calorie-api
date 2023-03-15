// models/user.js
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const Database = require("./database.model.js");
const userDatabase = new Database("database/users.json");

class User {
    constructor(username, password) {
        this.id = uuidv4();
        this.username = username;
        this.password = bcrypt.hashSync(password, 10);
    }

    static find(query) {
        return userDatabase.find(query);
    }

    static create(user) {
        userDatabase.create(user);
    }

    static update(user) {
        userDatabase.update(user.id, user);
    }

    static delete(id) {
        userDatabase.delete(id);
    }
}

userDatabase.load();
module.exports = User;
