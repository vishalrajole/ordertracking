# Order tracking

- a website (frontend) that has 3 views

  - [x] email address input form (with email validation)
  - [x] order history view
  - [x] order history view

- upon entering a known email address of a user will present you with the order history related to that email address and allows you to view order details and navigate back

- an API (backend)
  - [x] server which serves order details from csv file
  - [x] that parses and processes the provided CSV files' content
  - [x] that serves content to the frontend via created endpoint(s) in a format(GraphQL)
  - [x] Continuous Deployment(CD) is setup for `master` branch with Heroku and Github
  - [x] app deployed on Heroku at https://ecommerce-order-tracking.herokuapp.com/login
  - [x] use `test@success.com` to see order list

# Tech stack

- Frontend: React, typescript, styled-components, react-router
- Backend: NodeJS, ExpressJS, GraphQL, Apollo Server, lodash
- Deployment: Heroku, Github CD

# Installation steps:

- run `git clone git@github.com:vishalrajole/ordertracking.git` to clone the repo
- inside cloned repo folder, run `npm install` to install server dependencies
- inside `client` folder, run `npm install` to install client dependencies
- make sure you are at root of the project and use `npm run dev` to start local server
- visit `http://localhost:3000/` for client(UI) and
- visit `http://localhost:4000/graphql` for graphql interface


# Screenshots
<img width="448" alt="Screenshot 2021-06-05 at 8 26 00 PM" src="https://user-images.githubusercontent.com/4668780/120901961-f6272f80-c63d-11eb-810a-7072c2b44eb6.png">
<img width="396" alt="Screenshot 2021-06-05 at 8 26 26 PM" src="https://user-images.githubusercontent.com/4668780/120901962-f6bfc600-c63d-11eb-8f0f-5ae6e93296d7.png">
<img width="440" alt="Screenshot 2021-06-05 at 8 37 01 PM" src="https://user-images.githubusercontent.com/4668780/120901963-f7585c80-c63d-11eb-9e11-15a2d56c6dce.png">
<img width="452" alt="Screenshot 2021-06-05 at 8 37 53 PM" src="https://user-images.githubusercontent.com/4668780/120901964-f7f0f300-c63d-11eb-970e-e9b2e91c502a.png">

