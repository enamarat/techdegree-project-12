# techdegree-project-12
InTheSpotlight is a web application which provides data from financial markets.

Technologies used:
1. React
2. Express
3. MongoDB
4. Bootstrap

API used:
1. ExchangeRate-API (https://www.exchangerate-api.com/)
2. IEX Trading (https://iexcloud.io/)

ExchangeRate-API doesn't require a key.
To get an access to IEX Trading API you must create an account and get an API key.

In order to run this project locally you need to:
1. download project files from Github repository;

2. create a file called ".env" in the root folder of your project; inside the file type your API key for IEX Trading in the following format: REACT_APP_API_KEY=your API key

3. navigate to project's root folder in your terminal and run "npm install" command;
example:
$ cd c:/projects/techdegree-project-12
$ npm install

4. navigate to "client" folder inside project and again type "npm install" command in your terminal;
example:
$ cd c:/projects/techdegree-project-12/client
$ npm install

5. have MongoDB installed on your computer

   note: two following steps are describing actions for Windows OS. If you are on Mac OS, launching MongoDB will be a little different.

6. navigate to folder containing MongoDB and launch mongod.exe file;
   Examples of commands in the terminal:
   $ cd C:/'Program files'/MongoDB/Server/4.0
   $ bin/mongod

7. navigate to folder containing MongoDB and launch mongo.exe file;
   Examples of commands in the terminal:
   $ cd C:/'Program files'/MongoDB/Server/4.0
   $ bin/mongo

 8. navigate to project's root folder in your terminal and run "npm run dev" command;
example:
$ cd c:/projects/techdegree-project-12
$ npm run dev

These commands will launch the app on both 3000 and 5000 local servers, where local server 3000 is used for client-side of the project, and
local server 5000 is used for back-end of the project.
