const mongoose=require('mongoose');
const config=require('config');


const db = config.get('mongoURI');
mongoose.set("strictQuery", false);

const connectDB=async()=>{
    try{
        await mongoose.connect(db);
        console.log('Database Connected')
    }
    catch(err){
        console.error(err.message);
        console.log('Error connecting to the database');
        process.exit(1);
    }
}

module.exports=connectDB