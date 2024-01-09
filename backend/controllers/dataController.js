import mongoose from 'mongoose'

export const foodData = async(req, res)=>{
try{
    const fetchedData =  mongoose.connection.db.collection("foodData")
        const foodData = await fetchedData.find({}).toArray()
        res.send(foodData);

}catch(error){
    console.log(`error in ffood data in backned ${error.message}`)
}
}