const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employeeArray = [];

//All classes need name, id, and email
const promptUser = async () => {
    try {
        //Make an object for each team member depending on what class it is
        const answers = await inquirer.prompt([
            {
                type: 'list',
                message: 'What is the role of this employee?',
                name: 'role',
                choices: ["Employee", "Engineer", "Intern", "Manager"]
            }

        ]).then(function (answer) {
            if (answer.role == "Manager") {
                //Manager needs office number
                inquirer
                    .prompt([
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
                            validate: function(value) {
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
                            validate: function(value){
                                if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)){
                                    return true;
                                }
                                return false;
                            }
                        },
                        {
                            type: 'input',
                            message: "What is the manager's office number?",
                            name: 'officenumber'
                        }
                    ]).then(answer => {
                        //nneed to make use of the manager function

                        //Need to make the appropriately structured object
                        let newEmployee = new Manager(answer.name, answer.id, answer.email, answer.officeNumber);

                        employeeArray.push(newEmployee);

                        startOver(employeeArray);
                    })
            } else if (answer.role == "Engineer") {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            message: 'What is the name of the employee?',
                            name: 'name'
                        },
                        {
                            type: 'input',
                            message: "What is the employee's id number?",
                            name: 'id',
                            validate: function(value) {
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
                            validate: function(value){
                                if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)){
                                    return true;
                                }
                                return false;
                            }
                        },
                        {
                            type: 'input',
                            message: "What is the engineer's github username?",
                            name: 'github_username'
                        }
                    ]).then(function (answer) {
                        //Engineer also needs github username
                        let newEmployee = new Engineer(answer.name, answer.id, answer.email, answer.github_username);
                        employeeArray.push(newEmployee);

                        startOver(employeeArray);
                    })
            } else if (answer.role == "Intern") {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            message: 'What is the name of the employee?',
                            name: 'name'
                        },
                        {
                            type: 'input',
                            message: "What is the employee's id number?",
                            name: 'id',
                            validate: function(value) {
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
                            validate: function(value){
                                if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)){
                                    return true;
                                }
                                return false;
                            }
                        },
                        {
                            type: 'input',
                            message: "What school does the intern attend?",
                            name: 'school'
                        }
                    ]).then(answer => {

                        let newEmployee = new Intern(answer.name, answer.id, answer.email, answer.school);

                        employeeArray.push(newEmployee);

                        startOver(employeeArray);
                    })
            } else {
                //Goes in as employee - no additional info needed
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            message: 'What is the name of the employee?',
                            name: 'name'
                        },
                        {
                            type: 'input',
                            message: "What is the employee's id number?",
                            name: 'id',
                            validate: function(value) {
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
                            validate: function(value){
                                if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)){
                                    return true;
                                }
                                return false;
                            }
                        }
                    ]).then(answer => {

                        let newEmployee = new Employee(answer.name, answer.id, answer.email);

                        employeeArray.push(newEmployee);

                        startOver(employeeArray);
                    })
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


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
