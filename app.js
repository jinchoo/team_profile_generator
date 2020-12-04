const Manager = require("./Develop/lib/Manager");
const Engineer = require("./Develop/lib/Engineer");
const Intern = require("./Develop/lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./Develop/lib/htmlRenderer");

const employees = [];

function initApp() {
  addMember();
}

function addMember() {
  inquirer
    .prompt([
      {
        message: "Enter team member's name",
        name: "name",
      },
      {
        type: "list",
        message: "Select team member's role",
        choices: ["Engineer", "Intern", "Manager"],
        name: "role",
      },
      {
        message: "Enter team member's id",
        name: "id",
      },
      {
        message: "Enter team member's email address",
        name: "email",
      },
    ])
    .then(function ({ name, role, id, email }) {
      let roleInfo = "";
      if (role === "Engineer") {
        roleInfo = "GitHub username";
      } else if (role === "Intern") {
        roleInfo = "school name";
      } else {
        roleInfo = "office phone number";
      }
      inquirer
        .prompt([
          {
            message: `Enter team member's ${roleInfo}`,
            name: "roleInfo",
          },
          {
            type: "list",
            message: "Would you like to add more team members?",
            choices: ["yes", "no"],
            name: "moreMembers",
          },
        ])
        .then(function ({ roleInfo, moreMembers }) {
          let newMember;
          if (role === "Engineer") {
            newMember = new Engineer(name, id, email, roleInfo);
          } else if (role === "Intern") {
            newMember = new Intern(name, id, email, roleInfo);
          } else {
            newMember = new Manager(name, id, email, roleInfo);
          }
          employees.push(newMember);
          // addHtml(newMember).then(function () {
          if (moreMembers === "yes") {
            addMember();
          } else {
            finishHtml();
          }
          // });
        });
    });
}


function finishHtml() {
  

  let html = render(employees);
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);
  fs.appendFile("./output/team.html", html, function (err) {
    if (err) {
      console.log(err);
    }
  });
  console.log("end");
}

initApp();
