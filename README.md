# WebdriverIO (WDIO) with TypeScript and Cucumber (BDD)

WebdriverIO (WDIO) with TypeScript and Cucumber (BDD) Automation Framework is a powerful combination for building maintainable, scalable, and efficient test automation solutions.

## WebdriverIO

WebdriverIO is an open-source automation testing framework built on Node.js. It provides an easy interface to work with WebDriver and DevTools protocols, enabling seamless automation of modern web and mobile applications.

## TypeScript

TypeScript is a statically typed superset of JavaScript that improves code maintainability and reduces runtime errors.

## Cucumber (BDD)

Cucumber enables Behavior-Driven Development (BDD), bridging the gap between technical and non-technical stakeholders.

## Features

1. Using the Page Object Model for Scalable Tests.
2. Debugging Failed Tests via Screenshots, Report and Logs.
3. Generating Reports.
4. Integrate logging using library Winston.
5. Using .env for Environment Configuration.
6. Centralize test data though JSON file.

## Project structure

- allure-report: Stores Reports, Screenshots.
- allure-results: Stores the Results.
- src\test: Contains all Features and Steps files.
- src\test\features -> Write your features here.
- src\test\steps -> Your step definitions go here.
- src\core\command.ts -> Store reusable actions.
- src\pages-> Maintain all the POM classes.
- src\utils -> Manage test data, common browser method.
- src\logs -> Generate logs.
- wdio.config.ts -> Project configuration.
- package.json -> Contains all the dependencies.

### Setup:

1. git clone https://github.com/jaydnt/douglas-wdio.git
2. Run npm i and Installing Browsers
3. Create .env file in local and replace with .env.example file
4. Running Tests: npm run wdio
5. Check report: npm run report
6. Running Specific Tests Using Tags
