import axios from 'axios'
const URL = "http://localhost:8000";

export const createUser = async (data)=>{
 try{
    const headers = {
        'Content-Type': 'application/json',
      }
    const response = await axios.post(`${URL}/api/createuser` , data, {headers});
    return response.data;
 }catch(error){
    console.log(`error in createuser funciton in api frontend : ${error}`)
 }
}

export const loginUser = async (data)=>{
    try{    
        const headers = {
            'Content-Type': 'application/json',
          }
          const response = await axios.post(`${URL}/api/loginuser` , data , {headers});
          console.log(response.data)
          return response.data;
    }catch(error){
        console.log(`error in loginuser in frontend : ${error.message}`)
    }
}


export const getFoodData = async ()=>{
    try{
        const response = await axios.get(`${URL}/api/fooddata`);
        return response.data
    }catch(error){
        console.log(`error in getfooddata in services api axios : ${error.message}`)
    }
}

export const checkoutUser = async (data)=>{
    try{
        const headers = {
            'Content-Type': 'application/json',
          }
       const sendData =  await axios.post(`${URL}/api/checkout` , data , {headers});
        console.log(`sent data is : ${sendData}`)
        return sendData.data;
    }catch(error){
        console.log(`error in checkout user: ${error.message}`)
    }
}


export const getOrders = async(email)=>{
    try{
        const headers = {
            'Content-Type': 'application/json',
          }
        const response = await axios.get(`${URL}/api/myorders`, {headers, params : {email}});
        return response.data;
    }catch(error){
        console.log(`error in api getorders in frontend : ${error.message}`)
        
    }
}

