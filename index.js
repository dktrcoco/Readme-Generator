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
      type: "input",
      name: "contribution",
      message: "Please provide information on how to contribute to your project."
    },
    {
      type: "input",
      name: "testing",
      message: "Please provide instructions on how to properly test your project."
    }
  ]);
}

function generateHTML(answers) {
  return `
  ${answers.title}
  #${answers.title}
  $#{answers.title}
  #Title
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Hi! My name is ${answers.name}</h1>
    <p class="lead">I am from ${answers.location}.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${answers.github}</li>
      <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
    </ul>
  </div>
</div>
</body>
</html>`;
}

async function init() {
  console.log("hi")
  try {
    const answers = await promptUser();

    const readme = generateHTML(answers);

    await writeFileAsync("test.md", readme);

    console.log("Successfully wrote to test.md");
  } catch(err) {
    console.log(err);
  }
}

init();
