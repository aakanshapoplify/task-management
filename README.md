# project

Task Management

## Project Setup

```sh
npm install
``` 
## Features

List the key features of your project:

- Todo app
- Vuex
- API Integration (json-server)
- Routing

## Project Introduction

This project aims to develop a task management application using Vue.js, Vuex, and API integration. The application will feature several key components: List, Item, AddEditForm, and Filter. These components will facilitate task management by displaying tasks fetched from a Vuex store, allowing users to add, edit, delete tasks, and filter them based on their status. The application will leverage Vuex for state management, defining state, mutations, actions, and getters to interact with an API (using json-server). Routing will be implemented to navigate between the main task list and individual task details. Performance optimizations such as lazy loading of routes and components, efficient use of computed properties, and responsive design will ensure a smooth user experience. Styling will be done using SCSS to achieve a polished and responsive UI.


### Compile and Hot-Reload for Development

Open multiple terminal to run front-end, back-end

```sh
npm run dev
```
## to run server

```sh
npm run serve:json
```

## To test test-cases

```sh
npm run test
```
## test particular  test-cases

```sh
npm run test Filter.spec.ts
```  
## run cypress test-cases

```sh
npx cypress open  
```   
# description to check cypress

- Run the given command
- Then Click to E2E testing in browser 
- Select browser
- Click on example.cy.ts

