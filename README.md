[<ins>English</ins>](README.md) - [Polish](README.pl.md)

[![Netlify Status](https://api.netlify.com/api/v1/badges/877a40fe-be18-4706-afca-48fef282bfac/deploy-status)](https://app.netlify.com/sites/track-expenses-app-frontend/deploys)

* [About project](#about-project)
* [Initial assumptions of the application](#initial-assumptions-of-the-application)
* [How to start](#configuration-steps)
* [Code of Conduct](#code-of-conduct)
* [Contributing](#contributing)
* [Authors](#authors)
* [License](#license)

## About project
This project is created by [_Bycza Zagroda_](https://github.com/bycza-zagroda) community.
The main aim for this project is for it to allow a user to track their own expenses.
The code for the Track Expenses App is separated for [back-end](https://github.com/bycza-zagroda/track-expenses-app-backend) and [<ins>front-end</ins>](https://github.com/bycza-zagroda/track-expenses-app-frontend) with
their own GitHub repository. In the application the [_REST_](https://pl.wikipedia.org/wiki/Representational_state_transfer) architecture and [_Minimum
Viable Product (MVP)_](https://www.parp.gov.pl/component/content/article/52414:minimum-viable-product) model is used.

### Initial assumptions of the application

- this is a small project in order to build and release with the best code practise.
- the base of the application is able to execute the most basic actions such as:
  _create_, _read_, _update_, _delete_, aka [CRUD](https://pl.wikipedia.org/wiki/CRUD)
- in this project we can work together, learn from each other and enlarge our skills
  or even develop them. Everything depends on which level knowledge of Spring Boot 2
  you have.

### Configuration Steps
- Install [NVM](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/)
- nvm install v18.17.0
- npm install --global yarn || sudo npm install --global yarn
- git clone https://github.com/bycza-zagroda/track-expenses-app-frontend.git
- cd track-expanses-app-frontend
- yarn install --frozen-lockfile
- yarn run start:remote-backend

### Profiles

#### Remote Backend
Allows you to work with remote backend that's always up-to-date

- yarn run start:remote-backend

#### Json Server Mock
Allows you to work with mocked data if you want to test application without making
changes on database. 

- yarn run start:mock-json-server

### Code of Conduct
More info in [Code Of Conduct](CODE_OF_CONDUCT.md) section

### Contributing
Please read the file [CONTRIBUTING.md](CONTRIBUTING.md)

### Authors
Created with ❤ by [**_bycza-zagroda_**](https://github.com/orgs/bycza-zagroda/people) community

### License
The project is covered by [_Apache License Version 2.0, January 2004_](LICENSE)
