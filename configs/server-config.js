if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

const port = process.env.PORT || 3001;

function serverConnection(app){
    app.listen(port, (err) => {
        if(err){
            console.log(`Error while connectong to the server ${err}`);
        }
        console.log(`Server connected on Port : ${port}`);
    });
}

module.exports = serverConnection;