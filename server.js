const express = require("express");
const app = express();
const server = require("./configs/server-config");
const dbConnection = require("./configs/db-config");
const router  = require("./routes/user-route");

app.use(express.json());

dbConnection().then(() => {

    app.use("/nwt/app/api/v1/users",router);
    
    server(app);

}).catch(err => {
    console.log(`Error while database connection ${err}`);
})








