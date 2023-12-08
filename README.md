# Guias Juegos Angular 17

### First Steps
* validate version
* update version
* create project
* run server
```
ng version
npm install -g @angular/cli@latest
ng new project-name
ng serve [or] npm start
```

### Install Tailwind CSS & DaisyUI [Tailwind CSS](https://tailwindcss.com) [Daisy UI](https://daisyui.com)
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
npm i -D daisyui@latest
```

* in the tailwind.config.js file add...
```
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  plugins: [
    require("daisyui")
  ],
  ...
}
```

* in the styles.css file add directives
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Some Commands
```
ng g c comp_name  //Create Components
ng g i inte_name  //Create Interfaces
ng g s serv_name  //Create Services
ng g m modu_name  //Create Modules
```

<hr>

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
