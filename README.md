# Introduction(Project overview and features)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

A web application for booking fitness classes, built with React. The app allows users to view available classes, book them, and manage their bookings through a user-friendly interface.

## Getting Started

Follow these instructions to set up and run the application.
### Run `npm start` in your terminal
## API Description

Fetch bookings data#
The `Class data` are use `mock Json` in this project path:`public/data`
The `Login Auth`
using the``https://dummyjson.com/auth`
### API document: `https://dummyjson.com/docs/auth`

### Explain why use the `username` instead of the email (As the task requirement)

The 400 (Bad Request) error typically indicates that the server could not understand the request due to invalid syntax. Based on the DummyJSON documentation, it looks like the login endpoint expects the username field instead of email.

## Usage guide(Available Scripts for run the code)

In the project directory, you can run:
## User Instructions

Welcome to our fitness class booking system! Here are some instructions to help you navigate the website:

- **Home Page**: 
  - When you are not logged in, the home page displays the `Book Now` button in a disabled state.
  
- **User Dashboard**: 
  - After logging in, you will be redirected to your user dashboard, where you can see your booked classes.

- **Navigation**: 
  - Clicking the icon of our website will redirect you back to the home page. Once logged in, you can now click the `Book Now` button to select classes.

- **Note**: 
  - Please keep in mind that this is a front-end project and does not currently support actual booking functionality. However, you can log out whenever you wish.

### Login Credentials

To log in, use the following credentials:

- **Website**: [DummyJSON Users](https://dummyjson.com/users)
- **Username**: `emilys`
- **Password**: `emilyspass`

Thank you for using our application!
## About the npm command
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More & Installation instructions (About the project process and detail)

The zip folder is ready, However,to know the progress of the project or if you have miss the dependencies:

## Installation Instructions

### Step 1: Initialize Your Project

First, create your React project using
`create-react-app`
`npx create-react-app fitness-class-booking`
`cd fitness-class-booking`

### Step 2: Install Dependencies

Next, install all the necessary dependencies listed in your `package.json`:

`npm install @testing-library/dom @testing-library/user-event @types/node @types/react @types/react-dom depcheck framer-motion react react-dom react-scripts rimraf rollup-plugin-terser typescript web-vitals`

### Step 3: Install Development Dependencies

Then, install the development dependencies:

`npm install --save-dev @testing-library/jest-dom @testing-library/react @types/jest @types/react-router-dom eslint eslint-config-react-app jest react-router-dom ts-jest`

### Step 4: Configure TypeScript

If you haven't already, add a `tsconfig.json` file to configure TypeScript:


## Find out more in React:

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
