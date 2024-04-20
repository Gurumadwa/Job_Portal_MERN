const mongoose = require('mongoose')

const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbName:"MERN_STACK_JOB_PORTAL"
    }).then(()=>{
        console.log("Connected to MongoDB")
    }).catch((err)=>{
        console.log(`Error connecting to db ${err}`)
    })
}

module.exports = dbConnection 