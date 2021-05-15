# Order tracking

- a website (frontend) that has 3 views

  - [x] email address input form
  - [x] order history view
  - [x] order history view

- that upon entering a known email address of a user will present you with the order history related to that email address and allows you to view order details

- an API (backend)

  - [x] that parses and processes the provided CSV files' content
  - [x] that serves content to the frontend via created endpoint(s) in a format of your choice

# Tech stack

- Frontend: React, typescript, styled-components
- Backend: NodeJS, ExpressJS, GraphQL, Apollo Server, lodash

# Installation steps:

- run `git clone git@github.com:vishalrajole/ordertracking.git` to clone the repo
- inside cloned repo folder, run `npm install` to install server dependencies
- inside `client` folder, run `npm install` to install client dependencies
- use `npm run dev` to start local server
- visit `http://localhost:3000/` for client and
- visit `http://localhost:4000/graphql` for graphql interface
