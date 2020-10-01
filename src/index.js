 const path = require("path")
 require("dotenv").config({
     path : path.join(__dirname,"../.env")
 })

 const express = require("express")
 const bodyParser = require("body-parser")
 const { Op } = require("sequelize");

 const { studentDb, testDbConn }  = require("./database/dbConfig")
 const dataSeeder= require("./database/Seeder/studentSeeder")
 const studentModel = require("./database/Models/studentModel")
 
 const app = express()

 app.use(bodyParser.json())
 
 //Post request for inserting one student data at a time
 app.post("/", async(request,response) => {
    const { firstName , lastName , age, marks, email } = request.body
    try {
        const result = await studentModel.create({
        firstName, lastName , age, marks, email
     })
     console.log(JSON.parse(JSON.stringify(result.get())))
     response.status(200).json({
        message : "Data inserted Successfully",
        data : JSON.parse(JSON.stringify(result.get()))
     })
    } catch (e) {
        console.log(e)
        response.status(400).json({
            message : "Data is invalid"
        })
    }
    
 })

 //Getting the list of all the students
 app.get("/students", async (request, response) => {
     try {
        const result = await studentModel.findAll({
            order : ["firstName"]
        })
        response.status(200).json({
            message : "Please find the list of all Students",
            data : JSON.parse(JSON.stringify(result))
         }) 
     } catch (e) {
         console.log(e)
        response.status(400).json( {
            message : "Error while fetching Data, Plese try after some time"
        })
     }
    
 })

 //Getting Students based on Search Criteria
 app.get("/students/:marks", async (request, response) => {
     const { marks } = request.params
     let condition = { [Op.between]: []}

     if ( marks === "excellent")
    {
        condition = { [Op.between]: [ 80, 100]}
    }
     else if ( marks === "good")
     {
        condition = { [Op.between]: [ 60, 80]}
     }
     else if ( marks === "average" )
     {
        condition = { [Op.between]: [ 0, 60]}
     }
     else {
         response.status(400).json( {
             message : "Please enter valid Search criteria"
         })
     }
    try {
       const result = await studentModel.findAll({
           where : {
               marks : condition
           }
       })
       response.status(200).json({
           message : "Please find the list of Students",
           data : JSON.parse(JSON.stringify(result))
        }) 
    } catch (e) {
        console.log(e)
       response.status(400).json( {
           message : "Error while fetching Data, Plese try after some time"
       })
    }
   
})

//404 page
app.get("*", (request,response) => {
    app.status(404).send("Page not found!!")
})


 app.listen( process.env.PORT || 8080, () => {
     console.log("Application is running!")
 })
