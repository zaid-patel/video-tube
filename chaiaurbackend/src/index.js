
import 'dotenv/config'
import connectDB from "./db/index.js";
import { app } from './app.js';


connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{

        console.log(` Server is running at port : ${process.env.PORT}`);
    
    })
}
     
)