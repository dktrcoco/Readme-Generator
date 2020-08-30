const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of your project?"
    },
    {
      type: "input",
      name: "description",
      message: "Please provide a description of your project."
    },
    {
      type: "input",
      name: "install",
      message: "please provide installation instructions for your project."
    },
    {
      type: "input",
      name: "usage",
      message: "Please provide detailed information regarding usage of your project."
    },
    {
      type: "list",
      choices: ["MIT", "APACHE 2.0", "GPL 3.0"], 
      name: "license",
      message: "Please provide any relevant information regarding licensing for this project."
    },
    {
      type: "input",
      name: "contribution",
      message: "Please provide information on how to contribute to your project."
    },
    {
      type: "input",
      name: "testing",
      message: "Please provide instructions on how to properly test your project."
    },
    {
      type: "input",
      name: "github",
      message: "Please provide your GitHub Username."
    },
    {
      type: "input",
      name: "email",
      message: "Please input your email address."
    }
  ]);
}

function generateMD(answers) {
  return `
 # Project Title: ${answers.title}

 ## Description

 ${answers.description}

 ## Table of Contents

  * [Install](#install)
  * [Usage](#usage)
  * [License](#license)
  * [Contribution](#contribution)
  * [Testing](#testing)
  * [Questions](#questions)


 ## Install

 ${answers.install}

 ## Usage

 ${answers.usage}

 ## License
 
 ![github license](https://img.shields.io/badge/label-${answers.license}-green)

 ## Contribution
 
 ${answers.contribution}

 ## Testing
 
 ${answers.testing}

 ## Questions
 
 If you have any questions that are not answered here, please feel free to reach out to me at my email (${answers.email}).
 You can also reach out to me on github by searching for my username: ${answers.github} (Link: https://github.com/${answers.github}).

      `;
}

async function init() {

  try {
    const answers = await promptUser();

    const readme = generateMD(answers);

    await writeFileAsync("test.md", readme);

    console.log("Successfully wrote to test.md");
  } catch (err) {
    console.log(err);
  }
}

init();
