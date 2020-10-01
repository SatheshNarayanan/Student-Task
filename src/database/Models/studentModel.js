const { studentDb }  = require("../dbConfig")
const { DataTypes }  = require("sequelize")

//Table model that is defined in ORM
const studentModel = studentDb.define( "students", {
    id :  {
        primaryKey : true,
        type : DataTypes.INTEGER,
        autoIncrement : true
    },
    firstName : {
        type : DataTypes.STRING,
        allowNull : false
    },
    lastName : {
        type : DataTypes.STRING,
        allowNull : false
    },
    age : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    marks :  {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    email :  {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    }
})

module.exports = studentModel