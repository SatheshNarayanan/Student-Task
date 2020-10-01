const { Sequelize } = require("sequelize")

const studentDb = new Sequelize(process.env.DB_URL);

//testing function for checking the connection with the database
const testDbConn =  async () => {
    try {
        await studentDb.authenticate()
        console.log("DB Connected Succesfully")
    } catch(e) {
        console.log("Error while connecting DB", e)
    }
}

module.exports = { studentDb, testDbConn }