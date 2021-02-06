// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee.js");

class Engineer extends Employee {
    //Accepts name, id, email, githubUsername
    constructor(name, id, email, gitHub) {
        super(name, id, email);
        this.role = "Engineer";
        this.github = gitHub;
    }
    //gitHub() fxn that returns ghusername
    getGithub() {
        return this.github;
    }
}

module.exports = Engineer;



