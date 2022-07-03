# FullStack App Angular-PrimeNG --> Flask-NodeJS/Postgres-MongoDB

### About

A mobile-first fully responsive SPA with user login, change password, remind password, CRUD functionalities and notifications, with Spring and NodeJS backend. Work in progress..
Technologies: **Angular, PrimeNG, Docker**

#### Deployed in Netlify

https://pedantic-hopper-08943a.netlify.app/

### Docker & docker-compose install (wsl)

- Git clone
- Go into the directory
- Install Docker Engine & Docker Compose

```
sudo apt-get update
```

```
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.28.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

```
sudo chmod +x /usr/local/bin/docker-compose
```

### Run with Docker

- Start the Docker daemon (if needed)

```
sudo systemctl start docker or sudo service docker start
```

```
docker-compose up -d --build (to build & run)
docker-compose up (to run)
```

in browser: http://localhost:4000/bo (served with nginx)

```
docker-compose down (to kill and stop docker images)
```

# Or

- Download or clone the repo
- Go into the directory
- You should already have Node.js installed
- Install the code dependencies with npm install --force command
- npm start to run locally

in browser: http://localhost:4201

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
