import { format } from "date-fns";
import express from "express";
import fs from 'fs';
import path from 'path';


// const PORT=8000
const PORT = process.env.PORT || 8000
const app=express();

app.use(express.json());

app.get('/',(req,res)=>{
try {
    let date=format(new Date(),'dd-MM-yyyy-HH-mm-ss')

 fs.writeFileSync(`Current_TimeStamp/${date}.txt`,`${date}`,"utf8")
 let data=fs.readFileSync(`Current_TimeStamp/${date}.txt`,"utf8")

res.status(200).send(data)
} catch (error) {
    res.status(500).send("Internal Server Error")
}

})
app.get("/timefiles",(req,res)=>{

const folder='Current_TimeStamp';
fs.readdir(folder,(err,e)=>{
if (err) {
    console.log(err);
    res.status(500).send('listening files error')
    
} else {
   const  textFiles=e.filter((file)=>path.extname(file)===".txt");
   res.status(200).json(textFiles);
}

})


})

app.listen(PORT,()=>console.log(`App is Listening to ${PORT}`))