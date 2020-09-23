# Car Booking
![](https://i.imgur.com/nV2ItUE.png)
Developer Test - Nikolai Fischer
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.4.

## Dependencies
Run `npm install` to install all dependencies.
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. 
#### Build Flags
##### Production
`--prod`
##### de-DE Production 
`--configuration=production-de`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Unit Tests are run with a headless PhantomJS instance.2

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Live Deployment
Visit https://book-a-car-prod.herokuapp.com/ for a live deployment.

## CI/CD Pipeline
This app uses a CI/CD pipeline on Heroku[]()
![](https://i.imgur.com/9Wrx79U.png)
![](https://i.imgur.com/9t3xBSW.png)
* Git Pull Requests are automatically built and tested as a seperate app. If unit tests fail the pull request is marked accordingly.
* Merged Pull Request are tested and promoted to a Staging stage of the pipeline.
* Staged apps can manually be promoted to the Production stage

## Localisations
All static HTML text is marked with i18n id and can be localized by generating a xlf file in /assets/locale. 
To build a localized version a new configuration has to be added in angular.json.
A german version of the app can be built using ` ng build --configuration=production-de`

