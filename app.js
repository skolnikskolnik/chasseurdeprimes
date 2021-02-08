const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeArray = [];

const promptUser = async () => {
    try {
        //Make an object for each team member depending on what class it is
        const answers = await inquirer.prompt([
            {
                type: 'list',
                message: 'What is the role of this employee?',
                name: 'role',
                choices: ["Engineer", "Intern", "Manager"]
            },
            {
                type: 'input',
                message: 'What is the name of the employee?',
                name: 'name'
            },
            {
                type: 'input',
                message: "What is the employee's id number?",
                name: 'id',
                //Verify that it is a number
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                type: 'input',
                message: "What is the employee's email address?",
                name: 'email',
                validate: function (value) {
                    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
                        return true;
                    }
                    return false;
                }
            },
        ]).then(function (answer) {
            let oneName = answer.name;
            let oneId = answer.id;
            let oneEmail = answer.email;

            if (answer.role == "Manager") {
                //Manager needs office number
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            message: "What is the manager's office number?",
                            name: 'officenumber',
                            validate: function (value) {
                                if (isNaN(value) === false) {
                                    return true;
                                }
                                return false;
                            }
                        }
                    ]).then(answer => {
                        let newEmployee = new Manager(oneName, oneId, oneEmail, answer.officeNumber);
                        employeeArray.push(newEmployee);
                        startOver(employeeArray);
                    })
            } else if (answer.role == "Engineer") {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            message: "What is the engineer's github username?",
                            name: 'github_username'
                        }
                    ]).then(function (answer) {
                        //Engineer also needs github username
                        let newEmployee = new Engineer(oneName, oneId, oneEmail, answer.github_username);
                        employeeArray.push(newEmployee);

                        startOver(employeeArray);
                    })
            } else {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            message: "What school does the intern attend?",
                            name: 'school'
                        }
                    ]).then(answer => {
                        let newEmployee = new Intern(oneName, oneId, oneEmail, answer.school);
                        employeeArray.push(newEmployee);
                        startOver(employeeArray);
                    });
            }
        });
    } catch (err) {
        console.log(err);
    }
}

promptUser();

const startOver = array => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Do you want to add another employee?',
                name: "yesno",
                choices: ["yes", "no"],
            }
        ]).then(answer => {
            if (answer.yesno == "yes") {
                promptUser();
            } else {
                render(array);
            }
        })
}


