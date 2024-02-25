# UofL-ASP-Final

## Running the Project

> Ensure MariaDB is installed!

1. Run `npm install` to ensure all the required packages are downloaded + installed
2. Ensure the database server is running and setup (the following are MariaDB queries):
   1. `CREATE DATABASE uol_agile_db;`
   2. `CREATE USER 'uol_admin'@'localhost' IDENTIFIED BY 'DCQ2vrc2zmx';`
   3. `GRANT ALL PRIVILEGES ON uol_agile_db.* TO 'uol_admin'@'localhost';`
3. Fill the following entries into the root `.env` file:
    ```
    DB_HOST='localhost'
    DB_USER='uol_admin'
    DB_PASS='DCQ2vrc2zmx'
    DB_NAME='uol_agile_db'
    ```
4. Prepare the database with the correct structure + example data:
   - `npm run prepare-db`
5. Use one of the following npm scripts:
   - `npm run dev` - Host the server + file watchers
   - `npm run serve` - Host only the server
   - `npm run build` - Run a production build of the client
   - `npm run test` - Run all unit tests in the project

## Resources Used

- Initial React + Express JS Setup
  - [React App Setup](https://medium.com/swlh/back-to-basics-how-to-set-up-a-react-app-from-scratch-2020-134908e17490)
  - [Client Side Rendering React via Express JS](https://javascript.plainenglish.io/back-to-basics-client-side-rendering-a-react-app-using-express-js-c828e3664b88)
- Unit Testing Setup + Example
  - [Jest - Getting Started](https://jestjs.io/docs/getting-started)
- MariaDB Example
  - [MariaDB NodeJS Docs](https://github.com/mariadb-corporation/mariadb-connector-nodejs/blob/master/documentation/promise-api.md)
- Setup Tailwind
  - [Tailwind - Installation](https://tailwindcss.com/docs/installation)
- React Learning + Usage
  - [Defining + Using Components](https://www.react.express/react/components)
  - [Component Styling](https://www.react.express/react/styling/css_and_class_names)
  - [Rendering Lists](https://react.dev/learn/rendering-lists)
