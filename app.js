const Manager = require("./Develop/lib/Manager");
const Engineer = require("./Develop/lib/Engineer");
const Intern = require("./Develop/lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./Develop/lib/htmlRenderer");
const Employee = require("./Develop/lib/Employee");


function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("Success!");
  });
}

const employees = [];

function init() {
  let employee;

function addMember() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter team memeber's name",
        name: "name",
      },
      {
        type: "list",
        message: "Select team member's role",
        choices: ["Engineer", "Intern", "Manager"],
        name: "role",
      },
      {
        type: "input",
        message: "Enter team member's id",
        name: "id",
      },
      {
        type: "input",
        message: "Enter team member's email address",
        name: "email",
      },
    ])
    .then(function (answers) {
      if (answers.role === "Manager") {
        inquirer
          .prompt({
            type: "input",
            message: "What is the office number?",
            name: "officeNumber",
          })
          .then(function (response) {
            employee = new Manager(
              answers.name,
              answers.id,
              answers.email,
              response.officeNumber
            );
            employees.push(employee);
          });
      } else if (answers.role === "Engineer") {
        inquirer
          .prompt({
            type: "input",
            message: "What is the GibHub URL?",
            name: "gitHubUrl",
          })
          .then(function (response) {
            employee = new Engineer(
              answers.name,
              answers.id,
              answers.email,
              response.gitHubUrl
            );
            employees.push(employee);
          });
      } else {
        inquirer
          .prompt({
            type: "input",
            message: "What is name of your school?",
            name: "school"
          })
          .then(function (response) {
            employee = new Intern(
              answers.name,
              answers.id,
              answers.email,
              response.school
            );
            employees.push(employee);
          });
        }
        
     inquirer.prompt({
        type: "input",
        message: `Enter team member's ${roleInfo}`,
        name: "roleInfo"
    },
    {
        type:  "list",
        message:  "Would you like to add more team members?",
        choices: [
            "yes",
            "no"
        ],
        name:  "moreMembers"
    })
    .then(function ({roleInfo, moreMembers}) {
        let newMember;
        if (role === "Engineer") {
            newMember = new Engineer(name, id, email, roleInfo);
        } else if (role === "Intern") {
            newMember = new Intern(name, id, email, roleInfo);
        }
        employees.push(newMember);
        addHtml(newMember)
        .then(function () {
            if(moreMembers === "yes") {
                addMember();
            } else {
                finshHtml();
            }
        });
    });
    
});
    
}
function startHtml() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Team Profile</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
        </nav>
        <div class="container">
            <div class="row">`;
    fs.writeFile("./output/team.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("start");
}

function addHtml(member) {
    return new Promise(function(resolve, reject) {
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        let data = "";
        if (role === "Engineer") {
            const gitHub = member.getGithub();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">GitHub: ${gitHub}</li>
            </ul>
            </div>
        </div>`;
        } else if (role === "Intern") {
            const school = member.getSchool();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Intern</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
            </div>
        </div>`;
        } else {
            const officePhone = member.getOfficeNumber();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Manager</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">Office Phone: ${officePhone}</li>
            </ul>
            </div>
        </div>`
        }
        console.log("adding team member");
        fs.appendFile("./output/team.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });   
    
}

function finishHtml() {
    const html = ` </div>
    </div>
    
</body>
</html>`;

    fs.appendFile("./output/team.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("end");
}
}

init();


// STEP 1:
// You ask for the following:
// - ID
// - Full name
// - Email
// - Role
//   |
//   `----- STEP 2:
//         Get the role answer and present the next set of questions
//         based on the role
//         IF role === Manager
//           - Office Number
//             |
//             `---- STEP 3a:
//                   - Create a new Manager object using Manager Class
//                   - Add this employee to employees[] array
//         IF role === Engineer
//           - Github URL
//             |
//             `---- STEP 3b:
//                   - Create a new Engineer object using Engineer Class
//                   - Add this employee to employees[] array
//         ELSE  // Meaning, Intern
//           - School
//             |
//             `---- STEP 3c:
//                   - Create a new Intern object using Intern Class
//                   - Add this employee to employees[] array

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
