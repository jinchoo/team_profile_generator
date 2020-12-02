// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee")
module.exports = class Engineer extends Employee {
    constructor (name, id, email, github) {
        super(name, id, email)
        this.github = github
    }
    getName() {
        return this.name
    }
    getEmail() {
        return this.email
    }
    getId() {
        return this.id
    }
    getGithub() {
        return this.github
    }
    getRole() {
        return "Engineer"
    }
}
