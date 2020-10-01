const studentModel = require("../Models/studentModel")

const data = [{
    firstName : "Sathesh",
    lastName : "Narayanan",
    age : 16,
    marks : 85,
    email : "sathesh@gmail.com"
},
{
    firstName : "Bala",
    lastName : "Murugan",
    age : 16,
    marks : 55,
    email : "bala@gmail.com"
},
{
    firstName : "Moses",
    lastName : "Stephen",
    age : 16,
    marks : 73,
    email : "moses@gmail.com"
},
{
    firstName : "Vignesh",
    lastName : "Shivan",
    age : 16,
    marks : 91,
    email : "vignesh@gmail.com"
},
]

//Seeder function for storing model data for testing
const dataSeeder = async () => {

    //This will recreate the table everytime and store the data as this is just a model data
    await studentModel.sync({force : true})

    try {
        data.forEach ( async (element) => {
            const result = await studentModel.create(element)
            console.log(result.get())
        })
    } catch (e) {
        console.log(e)
    }
}

module.exports = dataSeeder