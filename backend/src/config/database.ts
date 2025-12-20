import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const uri = process.env.MONGODB_URI;
if(!uri) console.log("Databse uri is not initiallised")


export const connectDb = async ():  Promise<void> =>{

  try {
    
  } catch (error) {
    
  }
  
}
