const mongoose = require("mongoose");

async function dbConnection(){
    try{

        const mongoConnection = await mongoose.connect(process.env.MONGO_URI);

        mongoConnection.connection.on("error", (err) => {
            console.log(`Error While connecting to db : ${err}`);
        });

        console.log(`Connected to mongodb host ${mongoConnection.connection.host}`);
        
    }
    catch(e){
        console.log(`Error while connecting to db : ${e}`);
        process.exit(1);
    }
}

module.exports = dbConnection;