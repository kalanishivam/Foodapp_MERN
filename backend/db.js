const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
// const MongoClient = require('mongodb').MongoClient
// global.food_items = 1;


const mongoDB = async () => {
const mongoURI = process.env.MONGO_URI;
    await mongoose.connect(mongoURI);  // wheen this promise fullfilles, only then we shoould move forward otherwise the app will crash.
    console.log("connected"); // line 36 :  Therefore either use await for it or use .then and put everyting that u want to do after it connects inside that .then method


    const fetched_data = mongoose.connection.db.collection("food_items");
    const data =  await fetched_data.find({}).toArray(function (err, data) {  // you can remove the await keyword and uncomment lines (20-22).
        // if (err) {
        //     console.log(err);             // this if else is not needeed as it is doing nothing in this code
        // } else {
        //     // console.log(data);
        //     global.food_items = data;
        // }
    });
    // data.then((value) => {
    //     // console.log(value)
    //     global.food_items = value;
    //     console.log(global.food_items)
    // })
    // console.log(data)
    global.food_items = data;

    const category_data = mongoose.connection.db.collection("food_category");
    const food_cat = await category_data.find({}).toArray( (err, data) =>{
        // if(err){
        //     consolelog(err);
        // }
    });

    global.food_category = food_cat;

}

module.exports = mongoDB;